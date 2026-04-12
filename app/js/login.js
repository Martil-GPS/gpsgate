/**
 * login.js — Logjika e faqes së login-it
 *
 * Merr kredencialet nga forma, thirr API login,
 * ruaj token në localStorage dhe redirect te dashboard.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Nëse ka tashmë token, shko direkt te dashboard
  var existingToken = localStorage.getItem('gps_token');
  if (existingToken) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Elementet e formës
  var form = document.getElementById('loginForm');
  var usernameInput = document.getElementById('username');
  var passwordInput = document.getElementById('password');
  var applicationInput = document.getElementById('application');
  var submitBtn = document.getElementById('submitBtn');
  var errorDiv = document.getElementById('loginError');
  var spinner = document.getElementById('spinner');

  // Handle form submit
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorDiv.textContent = '';

    var username = usernameInput.value.trim();
    var password = passwordInput.value.trim();
    var application = applicationInput.value.trim();

    // Validim bazik
    if (!username || !password || !application) {
      errorDiv.textContent = 'Ju lutem plotësoni të gjitha fushat.';
      return;
    }

    // Shfaq spinner, çaktivizo butonin
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;

    try {
      // Thirr API login
      var result = await login(username, password, application);

      // Ruaj të dhënat në localStorage
      localStorage.setItem('gps_token', result.token);
      localStorage.setItem('gps_appId', result.applicationId);
      localStorage.setItem('gps_username', username);

      // Redirect te dashboard
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error('Login error:', err);
      errorDiv.textContent = err.message || 'Ndodhi një gabim gjatë hyrjes.';
    } finally {
      spinner.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });
});
