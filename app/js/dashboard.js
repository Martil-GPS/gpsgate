/**
 * dashboard.js — Logjika e dashboard-it
 *
 * - Kontrollon autentikimin
 * - Ngarkon listën e mjeteve
 * - Auto-refresh çdo 3 sekonda
 * - Renderon sidebar-in
 * - Handle klikimin e mjeteve
 */

/* Variablat globale */
var vehicles = [];
var vehiclesWithPositions = [];
var refreshInterval = null;
var REFRESH_MS = 3000; // 3 sekonda

document.addEventListener('DOMContentLoaded', function () {
  // Kontrollo autentikimin
  var token = localStorage.getItem('gps_token');
  var appId = localStorage.getItem('gps_appId');

  if (!token || !appId) {
    // Nuk ka token — kthe te login
    window.location.href = 'index.html';
    return;
  }

  // Shfaq username në header (nëse kemi element)
  var usernameEl = document.getElementById('headerUsername');
  if (usernameEl) {
    usernameEl.textContent = localStorage.getItem('gps_username') || '';
  }

  // Inicializo hartën
  initMap();

  // Ngarko të dhënat
  loadDashboard(token, appId);

  // Auto-refresh çdo 3 sekonda
  refreshInterval = setInterval(function () {
    refreshPositions(token, appId);
  }, REFRESH_MS);

  // Logout
  var logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.clear();
      window.location.href = 'index.html';
    });
  }

  // Kërkim në sidebar
  var searchInput = document.getElementById('vehicleSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterVehicleList(this.value);
    });
  }
});

/**
 * Ngarko të gjitha të dhënat e dashboard-it
 * @param {string} token
 * @param {string} appId
 */
async function loadDashboard(token, appId) {
  showSpinner();

  try {
    // Merr listën e mjeteve
    var data = await getVehicles(token, appId);
    vehicles = Array.isArray(data) ? data : [];

    // Merr pozicionet për çdo mjet
    vehiclesWithPositions = await getAllPositions(token, appId, vehicles);

    // Rendero sidebar
    renderVehicleList(vehiclesWithPositions);

    // Përditëso hartën
    updateAllMarkers(vehiclesWithPositions);

    // Përditëso statistikat në header
    updateStats(vehiclesWithPositions);

    // Përditëso kohën e fundit
    updateLastUpdateTime();
  } catch (err) {
    console.error('Gabim gjatë ngarkimit:', err);
  } finally {
    hideSpinner();
  }
}

/**
 * Refresh vetëm pozicionet (pa ringarkuar listën e mjeteve)
 * @param {string} token
 * @param {string} appId
 */
async function refreshPositions(token, appId) {
  try {
    vehiclesWithPositions = await getAllPositions(token, appId, vehicles);
    renderVehicleList(vehiclesWithPositions);
    updateAllMarkers(vehiclesWithPositions);
    updateStats(vehiclesWithPositions);
    updateLastUpdateTime();
  } catch (err) {
    console.error('Gabim gjatë refresh:', err);
  }
}

/**
 * Rendero listën e mjeteve në sidebar
 * @param {Array} list
 */
function renderVehicleList(list) {
  var container = document.getElementById('vehicleList');
  if (!container) return;

  container.innerHTML = '';

  if (!list || list.length === 0) {
    container.innerHTML = '<li style="padding:20px;text-align:center;color:#888;">Nuk u gjetën mjete</li>';
    return;
  }

  list.forEach(function (v) {
    var id = v.id || v.Id || v.ID;
    var name = v.name || v.Name || v.username || v.Username || ('Mjet ' + id);
    var isOnline = isVehicleOnline(v);
    var speed = 0;

    if (v.position) {
      speed = v.position.speed || v.position.Speed || 0;
    }

    var li = document.createElement('li');
    li.className = 'vehicle-item';
    li.setAttribute('data-id', id);

    li.innerHTML =
      '<span class="status-dot ' + (isOnline ? 'online' : 'offline') + '"></span>' +
      '<div class="vehicle-info">' +
        '<div class="vehicle-name">' + escapeHtml(name) + '</div>' +
        '<div class="vehicle-speed">' +
          (isOnline ? Math.round(speed) + ' km/h' : 'Offline') +
        '</div>' +
      '</div>';

    // Klik → zoom te mjeti në hartë
    li.addEventListener('click', function () {
      // Hiq active nga të gjithë
      document.querySelectorAll('.vehicle-item.active').forEach(function (el) {
        el.classList.remove('active');
      });
      li.classList.add('active');
      focusVehicle(id);
    });

    container.appendChild(li);
  });
}

/**
 * Filtro listën e mjeteve sipas tekstit të kërkimit
 * @param {string} query
 */
function filterVehicleList(query) {
  var items = document.querySelectorAll('.vehicle-item');
  var q = query.toLowerCase();

  items.forEach(function (item) {
    var name = item.querySelector('.vehicle-name');
    if (name) {
      var text = name.textContent.toLowerCase();
      item.style.display = text.includes(q) ? '' : 'none';
    }
  });
}

/**
 * Përditëso statistikat në header
 * @param {Array} list
 */
function updateStats(list) {
  var totalEl = document.getElementById('statTotal');
  var onlineEl = document.getElementById('statOnline');
  var offlineEl = document.getElementById('statOffline');

  var total = list ? list.length : 0;
  var online = 0;

  if (list) {
    list.forEach(function (v) {
      if (isVehicleOnline(v)) online++;
    });
  }

  if (totalEl) totalEl.textContent = total;
  if (onlineEl) onlineEl.textContent = online;
  if (offlineEl) offlineEl.textContent = (total - online);
}

/**
 * Kontrollo nëse mjeti është online
 * Konsiderohet online nëse ka pozicion brenda 5 minutave
 * @param {Object} vehicle
 * @returns {boolean}
 */
function isVehicleOnline(vehicle) {
  if (!vehicle.position) return false;

  var time = vehicle.position.time || vehicle.position.Time || vehicle.position.timestamp;
  if (!time) return !!vehicle.position;

  try {
    var posTime = new Date(time).getTime();
    var now = Date.now();
    // Online nëse pozicioni është brenda 5 minutave
    return (now - posTime) < 5 * 60 * 1000;
  } catch (e) {
    return !!vehicle.position;
  }
}

/* ---------- Helpers ---------- */

/**
 * Përditëso kohën e fundit të refresh-it në header
 */
function updateLastUpdateTime() {
  var el = document.getElementById('lastUpdate');
  if (el) {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    el.textContent = 'U përditësua: ' + hours + ':' + minutes + ':' + seconds;
  }
}

function showSpinner() {
  var s = document.getElementById('spinner');
  if (s) s.classList.remove('hidden');
}

function hideSpinner() {
  var s = document.getElementById('spinner');
  if (s) s.classList.add('hidden');
}

/**
 * Escape HTML për të parandaluar XSS
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
