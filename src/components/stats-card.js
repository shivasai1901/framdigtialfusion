/**
 * Fram Digital Fusion — Stats Card Component
 * Dashboard stat card with icon, label, value, trend, and gradient background.
 */

import { i18n } from '../i18n.js';

/**
 * Render a stats card.
 * @param {Object} opts
 * @param {string} opts.icon - Lucide icon name
 * @param {string} opts.label - Stat label (i18n key or text)
 * @param {string|number} opts.value - Stat value
 * @param {Object} [opts.trend] - { direction: 'up'|'down', percentage: number }
 * @param {string} [opts.color] - Color theme: 'green'|'blue'|'orange'|'purple'
 * @returns {string} HTML string
 */
export function renderStatsCard({ icon, label, value, trend, color = 'green' }) {
  const gradients = {
    green: 'linear-gradient(135deg, #059669, #10b981)',
    blue: 'linear-gradient(135deg, #2563eb, #3b82f6)',
    orange: 'linear-gradient(135deg, #d97706, #f59e0b)',
    purple: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
  };

  const bgGradient = gradients[color] || gradients.green;

  const trendHtml = trend ? `
    <div class="stats-card-trend" style="
      display:flex;align-items:center;gap:4px;
      font-size:13px;font-weight:600;
      color:${trend.direction === 'up' ? '#059669' : '#dc2626'};">
      <i data-lucide="${trend.direction === 'up' ? 'trending-up' : 'trending-down'}"
         style="width:16px;height:16px;"></i>
      <span>${trend.percentage}%</span>
    </div>` : '';

  return `
    <div class="stats-card" style="
      background:white;border-radius:16px;padding:24px;
      display:flex;align-items:flex-start;gap:16px;
      box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);
      transition:transform 0.2s,box-shadow 0.2s;
      cursor:default;flex:1;min-width:200px;">
      <div class="stats-card-icon" style="
        width:48px;height:48px;border-radius:12px;
        background:${bgGradient};
        display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i data-lucide="${icon}" style="width:24px;height:24px;color:white;"></i>
      </div>
      <div style="flex:1;min-width:0;">
        <p class="stats-card-label" style="
          margin:0 0 4px;font-size:13px;color:#6b7280;
          font-weight:500;text-transform:uppercase;letter-spacing:0.05em;">
          ${label}
        </p>
        <div style="display:flex;align-items:baseline;gap:10px;">
          <h3 class="stats-card-value" data-target="${value}" style="
            margin:0;font-size:28px;font-weight:800;color:#111827;
            font-family:'Outfit','Inter',sans-serif;">
            ${value}
          </h3>
          ${trendHtml}
        </div>
      </div>
    </div>
  `;
}

/**
 * Optionally animate counter values after render.
 * Call after DOM insertion.
 */
export function initStatsCards() {
  document.querySelectorAll('.stats-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)';
    });
  });
}
