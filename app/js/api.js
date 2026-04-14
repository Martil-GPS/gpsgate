/**
 * api.js - GpsGate API calls (plain JS, no framework)
 */

const GPS_BASE = 'https://gps.sts.al/comGpsGate';
const SITE_ADMIN_BO_TYPE = 'GpsGate.SiteAdminApplication.SiteAdminApplication';

/**
 * Clean GpsGate JSON responses that contain `new Date(...)` literals.
 * GpsGate server sometimes embeds JavaScript Date constructors in JSON responses
 * (e.g., "time": new Date(-62135596800000)). This regex replaces them with
 * the raw numeric timestamp string so the result is valid JSON.
 * Limitation: only handles single numeric arguments; multiple-arg Date constructors
 * are not expected in GpsGate responses.
 */
function cleanResponse(text) {
  return text.replace(/new Date\((-?\d+)\)/g, '"$1"');
}

/**
 * URL-decode the session hash (GpsGate stores it URL-encoded).
 */
function decodeHash(hash) {
  try { return decodeURIComponent(hash); } catch { return hash; }
}

/**
 * Step 1: Login with appId=0 to get session + applications list.
 * Returns the Session object.
 */
async function apiLogin(username, password) {
  const body = {
    id: 1,
    method: 'Login',
    params: {
      strUserName: username,
      strPassword: password,
      bStaySignedIn: true,
      appId: 0
    }
  };

  const resp = await fetch(`${GPS_BASE}/rpc/Directory/v.1?_METHOD=Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const text = await resp.text();
  const cleaned = cleanResponse(text);
  let data;
  try { data = JSON.parse(cleaned); } catch (e) { throw new Error('Invalid server response'); }

  if (data.error) throw new Error(data.error.message || 'Login failed');
  if (!data.result || !data.result.result || !data.result.result.Session) {
    throw new Error('Unexpected response structure');
  }

  return data.result.result.Session;
}

/**
 * Step 2 (optional): Login again with specific appId to get app-scoped session.
 * This refreshes the Hash and CsrfToken for the chosen application.
 */
async function apiLoginToApp(username, password, appId) {
  const body = {
    id: 1,
    method: 'Login',
    params: {
      strUserName: username,
      strPassword: password,
      bStaySignedIn: true,
      appId: appId
    }
  };

  const resp = await fetch(`${GPS_BASE}/rpc/Directory/v.1?_METHOD=Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  const text = await resp.text();
  const cleaned = cleanResponse(text);
  let data;
  try { data = JSON.parse(cleaned); } catch (e) { throw new Error('Invalid server response'); }

  if (data.error) throw new Error(data.error.message || 'Login failed');
  if (!data.result || !data.result.result || !data.result.result.Session) {
    throw new Error('Unexpected response structure');
  }

  return data.result.result.Session;
}

/**
 * Filter applications list - exclude site admin app.
 */
function getApplications(session) {
  if (!session || !session.Applications) return [];
  return Object.values(session.Applications)
    .filter(app => app.BOType !== SITE_ADMIN_BO_TYPE);
}

/**
 * Get all vehicles for an application.
 * Uses REST API: GET /api/v.1/applications/{appId}/users
 */
async function apiGetVehicles(appId, hash) {
  const authHash = decodeHash(hash);
  const resp = await fetch(`${GPS_BASE}/api/v.1/applications/${appId}/users`, {
    method: 'GET',
    headers: {
      'Authorization': 'Hash ' + authHash,
      'Accept': 'application/json'
    },
    credentials: 'include'
  });

  if (!resp.ok) throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
  const text = await resp.text();
  const cleaned = cleanResponse(text);
  return JSON.parse(cleaned);
}

/**
 * Get live updates for vehicles (delta updates, called every 3s).
 * POST /comGpsGate/MobileAPI.ashx
 */
async function apiGetUpdates(appId, hash) {
  const authHash = decodeHash(hash);
  const body = { method: 'getupdates', appId: appId, params: {} };

  const resp = await fetch(`${GPS_BASE}/MobileAPI.ashx`, {
    method: 'POST',
    headers: {
      'Authorization': 'Hash ' + authHash,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  });

  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const text = await resp.text();
  const cleaned = cleanResponse(text);
  return JSON.parse(cleaned);
}

// ===== Vehicle data helpers =====

/**
 * Normalize vehicle data - handles both REST API and RPC API formats.
 */
function normalizeVehicle(v) {
  if (!v) return v;

  // REST API format uses trackPoint.position + trackPoint.velocity
  // RPC API format uses trackPoint.pos + trackPoint.vel
  if (v.trackPoint) {
    const tp = v.trackPoint;

    // Normalize position
    if (tp.pos && !tp.position) {
      tp.position = { latitude: tp.pos.lat, longitude: tp.pos.lng };
    } else if (tp.position && !tp.pos) {
      tp.pos = { lat: tp.position.latitude, lng: tp.position.longitude };
    }

    // Normalize velocity
    if (tp.vel && !tp.velocity) {
      tp.velocity = { groundSpeed: tp.vel.speed, heading: tp.vel.heading };
    } else if (tp.velocity && !tp.vel) {
      tp.vel = { speed: tp.velocity.groundSpeed, heading: tp.velocity.heading };
    }

    // Normalize UTC (number timestamp → ISO string)
    if (typeof tp.utc === 'number') {
      tp.utc = new Date(tp.utc).toISOString();
    }
  }

  // Normalize deviceActivity (number timestamp → ISO string)
  if (typeof v.deviceActivity === 'number') {
    v.deviceActivity = new Date(v.deviceActivity).toISOString();
  }

  return v;
}

/**
 * Get vehicle lat/lng (works with both API formats).
 */
function getLatLng(vehicle) {
  const tp = vehicle.trackPoint;
  if (!tp) return null;

  const lat = tp.position?.latitude ?? tp.pos?.lat;
  const lng = tp.position?.longitude ?? tp.pos?.lng;

  if (lat == null || lng == null || (lat === 0 && lng === 0)) return null;
  return { lat, lng };
}

/**
 * Get vehicle speed in km/h.
 * GpsGate REST API returns groundSpeed in m/s; multiply by 3.6 to get km/h.
 */
function getSpeedKmh(vehicle) {
  const tp = vehicle.trackPoint;
  if (!tp) return 0;
  const speedMs = tp.velocity?.groundSpeed ?? tp.vel?.speed ?? 0;
  return Math.round(speedMs * 3.6);
}

/**
 * Get vehicle heading in degrees.
 */
function getHeading(vehicle) {
  const tp = vehicle.trackPoint;
  if (!tp) return 0;
  return tp.velocity?.heading ?? tp.vel?.heading ?? 0;
}

/**
 * Get vehicle status: 'moving' | 'parked' | 'offline'
 */
function getStatus(vehicle) {
  const lastSeenStr = vehicle.deviceActivity || vehicle.trackPoint?.utc;
  const now = new Date();
  const lastSeen = new Date(lastSeenStr);
  const minutesAgo = isNaN(lastSeen) ? Infinity : (now - lastSeen) / 60000;
  const speed = getSpeedKmh(vehicle);

  if (minutesAgo > 30) return 'offline';
  if (speed > 0) return 'moving';
  return 'parked';
}

/**
 * Get relative time string.
 */
function timeAgo(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  const minutes = (Date.now() - d) / 60000;
  if (minutes < 1) return 'a few seconds ago';
  if (minutes < 60) return Math.floor(minutes) + ' minutes ago';
  if (minutes < 1440) return Math.floor(minutes / 60) + ' hours ago';
  return Math.floor(minutes / 1440) + ' days ago';
}

/**
 * Format time as HH:MM:SS.
 */
function formatTime(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  return d.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ===== Reverse Geocoding =====
const geocodeCache = {};

/**
 * Reverse geocode lat/lng to address string.
 * Uses OSM Nominatim with caching.
 */
async function reverseGeocode(lat, lng) {
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  if (geocodeCache[key]) return geocodeCache[key];

  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=17&addressdetails=1`,
      { headers: { 'Accept-Language': 'sq,en' } }
    );
    const d = await r.json();
    if (d.display_name) {
      // Build short address
      const a = d.address || {};
      const parts = [a.road || a.pedestrian, a.city || a.town || a.village || a.suburb].filter(Boolean);
      const result = parts.length ? parts.join(', ') : d.display_name.split(',').slice(0, 2).join(',').trim();
      geocodeCache[key] = result;
      return result;
    }
  } catch { /* ignore */ }

  const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  geocodeCache[key] = fallback;
  return fallback;
}

// Throttled geocode queue — respects Nominatim's 1 req/sec rate limit
const geocodeQueue = [];
let geocodeRunning = false;
const GEOCODE_DELAY_MS = 1100;

function queueGeocode(lat, lng, callback) {
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  if (geocodeCache[key]) { callback(geocodeCache[key]); return; }
  geocodeQueue.push({ lat, lng, callback });
  if (!geocodeRunning) processGeocodeQueue();
}

async function processGeocodeQueue() {
  if (geocodeQueue.length === 0) { geocodeRunning = false; return; }
  geocodeRunning = true;
  const { lat, lng, callback } = geocodeQueue.shift();
  const result = await reverseGeocode(lat, lng);
  callback(result);
  setTimeout(processGeocodeQueue, GEOCODE_DELAY_MS); // respect Nominatim rate limit
}