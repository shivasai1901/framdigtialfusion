/**
 * Fram Digital Fusion — Toast Notification System
 * Slide-in notifications from top-right with auto-dismiss.
 */

import { i18n } from '../i18n.js';

const ICONS = {
  success: 'check-circle',
  error: 'x-circle',
  info: 'info',
  warning: 'alert-triangle',
};

const COLORS = {
  success: '#059669',
  error: '#dc2626',
  info: '#2563eb',
  warning: '#d97706',
};

let toastCounter = 0;

/**
 * Show a toast notification.
 * @param {string} message - The message to display
 * @param {'success'|'error'|'info'|'warning'} type - Toast type
 * @param {number} duration - Auto-dismiss time in ms (default 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = `toast-${++toastCounter}`;
  const icon = ICONS[type] || ICONS.info;
  const color = COLORS[type] || COLORS.info;

  const toastEl = document.createElement('div');
  toastEl.id = id;
  toastEl.className = `toast toast-${type}`;
  toastEl.setAttribute('role', 'alert');
  toastEl.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    margin-bottom: 10px;
    background: white;
    border-left: 4px solid ${color};
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #1f2937;
    min-width: 300px;
    max-width: 450px;
    transform: translateX(120%);
    transition: transform 0.35s cubic-bezier(0.21, 1.02, 0.73, 1);
    cursor: pointer;
    z-index: 10000;
  `;

  toastEl.innerHTML = `
    <i data-lucide="${icon}" style="width:20px;height:20px;color:${color};flex-shrink:0;"></i>
    <span style="flex:1;">${message}</span>
    <button class="toast-close-btn" data-toast-id="${id}" style="background:none;border:none;cursor:pointer;padding:2px;color:#9ca3af;font-size:18px;line-height:1;" aria-label="Close">×</button>
  `;

  container.appendChild(toastEl);

  // Initialize Lucide icons within this toast
  if (typeof lucide !== 'undefined') {
    try { lucide.createIcons({ nodes: [toastEl] }); } catch(e) { /* ignore */ }
  }

  // Slide in
  requestAnimationFrame(() => {
    toastEl.style.transform = 'translateX(0)';
  });

  // Close handler
  const closeBtn = toastEl.querySelector('.toast-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissToast(toastEl);
    });
  }
  toastEl.addEventListener('click', () => dismissToast(toastEl));

  // Auto-dismiss
  setTimeout(() => dismissToast(toastEl), duration);
}

function dismissToast(el) {
  if (!el || !el.parentNode) return;
  el.style.transform = 'translateX(120%)';
  el.style.opacity = '0';
  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 350);
}
