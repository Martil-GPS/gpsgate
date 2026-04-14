/**
 * dashboard.js - Dashboard logic: map, vehicle list, markers, popup, auto-refresh
 */

// ===== State =====
let map;
let markers = {};          // vehicleId → Leaflet marker
let vehicles = [];         // current vehicles array
let selectedVehicleId = null;
let refreshInterval = null;
let appId, hash, appName;

const REFRESH_INTERVAL_MS = 3000;

// ===== Init =====
document.addEventListener('DOMContentLoaded', function () {
  // Guard: redirect if not logged in
  hash   = localStorage.getItem('gps_hash');
  appId  = localStorage.getItem('gps_appId');
  appName = localStorage.getItem('gps_appName') || 'Fleet';

  if (!hash || !appId) {
    window.location.href = 'index.html';
    return;
  }

  // Set app name in header
  document.getElementById('app-name').textContent = appName;

  // Init Leaflet map
  initMap();

  // Wire UI
  document.getElementById('btn-logout').addEventListener('click', handleLogout);
  document.getElementById('search-input').addEventListener('input', handleSearch);
  document.getElementById('btn-popup-close').addEventListener('click', closePopup);

  // Initial load
  loadVehicles();
});

// ===== Map =====
function initMap() {
  map = L.map('map', {
    center: [41.33, 19.83],
    zoom: 12,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
}

// ===== Load Vehicles =====
async function loadVehicles() {
  showLoadingOverlay(true);
  try {
    const raw = await apiGetVehicles(appId, hash);
    const list = Array.isArray(raw) ? raw : (raw.result || raw.users || []);
    vehicles = list.map(normalizeVehicle);
    renderAll();
    startAutoRefresh();
  } catch (err) {
    console.error('Load vehicles error:', err);
    showLoadingOverlay(false);
    // Show error in sidebar
    document.getElementById('vehicle-list').innerHTML =
      '<div class="empty-state">⚠️ Failed to load vehicles.<br>' + escapeHtml(err.message) + '</div>';
  }
}

// ===== Auto-Refresh =====
function startAutoRefresh() {
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(doRefresh, REFRESH_INTERVAL_MS);
}

async function doRefresh() {
  try {
    // Try getupdates first (delta), fall back to full reload
    let updated = null;

    try {
      const raw = await apiGetUpdates(appId, hash);
      // getupdates may return an array or an object with users/result
      if (Array.isArray(raw)) {
        updated = raw;
      } else if (raw && Array.isArray(raw.result)) {
        updated = raw.result;
      } else if (raw && Array.isArray(raw.users)) {
        updated = raw.users;
      }
    } catch {
      // getupdates failed — fall through to full reload
    }

    if (updated && updated.length > 0) {
      // Merge delta updates into existing vehicles array
      updated.forEach(function (upd) {
        upd = normalizeVehicle(upd);
        const idx = vehicles.findIndex(function (v) { return v.id === upd.id; });
        if (idx >= 0) {
          vehicles[idx] = Object.assign({}, vehicles[idx], upd);
        } else {
          vehicles.push(upd);
        }
      });
      renderAll();
    } else {
      // Full reload
      const raw = await apiGetVehicles(appId, hash);
      const list = Array.isArray(raw) ? raw : (raw.result || raw.users || []);
      vehicles = list.map(normalizeVehicle);
      renderAll();
    }

    // Update "last updated" bar
    const now = new Date();
    document.getElementById('update-time').textContent =
      'Updated: ' + now.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  } catch (err) {
    console.warn('Refresh error:', err);
  }
}

// ===== Render All =====
function renderAll() {
  showLoadingOverlay(false);
  const query = (document.getElementById('search-input').value || '').toLowerCase().trim();
  const filtered = query
    ? vehicles.filter(function (v) {
        return (v.name || '').toLowerCase().includes(query) ||
               (v.username || '').toLowerCase().includes(query);
      })
    : vehicles;

  renderVehicleList(filtered);
  updateMarkers(vehicles); // always show all vehicles on map

  // Update count
  document.getElementById('assets-count').textContent =
    'All assets (' + vehicles.length + ')';
}

// ===== Vehicle List =====
function renderVehicleList(list) {
  const container = document.getElementById('vehicle-list');

  if (list.length === 0) {
    container.innerHTML = '<div class="empty-state">No vehicles found.</div>';
    return;
  }

  // Build HTML
  const html = list.map(function (v) {
    const status  = getStatus(v);
    const speed   = getSpeedKmh(v);
    const latlng  = getLatLng(v);
    const lastStr = v.deviceActivity || v.trackPoint?.utc;
    const ago     = timeAgo(lastStr);
    const isActive = v.id === selectedVehicleId;
    const coordStr = latlng ? latlng.lat.toFixed(4) + ', ' + latlng.lng.toFixed(4) : '—';

    return '<div class="vehicle-item' + (isActive ? ' active' : '') + '" data-id="' + v.id + '">' +
      '<div class="status-dot ' + status + '"></div>' +
      '<div class="vehicle-info">' +
        '<div class="vehicle-name">' + escapeHtml(v.name || v.username || 'Vehicle ' + v.id) + '</div>' +
        '<div class="vehicle-addr" data-vid="' + v.id + '">' + coordStr + '</div>' +
        '<div class="vehicle-meta">' +
          '<span class="vehicle-time">' + escapeHtml(ago) + '</span>' +
          '<span class="vehicle-speed">' + speed + ' km/h</span>' +
        '</div>' +
      '</div>' +
      '<div class="vehicle-actions">' +
        '<button class="icon-btn" data-action="map" data-id="' + v.id + '" title="Show on map">📍</button>' +
        '<button class="icon-btn" data-action="info" data-id="' + v.id + '" title="Details">›</button>' +
      '</div>' +
    '</div>';
  }).join('');

  container.innerHTML = html;

  // Attach click handlers
  container.querySelectorAll('.vehicle-item').forEach(function (el) {
    el.addEventListener('click', function (e) {
      // Don't trigger if clicking action buttons (they handle themselves)
      if (e.target.closest('.icon-btn')) return;
      const id = parseInt(el.dataset.id);
      showVehicleDetail(id);
    });
  });

  container.querySelectorAll('[data-action="map"]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      panToVehicle(id);
    });
  });

  container.querySelectorAll('[data-action="info"]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      showVehicleDetail(id);
    });
  });

  // Async: geocode addresses in background
  list.forEach(function (v) {
    const latlng = getLatLng(v);
    if (!latlng) return;
    queueGeocode(latlng.lat, latlng.lng, function (addr) {
      const el = container.querySelector('.vehicle-addr[data-vid="' + v.id + '"]');
      if (el) {
        const shortAddr = addr.length > 40 ? addr.substring(0, 37) + '…' : addr;
        el.textContent = shortAddr;
      }
    });
  });
}

// ===== Map Markers =====
function updateMarkers(list) {
  if (!map) return;

  const seen = new Set();

  list.forEach(function (v) {
    const latlng = getLatLng(v);
    if (!latlng) return;

    seen.add(v.id);
    const status  = getStatus(v);
    const speed   = getSpeedKmh(v);
    const heading = getHeading(v);
    const name    = v.name || v.username || 'Vehicle ' + v.id;

    if (markers[v.id]) {
      // Update existing marker
      const m = markers[v.id];
      m.setLatLng([latlng.lat, latlng.lng]);

      // Update icon
      const icon = createVehicleIcon(status, heading);
      m.setIcon(icon);

      // Update tooltip
      m.setTooltipContent('<span class="v-tooltip">' + escapeHtml(name) + ' · ' + speed + ' km/h</span>');

    } else {
      // Create new marker
      const icon = createVehicleIcon(status, heading);
      const m = L.marker([latlng.lat, latlng.lng], { icon: icon });

      m.bindTooltip(
        '<span class="v-tooltip">' + escapeHtml(name) + ' · ' + speed + ' km/h</span>',
        { permanent: false, direction: 'top', offset: [0, -16], className: '' }
      );

      m.on('click', function () { showVehicleDetail(v.id); });
      m.addTo(map);
      markers[v.id] = m;
    }
  });

  // Remove markers for vehicles no longer in list
  Object.keys(markers).forEach(function (id) {
    if (!seen.has(parseInt(id))) {
      map.removeLayer(markers[id]);
      delete markers[id];
    }
  });
}

function createVehicleIcon(status, heading) {
  const arrowStyle = status === 'moving'
    ? 'transform:rotate(' + heading + 'deg);display:inline-block;'
    : '';

  const inner = status === 'moving'
    ? '<span style="' + arrowStyle + '">▲</span>'
    : status === 'parked'
    ? 'P'
    : '●';

  return L.divIcon({
    className: '',
    html: '<div class="v-marker ' + status + '">' + inner + '</div>',
    iconSize:   [28, 28],
    iconAnchor: [14, 14],
    tooltipAnchor: [0, -16]
  });
}

// ===== Pan to Vehicle =====
function panToVehicle(id) {
  const v = vehicles.find(function (v) { return v.id === id; });
  if (!v) return;
  const latlng = getLatLng(v);
  if (!latlng) return;
  map.setView([latlng.lat, latlng.lng], 16, { animate: true });
  if (markers[id]) markers[id].openTooltip();
}

// ===== Vehicle Detail Popup =====
function showVehicleDetail(id) {
  const v = vehicles.find(function (v) { return v.id === id; });
  if (!v) return;

  selectedVehicleId = id;

  const status  = getStatus(v);
  const speed   = getSpeedKmh(v);
  const latlng  = getLatLng(v);
  const lastStr = v.deviceActivity || v.trackPoint?.utc;

  // Status label
  const statusLabels = { moving: 'Moving', parked: 'Parked', offline: 'Offline' };

  document.getElementById('popup-name').textContent     = v.name || v.username || 'Vehicle';
  document.getElementById('popup-username').textContent = v.username || '';
  document.getElementById('popup-status').textContent   = statusLabels[status] || status;
  document.getElementById('popup-status').className     = 'popup-status ' + status;
  document.getElementById('popup-lastseen').textContent = formatTime(lastStr);
  document.getElementById('popup-speed').textContent    = speed + ' km/h';
  document.getElementById('popup-addr').textContent     = latlng
    ? latlng.lat.toFixed(5) + ', ' + latlng.lng.toFixed(5)
    : '—';

  // Show popup
  document.getElementById('vehicle-popup').classList.add('visible');

  // Highlight in list
  document.querySelectorAll('.vehicle-item').forEach(function (el) {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });

  // Pan map to vehicle
  if (latlng) {
    map.setView([latlng.lat, latlng.lng], Math.max(map.getZoom(), 14), { animate: true });
  }

  // Async geocode address
  if (latlng) {
    queueGeocode(latlng.lat, latlng.lng, function (addr) {
      const el = document.getElementById('popup-addr');
      if (el) el.textContent = addr;
    });
  }
}

function closePopup() {
  document.getElementById('vehicle-popup').classList.remove('visible');
  selectedVehicleId = null;
  document.querySelectorAll('.vehicle-item').forEach(function (el) {
    el.classList.remove('active');
  });
}

// ===== Search =====
function handleSearch() {
  renderAll();
}

// ===== Logout =====
function handleLogout() {
  if (refreshInterval) clearInterval(refreshInterval);
  localStorage.removeItem('gps_hash');
  localStorage.removeItem('gps_appId');
  localStorage.removeItem('gps_appName');
  localStorage.removeItem('gps_username');
  localStorage.removeItem('gps_password');
  localStorage.removeItem('gps_session');
  localStorage.removeItem('gps_csrf');
  window.location.href = 'index.html';
}

// ===== Utilities =====
function showLoadingOverlay(show) {
  const el = document.getElementById('loading-overlay');
  if (el) el.style.display = show ? 'flex' : 'none';
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
