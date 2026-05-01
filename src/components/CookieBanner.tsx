'use client'

import React, { useState, useEffect } from 'react'
import { saveCookiePreferences, hasCookieConsent, DEFAULT_PREFERENCES } from '@/lib/cookies'

interface CookieBannerProps {
  onAcceptAll: () => void
  onRejectAll: () => void
  onCustomize: () => void
}

export default function CookieBanner({ onAcceptAll, onRejectAll, onCustomize }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    if (!hasCookieConsent()) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const preferences = {
      necessary: true,
      functional: true,
      analytical: true,
      marketing: false // Default to false for marketing
    }
    saveCookiePreferences(preferences)
    setIsVisible(false)
    onAcceptAll()
  }

  const handleRejectAll = () => {
    saveCookiePreferences(DEFAULT_PREFERENCES)
    setIsVisible(false)
    onRejectAll()
  }

  const handleCustomize = () => {
    setIsVisible(false)
    onCustomize()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🍪 Utilizziamo i Cookie
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Utilizziamo cookie per migliorare la tua esperienza di navigazione, fornire funzionalità personalizzate 
              e analizzare il traffico del sito. Puoi scegliere quali cookie accettare.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              <a href="/privacy" className="text-plum hover:text-plum-mid underline">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="/cookies" className="text-plum hover:text-plum-mid underline">
                Cookie Policy
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Rifiuta Tutti
            </button>
            <button
              onClick={handleCustomize}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Personalizza
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-plum border border-transparent rounded-lg hover:bg-plum-mid focus:outline-none focus:ring-2 focus:ring-plum focus:ring-offset-2 transition-colors"
            >
              Accetta Tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
