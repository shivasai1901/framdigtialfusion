/**
 * Fram Digital Fusion — Internationalisation (i18n)
 * ==================================================
 * Supports English (en), Telugu (te), and Hindi (hi).
 *
 * Usage:
 *   import { i18n } from './i18n.js';
 *   i18n.t('auth.login');          // → 'Login'
 *   i18n.setLanguage('te');        // switches to Telugu
 *   i18n.formatPrice(1234);        // → '₹1,234.00'
 *   i18n.on('language-change', fn);
 */

import { translations } from './data/translations.js';

/* ------------------------------------------------------------------ */
/*  Internal state                                                    */
/* ------------------------------------------------------------------ */

/** Currently active language code. */
let currentLang = localStorage.getItem('fdf_lang') || 'en';

/** Map of event-name → Set<callback> for the mini event emitter. */
const listeners = {};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/**
 * Resolve a dot-separated key from a nested object.
 * e.g. resolve(obj, 'auth.login') → obj.auth.login
 *
 * @param {object} obj  - Root object to traverse.
 * @param {string} path - Dot-separated key path.
 * @returns {string|undefined} The resolved value or undefined.
 */
function resolve(obj, path) {
  return path.split('.').reduce((acc, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

export const i18n = {

  /**
   * Translate a key.
   * Falls back to English if the key is missing in the current language,
   * then falls back to the raw key string itself.
   *
   * @param {string} key - Dot-notation key, e.g. 'auth.login'.
   * @returns {string} Translated string.
   */
  t(key) {
    // Try the current language first
    let value = resolve(translations[currentLang], key);
    if (value !== undefined) return value;

    // Try namespace2 variant (e.g. 'cart.title' → 'cart2.title')
    const parts = key.split('.');
    if (parts.length >= 2) {
      const altKey = parts[0] + '2.' + parts.slice(1).join('.');
      value = resolve(translations[currentLang], altKey);
      if (value !== undefined) return value;
    }

    // Fallback to English
    if (currentLang !== 'en') {
      value = resolve(translations.en, key);
      if (value !== undefined) return value;
      // English namespace2
      if (parts.length >= 2) {
        const altKey = parts[0] + '2.' + parts.slice(1).join('.');
        value = resolve(translations.en, altKey);
        if (value !== undefined) return value;
      }
    }

    // Last resort — return the key itself so missing keys are visible in the UI
    return key;
  },

  /**
   * Change the active language.
   *
   * @param {'en'|'te'|'hi'} lang - Language code.
   */
  setLanguage(lang) {
    if (!translations[lang]) {
      console.error(`[i18n] Unknown language code: "${lang}"`);
      return;
    }

    const previousLang = currentLang;
    currentLang = lang;
    localStorage.setItem('fdf_lang', lang);

    // Notify listeners
    this._emit('language-change', { lang, previousLang });
  },

  /**
   * Get the current language code.
   *
   * @returns {'en'|'te'|'hi'}
   */
  getLanguage() {
    return currentLang;
  },

  /**
   * List all supported languages with metadata.
   *
   * @returns {Array<{code: string, name: string, nativeName: string, flag: string}>}
   */
  getLanguages() {
    return [
      { code: 'en', name: 'English',  nativeName: 'English', flag: '🇬🇧' },
      { code: 'te', name: 'Telugu',   nativeName: 'తెలుగు',  flag: '🇮🇳' },
      { code: 'hi', name: 'Hindi',    nativeName: 'हिंदी',   flag: '🇮🇳' }
    ];
  },

  /**
   * Format a number as Indian Rupee currency.
   * Uses the locale matching the current language for thousands-grouping.
   *
   * @param {number} amount - Amount in ₹.
   * @returns {string} e.g. '₹1,234.00'
   */
  formatPrice(amount) {
    const localeMap = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
    const locale = localeMap[currentLang] || 'en-IN';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  },

  /**
   * Format a date string into a locale-appropriate readable date.
   *
   * @param {string|Date} dateStr - ISO date string or Date object.
   * @returns {string} e.g. '15 Jun 2026'
   */
  formatDate(dateStr) {
    if (!dateStr) return '';
    const localeMap = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };
    const locale = localeMap[currentLang] || 'en-IN';
    try {
      return new Date(dateStr).toLocaleDateString(locale, {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch {
      return String(dateStr);
    }
  },

  /* ---------------------------------------------------------------- */
  /*  Mini event emitter                                              */
  /* ---------------------------------------------------------------- */

  /**
   * Subscribe to an i18n event.
   *
   * @param {string}   event    - Event name (e.g. 'language-change').
   * @param {Function} callback - Handler function.
   * @returns {Function} Unsubscribe function.
   */
  on(event, callback) {
    if (!listeners[event]) {
      listeners[event] = new Set();
    }
    listeners[event].add(callback);

    // Return an unsubscribe function for convenience
    return () => listeners[event].delete(callback);
  },

  /**
   * Emit an event to all registered listeners.
   * @private
   *
   * @param {string} event - Event name.
   * @param {*}      data  - Payload to pass to handlers.
   */
  _emit(event, data) {
    if (!listeners[event]) return;
    listeners[event].forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error(`[i18n] Error in "${event}" listener:`, err);
      }
    });
  }
};
