/**
 * login.js — Logjika e faqes së login-it
 *
 * Flow i saktë:
 *   HAPI 1: Përdoruesi fut Server URL + Username + Password
 *   HAPI 2: Klikon "Gjej Aplikacionet"
 *   HAPI 3: GET /comGpsGate/api/v.1/applications me Basic Auth
 *   HAPI 4: Shfaqet lista e aplikacioneve
 *   HAPI 5: Përdoruesi zgjedh një aplikacion
 *   HAPI 6: POST /comGpsGate/api/v.1/applications/{appId}/tokens
 *   HAPI 7: Merret token → ruhet në localStorage → redirect te dashboard
 */

var selectedAppId = null;

document.addEventListener('DOMContentLoaded', function () {
  // Nëse ka tashmë token, shko direkt te dashboard
  var existingToken = localStorage.getItem('gps_token');
  if (existingToken) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Elementet
  var btnGetApps = document.getElementById('btnGetApps');
  var btnContinue = document.getElementById('btnContinue');
  var btnBack = document.getElementById('btnBack');
  var errorDiv = document.getElementById('loginError');

  // Faza 1: Gjej Aplikacionet
  btnGetApps.addEventListener('click', handleGetApps);

  // Faza 2: Vazhdo me aplikacionin e zgjedhur
  btnContinue.addEventListener('click', function () {
    if (selectedAppId) {
      handleLogin(selectedAppId);
    }
  });

  // Kthehu te faza 1
  btnBack.addEventListener('click', function () {
    document.getElementById('appListSection').style.display = 'none';
    document.getElementById('credentialsSection').style.display = 'block';
    errorDiv.textContent = '';
    selectedAppId = null;
  });
});

/**
 * Faza 1: Kur klikon "Gjej Aplikacionet"
 * GET /comGpsGate/api/v.1/applications me Basic Auth
 */
async function handleGetApps() {
  var serverUrl = document.getElementById('serverUrl').value.trim();
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var errorDiv = document.getElementById('loginError');
  var spinner = document.getElementById('spinner');
  var btnGetApps = document.getElementById('btnGetApps');

  errorDiv.textContent = '';

  // Validim
  if (!serverUrl || !username || !password) {
    errorDiv.textContent = 'Ju lutem plotësoni të gjitha fushat.';
    return;
  }

  // Hiq trailing slash nga serverUrl
  serverUrl = serverUrl.replace(/\/+$/, '');

  // Ruaj serverUrl në localStorage
  localStorage.setItem('gps_server', serverUrl);

  // Shfaq spinner
  spinner.classList.remove('hidden');
  btnGetApps.disabled = true;

  try {
    var response = await fetch(serverUrl + '/comGpsGate/api/v.1/applications', {
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    });

    if (!response.ok) {
      throw new Error('Gabim: ' + response.status + ' — Kontrolloni kredencialet ose server URL.');
    }

    var apps = await response.json();

    if (!Array.isArray(apps) || apps.length === 0) {
      errorDiv.textContent = 'Nuk u gjetën aplikacione në këtë server.';
      return;
    }

    // Shfaq listën e aplikacioneve
    renderAppList(apps);

    // Kalo te faza 2
    document.getElementById('credentialsSection').style.display = 'none';
    document.getElementById('appListSection').style.display = 'block';

  } catch (err) {
    console.error('Error getting applications:', err);
    errorDiv.textContent = err.message || 'Ndodhi një gabim gjatë lidhjes me serverin.';
  } finally {
    spinner.classList.add('hidden');
    btnGetApps.disabled = false;
  }
}

/**
 * Rendero listën e aplikacioneve si karta të klikueshme
 * @param {Array} apps
 */
function renderAppList(apps) {
  var container = document.getElementById('appList');
  container.innerHTML = '';
  selectedAppId = null;

  var btnContinue = document.getElementById('btnContinue');
  btnContinue.disabled = true;

  apps.forEach(function (app) {
    var id = app.id || app.Id || app.ID;
    var name = app.name || app.Name || ('Aplikacion ' + id);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'app-item';
    btn.setAttribute('data-id', id);
    btn.textContent = name;

    btn.addEventListener('click', function () {
      // Hiq active nga të gjithë
      document.querySelectorAll('.app-item.active').forEach(function (el) {
        el.classList.remove('active');
      });
      btn.classList.add('active');
      selectedAppId = id;
      btnContinue.disabled = false;
    });

    container.appendChild(btn);
  });
}

/**
 * Faza 2: Kur zgjedh aplikacionin dhe klikon "Vazhdo"
 * POST /comGpsGate/api/v.1/applications/{appId}/tokens
 */
async function handleLogin(appId) {
  var serverUrl = localStorage.getItem('gps_server');
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var errorDiv = document.getElementById('loginError');
  var spinner = document.getElementById('spinner');
  var btnContinue = document.getElementById('btnContinue');

  errorDiv.textContent = '';
  spinner.classList.remove('hidden');
  btnContinue.disabled = true;

  try {
    var response = await fetch(serverUrl + '/comGpsGate/api/v.1/applications/' + appId + '/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
      var errText = await response.text();
      throw new Error('Login dështoi: ' + errText);
    }

    // Token mund të vijë si string i thjeshtë ose si JSON
    var token;
    var responseText = await response.text();
    try {
      var jsonData = JSON.parse(responseText);
      token = jsonData.token || jsonData.Token || jsonData;
    } catch (e) {
      // Nuk është JSON — përdor si string direkt
      token = responseText;
    }

    // Hiq thonjëzat e tepërta nëse ka
    if (typeof token === 'string') {
      token = token.replace(/^"|"$/g, '');
    }

    // Ruaj në localStorage
    localStorage.setItem('gps_token', token);
    localStorage.setItem('gps_appId', appId);
    localStorage.setItem('gps_username', username);

    // Redirect te dashboard
    window.location.href = 'dashboard.html';

  } catch (err) {
    console.error('Login error:', err);
    errorDiv.textContent = err.message || 'Ndodhi një gabim gjatë hyrjes.';
    btnContinue.disabled = false;
  } finally {
    spinner.classList.add('hidden');
  }
}
