// Cookie utility functions for GDPR compliance

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytical: boolean
  marketing: boolean
}

export interface CookieConsent {
  preferences: CookiePreferences
  timestamp: string
  version: string
}

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_CONSENT_DATE_KEY = 'cookie-consent-date'
const COOKIE_CONSENT_VERSION = '1.0'

// Default preferences (only necessary cookies enabled)
export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytical: false,
  marketing: false
}

// Get current cookie preferences
export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES
  
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...DEFAULT_PREFERENCES, ...parsed }
    }
  } catch (error) {
    console.error('Error loading cookie preferences:', error)
  }
  
  return DEFAULT_PREFERENCES
}

// Save cookie preferences
export function saveCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, new Date().toISOString())
    
    // Apply the preferences immediately
    applyCookiePreferences(preferences)
  } catch (error) {
    console.error('Error saving cookie preferences:', error)
  }
}

// Check if user has given consent
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false
  
  return localStorage.getItem(COOKIE_CONSENT_KEY) !== null
}

// Get consent timestamp
export function getConsentTimestamp(): string | null {
  if (typeof window === 'undefined') return null
  
  return localStorage.getItem(COOKIE_CONSENT_DATE_KEY)
}

// Apply cookie preferences (enable/disable cookies based on preferences)
export function applyCookiePreferences(preferences: CookiePreferences): void {
  if (typeof window === 'undefined') return
  
  // Necessary cookies are always enabled
  if (preferences.necessary) {
    enableNecessaryCookies()
  }
  
  // Functional cookies
  if (preferences.functional) {
    enableFunctionalCookies()
  } else {
    disableFunctionalCookies()
  }
  
  // Analytical cookies
  if (preferences.analytical) {
    enableAnalyticalCookies()
  } else {
    disableAnalyticalCookies()
  }
  
  // Marketing cookies
  if (preferences.marketing) {
    enableMarketingCookies()
  } else {
    disableMarketingCookies()
  }
}

// Necessary cookies (always enabled)
function enableNecessaryCookies(): void {
  // These cookies are essential for the website to function
  // They are always enabled and don't require consent
  
  // Session cookie
  setCookie('session-id', generateSessionId(), 1) // 1 day
  
  // CSRF token
  setCookie('csrf-token', generateCSRFToken(), 1) // 1 day
  
  // Cookie consent preferences
  const preferences = getCookiePreferences()
  setCookie('cookie-preferences', JSON.stringify(preferences), 365) // 1 year
}

// Functional cookies
function enableFunctionalCookies(): void {
  // Language preference
  const language = navigator.language || 'it'
  setCookie('language-preference', language, 30)
  
  // Theme preference
  setCookie('theme-preference', 'light', 30)
  
  // Form data (temporary)
  setCookie('form-data-saved', 'true', 1)
}

function disableFunctionalCookies(): void {
  deleteCookie('language-preference')
  deleteCookie('theme-preference')
  deleteCookie('form-data-saved')
}

// Analytical cookies
function enableAnalyticalCookies(): void {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  }
  
  // Custom analytics
  setCookie('analytics-enabled', 'true', 365)
}

function disableAnalyticalCookies(): void {
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
  
  deleteCookie('analytics-enabled')
}

// Marketing cookies
function enableMarketingCookies(): void {
  // Marketing tracking
  setCookie('marketing-enabled', 'true', 365)
  
  // Social media tracking
  setCookie('social-tracking', 'enabled', 30)
}

function disableMarketingCookies(): void {
  deleteCookie('marketing-enabled')
  deleteCookie('social-tracking')
}

// Utility functions for cookie management
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

function generateSessionId(): string {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

function generateCSRFToken(): string {
  return 'csrf_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

// Get cookie value
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const nameEQ = name + "="
  const ca = document.cookie.split(';')
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  
  return null
}

// Check if specific cookie type is enabled
export function isCookieTypeEnabled(type: keyof CookiePreferences): boolean {
  const preferences = getCookiePreferences()
  return preferences[type]
}

// Reset all cookie preferences
export function resetCookiePreferences(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem(COOKIE_CONSENT_KEY)
  localStorage.removeItem(COOKIE_CONSENT_DATE_KEY)
  
  // Delete all cookies except necessary ones
  const cookies = document.cookie.split(';')
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim()
    if (name !== 'session-id' && name !== 'csrf-token') {
      deleteCookie(name)
    }
  })
}

// Initialize cookie system
export function initializeCookieSystem(): void {
  if (typeof window === 'undefined') return
  
  // Check if user has already given consent
  if (!hasCookieConsent()) {
    // Show cookie banner
    return
  }
  
  // Apply saved preferences
  const preferences = getCookiePreferences()
  applyCookiePreferences(preferences)
}

// Google Analytics integration
export function initializeGoogleAnalytics(): void {
  if (typeof window === 'undefined') return
  
  const preferences = getCookiePreferences()
  
  if (preferences.analytical) {
    // Initialize Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}`
    document.head.appendChild(script)
    
    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args)
      }
      (window as any).gtag = gtag
      
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID', {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure'
      })
      
      // Set consent
      gtag('consent', 'default', {
        analytics_storage: preferences.analytical ? 'granted' : 'denied',
        ad_storage: preferences.marketing ? 'granted' : 'denied'
      })
    }
  }
}
