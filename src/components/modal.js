/**
 * Fram Digital Fusion — Modal Component
 * Reusable modal dialog with backdrop, animated open/close, and action buttons.
 */

import { i18n } from '../i18n.js';

let modalVisible = false;

/**
 * Show a modal dialog.
 * @param {string} title - Modal title
 * @param {string} content - HTML content string
 * @param {Array<{label: string, class: string, onClick: Function}>} actions - Action buttons
 */
export function showModal(title, content, actions = []) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  modalVisible = true;

  const actionsHtml = actions.map((action, idx) =>
    `<button id="modal-action-${idx}" class="modal-btn ${action.class || ''}"
       style="padding:10px 24px;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;
       font-family:'Inter',sans-serif;transition:all 0.2s;
       ${action.class === 'btn-primary' ? 'background:linear-gradient(135deg,#059669,#10b981);color:white;' :
         action.class === 'btn-danger' ? 'background:#dc2626;color:white;' :
         'background:#f3f4f6;color:#374151;'}">
       ${action.label}
     </button>`
  ).join('');

  container.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop" style="
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);
      z-index:9000;display:flex;align-items:center;justify-content:center;
      opacity:0;transition:opacity 0.25s ease;">
      <div class="modal-dialog" id="modal-dialog" style="
        background:white;border-radius:16px;padding:28px;
        min-width:380px;max-width:520px;width:90%;
        box-shadow:0 25px 60px rgba(0,0,0,0.3);
        transform:scale(0.9) translateY(20px);
        transition:transform 0.3s cubic-bezier(0.21,1.02,0.73,1), opacity 0.3s;
        opacity:0;font-family:'Inter',sans-serif;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="margin:0;font-size:18px;font-weight:700;color:#111827;">${title}</h3>
          <button id="modal-close-btn" style="background:none;border:none;cursor:pointer;font-size:22px;color:#9ca3af;padding:4px;line-height:1;" aria-label="${i18n.t('modal.close')}">×</button>
        </div>
        <div class="modal-body" style="color:#4b5563;font-size:15px;line-height:1.6;margin-bottom:24px;">
          ${content}
        </div>
        ${actions.length > 0 ? `<div class="modal-actions" style="display:flex;gap:10px;justify-content:flex-end;">${actionsHtml}</div>` : ''}
      </div>
    </div>
  `;

  // Animate in
  requestAnimationFrame(() => {
    const backdrop = document.getElementById('modal-backdrop');
    const dialog = document.getElementById('modal-dialog');
    if (backdrop) backdrop.style.opacity = '1';
    if (dialog) {
      dialog.style.transform = 'scale(1) translateY(0)';
      dialog.style.opacity = '1';
    }
  });

  // Close button handler
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click to close
  const backdrop = document.getElementById('modal-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  // Action button handlers
  actions.forEach((action, idx) => {
    const btn = document.getElementById(`modal-action-${idx}`);
    if (btn && action.onClick) {
      btn.addEventListener('click', () => {
        action.onClick();
        closeModal();
      });
    }
  });
}

/**
 * Close the currently open modal with animation.
 */
export function closeModal() {
  if (!modalVisible) return;

  const backdrop = document.getElementById('modal-backdrop');
  const dialog = document.getElementById('modal-dialog');

  if (dialog) {
    dialog.style.transform = 'scale(0.9) translateY(20px)';
    dialog.style.opacity = '0';
  }
  if (backdrop) {
    backdrop.style.opacity = '0';
  }

  setTimeout(() => {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
    modalVisible = false;
  }, 300);
}
