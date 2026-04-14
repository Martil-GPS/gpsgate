/**
 * login.js - Login page logic
 */

document.addEventListener('DOMContentLoaded', function () {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const continueBtn   = document.getElementById('btn-continue');
  const errorMsg      = document.getElementById('error-msg');
  const loginForm     = document.getElementById('login-form');
  const appSection    = document.getElementById('app-section');
  const appList       = document.getElementById('app-list');

  // If already logged in with a session, check if app was selected
  const savedHash   = localStorage.getItem('gps_hash');
  const savedAppId  = localStorage.getItem('gps_appId');
  if (savedHash && savedAppId) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Enable/disable Continue button based on inputs
  function checkInputs() {
    const hasUser = usernameInput.value.trim().length > 0;
    const hasPass = passwordInput.value.length > 0;
    continueBtn.disabled = !(hasUser && hasPass);
  }

  usernameInput.addEventListener('input', checkInputs);
  passwordInput.addEventListener('input', checkInputs);

  // Allow pressing Enter in password field
  passwordInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !continueBtn.disabled) handleLogin();
  });

  continueBtn.addEventListener('click', handleLogin);

  async function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Show loading state
    continueBtn.disabled = true;
    continueBtn.innerHTML = '<span class="btn-spinner"></span>Connecting...';
    hideError();

    try {
      const session = await apiLogin(username, password);
      const apps = getApplications(session);

      if (apps.length === 0) {
        throw new Error('No applications found for this account.');
      }

      // Store credentials for potential re-login
      localStorage.setItem('gps_username', username);
      localStorage.setItem('gps_password', password);
      localStorage.setItem('gps_session', JSON.stringify(session));

      if (apps.length === 1) {
        // Only one app — select it automatically
        await selectApp(apps[0], username, password);
      } else {
        // Show app list
        showAppList(apps, username, password);
      }

    } catch (err) {
      showError(err.message || 'Login failed. Please try again.');
      continueBtn.disabled = false;
      continueBtn.textContent = 'Continue';
    }
  }

  function showAppList(apps, username, password) {
    // Hide the form fields, show app section
    loginForm.style.display = 'none';
    appSection.classList.add('visible');
    appList.innerHTML = '';

    apps.forEach(function (app) {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.innerHTML =
        '<div class="app-icon">🗺️</div>' +
        '<div class="app-name">' + escapeHtml(app.name) + '</div>' +
        '<div class="app-arrow">›</div>';

      card.addEventListener('click', function () {
        selectApp(app, username, password);
      });

      appList.appendChild(card);
    });
  }

  async function selectApp(app, username, password) {
    // Show loading
    appList.innerHTML = '<div style="padding:20px;text-align:center;color:#888;">Connecting to ' + escapeHtml(app.name) + '...</div>';

    try {
      // Login again with specific appId to get app-scoped session + hash
      const appSession = await apiLoginToApp(username, password, app.id);

      // Persist session data
      localStorage.setItem('gps_hash',    appSession.Hash);
      localStorage.setItem('gps_appId',   app.id.toString());
      localStorage.setItem('gps_appName', app.name);
      localStorage.setItem('gps_username', username);
      if (appSession.CsrfToken) {
        localStorage.setItem('gps_csrf', appSession.CsrfToken);
      }

      // Navigate to dashboard
      window.location.href = 'dashboard.html';

    } catch (err) {
      // Fall back: use existing session hash
      const savedSession = JSON.parse(localStorage.getItem('gps_session') || '{}');
      if (savedSession.Hash) {
        localStorage.setItem('gps_hash',    savedSession.Hash);
        localStorage.setItem('gps_appId',   app.id.toString());
        localStorage.setItem('gps_appName', app.name);
        if (savedSession.CsrfToken) {
          localStorage.setItem('gps_csrf', savedSession.CsrfToken);
        }
        window.location.href = 'dashboard.html';
      } else {
        showError('Failed to connect to ' + app.name + ': ' + (err.message || 'Unknown error'));
        // Re-show login form
        loginForm.style.display = '';
        appSection.classList.remove('visible');
        document.getElementById('btn-continue').disabled = false;
        document.getElementById('btn-continue').textContent = 'Continue';
      }
    }
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
  }

  function hideError() {
    errorMsg.classList.remove('visible');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
});
