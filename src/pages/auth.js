/**
 * Fram Digital Fusion — Auth Page (Login / Signup)
 * Full-screen page with gradient background, no navbar/sidebar.
 * Toggles between login and signup views with form validation.
 */

import { i18n } from '../i18n.js';
import { store } from '../store.js';
import { router } from '../router.js';
import { showToast } from '../components/toast.js';

let mode = 'login'; // 'login' | 'signup'
let selectedRole = '';

export function render() {
  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';

  return `
    <div id="auth-page" style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:24px;font-family:'Inter',sans-serif;
      background:linear-gradient(135deg,#0a0f1a 0%,#111827 50%,#1a2332 100%);">

      <div id="auth-container" style="
        display:flex;width:100%;max-width:1000px;min-height:560px;
        background:rgba(255,255,255,0.97);backdrop-filter:blur(20px);
        border-radius:24px;overflow:hidden;
        box-shadow:0 25px 60px rgba(0,0,0,0.3);
        position:relative;z-index:10;">

        <!-- Left Panel (branding) -->
        <div style="
          flex:1;padding:48px;display:flex;flex-direction:column;
          justify-content:center;
          background:linear-gradient(135deg,#059669 0%,#10b981 50%,#34d399 100%);
          color:white;position:relative;overflow:hidden;min-width:320px;">
          <div style="position:relative;z-index:2;">
            <span style="font-size:60px;display:block;margin-bottom:16px;">🌾</span>
            <h1 style="margin:0 0 8px;font-size:32px;font-weight:900;
              font-family:'Outfit','Inter',sans-serif;">
              ${i18n.t('auth.loginTitle')}
            </h1>
            <h2 style="margin:0 0 16px;font-size:26px;font-weight:800;
              font-family:'Outfit','Inter',sans-serif;opacity:0.95;">
              ${i18n.t('app.name')}
            </h2>
            <p style="margin:0 0 24px;font-size:15px;opacity:0.85;line-height:1.7;">
              ${i18n.t('app.description')}
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <span style="padding:6px 14px;background:rgba(255,255,255,0.2);border-radius:20px;
                font-size:12px;font-weight:600;">🚫 ${i18n.t('app.tagline')}</span>
              <span style="padding:6px 14px;background:rgba(255,255,255,0.2);border-radius:20px;
                font-size:12px;font-weight:600;">💰 Fair Prices</span>
              <span style="padding:6px 14px;background:rgba(255,255,255,0.2);border-radius:20px;
                font-size:12px;font-weight:600;">🌿 Farm Fresh</span>
            </div>
          </div>
          <!-- Decorative circles -->
          <div style="position:absolute;bottom:-40px;right:-40px;width:200px;height:200px;
            border-radius:50%;background:rgba(255,255,255,0.1);pointer-events:none;"></div>
          <div style="position:absolute;top:-20px;right:60px;width:100px;height:100px;
            border-radius:50%;background:rgba(255,255,255,0.08);pointer-events:none;"></div>
        </div>

        <!-- Right Panel (form) -->
        <div style="flex:1;padding:40px 48px;display:flex;
          flex-direction:column;justify-content:center;min-width:360px;
          background:white;">

          <!-- Tab Toggle -->
          <div id="auth-tabs" style="display:flex;margin-bottom:28px;background:#f3f4f6;
            border-radius:12px;padding:4px;">
            <button type="button" id="auth-login-tab" style="
              flex:1;padding:12px;border:none;border-radius:10px;
              font-size:15px;font-weight:700;cursor:pointer;
              font-family:'Inter',sans-serif;transition:all 0.25s;
              ${isLogin ? 'background:white;color:#059669;box-shadow:0 2px 8px rgba(0,0,0,0.1);' : 'background:transparent;color:#9ca3af;'}">
              ${i18n.t('auth.login')}
            </button>
            <button type="button" id="auth-signup-tab" style="
              flex:1;padding:12px;border:none;border-radius:10px;
              font-size:15px;font-weight:700;cursor:pointer;
              font-family:'Inter',sans-serif;transition:all 0.25s;
              ${isSignup ? 'background:white;color:#059669;box-shadow:0 2px 8px rgba(0,0,0,0.1);' : 'background:transparent;color:#9ca3af;'}">
              ${i18n.t('auth.signup')}
            </button>
          </div>

          <!-- Error message area -->
          <div id="auth-error" style="display:none;padding:12px 16px;margin-bottom:16px;
            background:#fef2f2;border:1px solid #fecaca;border-radius:10px;
            color:#dc2626;font-size:13px;font-weight:500;"></div>

          <!-- Form Content -->
          <div id="auth-form-content">
            ${isLogin ? renderLoginForm() : renderSignupForm()}
          </div>

          <!-- Demo Accounts -->
          <div style="margin-top:20px;padding:14px 16px;background:#f0fdf4;
            border-radius:12px;border:1px solid #bbf7d0;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#059669;">
              🔑 Demo Accounts
            </p>
            <p style="margin:0 0 4px;font-size:12px;color:#4b5563;">
              🌾 <strong>Farmer:</strong> ramesh@farm.com / farmer123
            </p>
            <p style="margin:0;font-size:12px;color:#4b5563;">
              🏪 <strong>Buyer:</strong> buyer@rest.com / buyer123
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderLoginForm() {
  return `
    <form id="auth-login-form" novalidate>
      <div style="margin-bottom:18px;">
        <label for="login-email" style="display:block;margin-bottom:6px;
          font-size:13px;font-weight:600;color:#374151;">
          ${i18n.t('auth.email')}
        </label>
        <input type="email" id="login-email" required placeholder="you@example.com"
          style="width:100%;padding:12px 16px;border:2px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;
          transition:border-color 0.2s,box-shadow 0.2s;box-sizing:border-box;"
          onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.12)'"
          onblur="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'" />
      </div>
      <div style="margin-bottom:24px;">
        <label for="login-password" style="display:block;margin-bottom:6px;
          font-size:13px;font-weight:600;color:#374151;">
          ${i18n.t('auth.password')}
        </label>
        <input type="password" id="login-password" required placeholder="••••••••"
          style="width:100%;padding:12px 16px;border:2px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;
          transition:border-color 0.2s,box-shadow 0.2s;box-sizing:border-box;"
          onfocus="this.style.borderColor='#10b981';this.style.boxShadow='0 0 0 3px rgba(16,185,129,0.12)'"
          onblur="this.style.borderColor='#e5e7eb';this.style.boxShadow='none'" />
      </div>
      <button type="submit" id="login-submit-btn" style="
        width:100%;padding:14px;border:none;border-radius:12px;
        background:linear-gradient(135deg,#059669,#10b981);color:white;
        font-size:16px;font-weight:700;cursor:pointer;
        font-family:'Inter',sans-serif;transition:all 0.2s;
        box-shadow:0 4px 14px rgba(5,150,105,0.35);"
        onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(5,150,105,0.45)'"
        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 14px rgba(5,150,105,0.35)'">
        ${i18n.t('auth.login')}
      </button>
    </form>
  `;
}

function renderSignupForm() {
  return `
    <form id="auth-signup-form" novalidate style="max-height:380px;overflow-y:auto;padding-right:6px;">
      <div style="margin-bottom:14px;">
        <label for="signup-name" style="display:block;margin-bottom:5px;
          font-size:13px;font-weight:600;color:#374151;">
          ${i18n.t('auth.name')}
        </label>
        <input type="text" id="signup-name" required placeholder="Your full name"
          style="width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;box-sizing:border-box;
          transition:border-color 0.2s;"
          onfocus="this.style.borderColor='#10b981'"
          onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div style="margin-bottom:14px;">
        <label for="signup-email" style="display:block;margin-bottom:5px;
          font-size:13px;font-weight:600;color:#374151;">
          ${i18n.t('auth.email')}
        </label>
        <input type="email" id="signup-email" required placeholder="you@example.com"
          style="width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;box-sizing:border-box;
          transition:border-color 0.2s;"
          onfocus="this.style.borderColor='#10b981'"
          onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div style="margin-bottom:14px;">
        <label for="signup-password" style="display:block;margin-bottom:5px;
          font-size:13px;font-weight:600;color:#374151;">
          ${i18n.t('auth.password')}
        </label>
        <input type="password" id="signup-password" required placeholder="Min 6 characters"
          style="width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:10px;
          font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;box-sizing:border-box;
          transition:border-color 0.2s;"
          onfocus="this.style.borderColor='#10b981'"
          onblur="this.style.borderColor='#e5e7eb'" />
      </div>
      <div style="display:flex;gap:12px;margin-bottom:14px;">
        <div style="flex:1;">
          <label for="signup-phone" style="display:block;margin-bottom:5px;
            font-size:13px;font-weight:600;color:#374151;">
            ${i18n.t('auth.phone')}
          </label>
          <input type="tel" id="signup-phone" required placeholder="+91-9XXXXXXXXX"
            style="width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:10px;
            font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#000000;box-sizing:border-box;
            transition:border-color 0.2s;"
            onfocus="this.style.borderColor='#10b981'"
            onblur="this.style.borderColor='#e5e7eb'" />
        </div>
        <div style="flex:1;">
          <label for="signup-location" style="display:block;margin-bottom:5px;
            font-size:13px;font-weight:600;color:#374151;">
            ${i18n.t('auth.location')}
          </label>
          <input type="text" id="signup-location" required placeholder="City, State"
            style="width:100%;padding:10px 14px;border:2px solid #e5e7eb;border-radius:10px;
            font-size:14px;font-family:'Inter',sans-serif;outline:none;color:#1f2937;box-sizing:border-box;
            transition:border-color 0.2s;"
            onfocus="this.style.borderColor='#10b981'"
            onblur="this.style.borderColor='#e5e7eb'" />
        </div>
      </div>

      <!-- Role Selector -->
      <label style="display:block;margin-bottom:8px;font-size:13px;font-weight:600;color:#374151;">
        ${i18n.t('auth.role')}
      </label>
      <div style="display:flex;gap:12px;margin-bottom:18px;">
        <button type="button" class="role-card" data-role="farmer" id="role-farmer-btn" style="
          flex:1;padding:18px 14px;border:2px solid ${selectedRole === 'farmer' ? '#10b981' : '#e5e7eb'};
          border-radius:14px;background:${selectedRole === 'farmer' ? '#f0fdf4' : 'white'};
          cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Inter',sans-serif;">
          <span style="font-size:32px;display:block;margin-bottom:6px;">👨‍🌾</span>
          <span style="font-size:14px;font-weight:700;color:${selectedRole === 'farmer' ? '#059669' : '#1f2937'};
            display:block;margin-bottom:4px;">
            ${i18n.t('roles.farmer')}
          </span>
          <span style="font-size:11px;color:#6b7280;line-height:1.4;display:block;">
            ${i18n.t('roles.farmerDesc')}
          </span>
        </button>
        <button type="button" class="role-card" data-role="buyer" id="role-buyer-btn" style="
          flex:1;padding:18px 14px;border:2px solid ${selectedRole === 'buyer' ? '#10b981' : '#e5e7eb'};
          border-radius:14px;background:${selectedRole === 'buyer' ? '#f0fdf4' : 'white'};
          cursor:pointer;text-align:center;transition:all 0.2s;font-family:'Inter',sans-serif;">
          <span style="font-size:32px;display:block;margin-bottom:6px;">🏪</span>
          <span style="font-size:14px;font-weight:700;color:${selectedRole === 'buyer' ? '#059669' : '#1f2937'};
            display:block;margin-bottom:4px;">
            ${i18n.t('roles.buyer')}
          </span>
          <span style="font-size:11px;color:#6b7280;line-height:1.4;display:block;">
            ${i18n.t('roles.buyerDesc')}
          </span>
        </button>
      </div>

      <button type="submit" id="signup-submit-btn" style="
        width:100%;padding:14px;border:none;border-radius:12px;
        background:linear-gradient(135deg,#059669,#10b981);color:white;
        font-size:16px;font-weight:700;cursor:pointer;
        font-family:'Inter',sans-serif;transition:all 0.2s;
        box-shadow:0 4px 14px rgba(5,150,105,0.35);"
        onmouseover="this.style.transform='translateY(-1px)'"
        onmouseout="this.style.transform='translateY(0)'">
        ${i18n.t('auth.signup')}
      </button>
    </form>
  `;
}

function showError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function hideError() {
  const el = document.getElementById('auth-error');
  if (el) el.style.display = 'none';
}

export function init() {
  console.log('[auth] init() called, mode =', mode);

  // ── Tab toggles ──
  const loginTab = document.getElementById('auth-login-tab');
  const signupTab = document.getElementById('auth-signup-tab');

  if (loginTab) {
    loginTab.onclick = function() {
      console.log('[auth] Login tab clicked');
      mode = 'login';
      selectedRole = '';
      const app = document.getElementById('app');
      if (app) { app.innerHTML = render(); init(); }
    };
  }

  if (signupTab) {
    signupTab.onclick = function() {
      console.log('[auth] Signup tab clicked');
      mode = 'signup';
      const app = document.getElementById('app');
      if (app) { app.innerHTML = render(); init(); }
    };
  }

  // ── Login form ──
  const loginForm = document.getElementById('auth-login-form');
  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      hideError();
      const email = document.getElementById('login-email')?.value.trim();
      const password = document.getElementById('login-password')?.value;

      if (!email || !email.includes('@')) {
        showError(i18n.t('auth.invalidEmail'));
        return;
      }
      if (!password || password.length < 3) {
        showError('Please enter your password.');
        return;
      }

      const result = store.login(email, password);
      if (result.success) {
        showToast(i18n.t('auth.loginSuccess'), 'success');
        router.navigate('#/home');
      } else {
        showError(result.error);
      }
    };
  }

  // ── Signup form ──
  const signupForm = document.getElementById('auth-signup-form');
  if (signupForm) {
    // Role selection
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(function(card) {
      card.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('[auth] Role selected:', card.dataset.role);
        selectedRole = card.dataset.role;
        const app = document.getElementById('app');
        if (app) { app.innerHTML = render(); init(); }
      };
    });

    signupForm.onsubmit = function(e) {
      e.preventDefault();
      hideError();

      const name = document.getElementById('signup-name')?.value.trim();
      const email = document.getElementById('signup-email')?.value.trim();
      const password = document.getElementById('signup-password')?.value;
      const phone = document.getElementById('signup-phone')?.value.trim();
      const location = document.getElementById('signup-location')?.value.trim();

      if (!name) { showError('Please enter your name.'); return; }
      if (!email || !email.includes('@')) { showError(i18n.t('auth.invalidEmail')); return; }
      if (!password || password.length < 6) { showError('Password must be at least 6 characters.'); return; }
      if (!phone) { showError('Please enter your phone number.'); return; }
      if (!location) { showError('Please enter your location.'); return; }
      if (!selectedRole) { showError(i18n.t('auth.selectRole')); return; }

      const result = store.signup({ name, email, password, phone, location, role: selectedRole });
      if (result.success) {
        showToast(i18n.t('auth.signupSuccess'), 'success');
        router.navigate('#/home');
      } else {
        showError(result.error);
      }
    };
  }
}
