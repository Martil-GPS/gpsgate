/**
 * api.js — GpsGate REST API Service
 *
 * Bazë URL: https://gps.sts.al/comGpsGate/api/v.1
 * Përdor token Bearer për autorizim.
 */

var API_BASE = getApiBase();

/**
 * Merr API_BASE dinamikisht nga localStorage
 * @returns {string}
 */
function getApiBase() {
  return (localStorage.getItem('gps_server') || 'https://gps.sts.al') + '/comGpsGate/api/v.1';
}

/* ---------- Helpers ---------- */

/**
 * Ndërto headers me Authorization token
 * @param {string} token - JWT token nga login
 * @returns {Headers}
 */
function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

/**
 * Kontrollo përgjigjen e API — nëse 401 redirect te login
 * @param {Response} response
 * @returns {Promise<any>}
 */
async function handleResponse(response) {
  if (response.status === 401) {
    // Token i skaduar ose i pavlefshëm — kthe te login
    localStorage.clear();
    window.location.href = 'index.html';
    throw new Error('Sesioni ka skaduar. Ju lutem hyni përsëri.');
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error('API Error ' + response.status + ': ' + text);
  }

  // Disa endpoint mund të kthejnë përgjigje bosh
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

/* ---------- API Funksionet ---------- */

/**
 * Login — merr token nga API
 * POST /users/login
 * @param {string} username
 * @param {string} password
 * @param {string} application - emri ose ID i aplikacionit
 * @returns {Promise<{token: string, applicationId: number}>}
 */
async function login(username, password, application) {
  const url = getApiBase() + '/applications/' + encodeURIComponent(application) + '/tokens';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error('Login dështoi: ' + text);
  }

  const data = await response.json();

  // API kthen token si string direkt ose si objekt
  if (typeof data === 'string') {
    return { token: data, applicationId: application };
  }

  return {
    token: data.token || data.Token || data,
    applicationId: data.applicationId || data.ApplicationId || data.applicationID || application
  };
}

/**
 * Merr listën e aplikacioneve
 * GET /applications
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Array>}
 */
async function getApplications(username, password) {
  const url = getApiBase() + '/applications';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(username + ':' + password)
    }
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

/**
 * Merr të gjithë përdoruesit/mjetet
 * GET /applications/{appId}/users
 * @param {string} token
 * @param {string|number} appId
 * @returns {Promise<Array>}
 */
async function getVehicles(token, appId) {
  const url = getApiBase() + '/applications/' + appId + '/users';

  const response = await fetch(url, {
    method: 'GET',
    headers: authHeaders(token)
  });

  return handleResponse(response);
}

/**
 * Merr pozicionin e fundit të një mjeti
 * GET /applications/{appId}/users/{userId}/position
 * @param {string} token
 * @param {string|number} appId
 * @param {string|number} userId
 * @returns {Promise<{latitude: number, longitude: number, speed: number, time: string}>}
 */
async function getVehiclePosition(token, appId, userId) {
  const url = getApiBase() + '/applications/' + appId + '/users/' + userId + '/position';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: authHeaders(token)
    });

    return handleResponse(response);
  } catch (err) {
    // Nëse mjeti nuk ka pozicion, kthe null
    console.warn('Pozicioni për mjetin ' + userId + ' nuk u gjet:', err.message);
    return null;
  }
}

/**
 * Merr pozicionet e të gjithë mjeteve
 * Bën loop mbi çdo mjet dhe merr pozicionin
 * @param {string} token
 * @param {string|number} appId
 * @param {Array} vehicles - lista e mjeteve
 * @returns {Promise<Array>} - mjetet me pozicione
 */
async function getAllPositions(token, appId, vehicles) {
  const results = await Promise.allSettled(
    vehicles.map(async function (vehicle) {
      const position = await getVehiclePosition(token, appId, vehicle.id || vehicle.Id || vehicle.ID);
      return {
        ...vehicle,
        position: position
      };
    })
  );

  return results
    .filter(function (r) { return r.status === 'fulfilled'; })
    .map(function (r) { return r.value; });
}
