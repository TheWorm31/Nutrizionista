'use client'

import React, { useState, useEffect } from 'react'
import { getCookiePreferences, saveCookiePreferences, DEFAULT_PREFERENCES, CookiePreferences } from '@/lib/cookies'

interface CookieManagerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CookieManager({ isOpen, onClose }: CookieManagerProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    if (isOpen) {
      // Load existing preferences
      const savedPrefs = getCookiePreferences()
      setPreferences(savedPrefs)
    }
  }, [isOpen])

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences)
    onClose()
  }

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytical: true,
      marketing: false // Still default to false for marketing
    }
    setPreferences(allAccepted)
    handleSavePreferences()
  }

  const handleRejectAll = () => {
    setPreferences(DEFAULT_PREFERENCES)
    handleSavePreferences()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Gestione Cookie
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg p-1"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <p className="text-gray-700 mb-6">
              Gestisci le tue preferenze sui cookie. Puoi abilitare o disabilitare diversi tipi di cookie 
              secondo le tue necessità. I cookie necessari non possono essere disabilitati.
            </p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cookie Necessari</h3>
                    <p className="text-sm text-gray-600">Sempre attivi</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-6 bg-plum rounded-full flex items-center justify-end pr-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati. 
                  Includono cookie di sessione, sicurezza e preferenze di base.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cookie Funzionali</h3>
                    <p className="text-sm text-gray-600">Migliorano l'esperienza utente</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-700">
                  Questi cookie permettono al sito di ricordare le tue scelte e fornire funzionalità migliorate 
                  e personalizzate.
                </p>
              </div>

              {/* Analytical Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cookie Analitici</h3>
                    <p className="text-sm text-gray-600">Ci aiutano a migliorare il sito</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytical}
                      onChange={(e) => handlePreferenceChange('analytical', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-700">
                  Questi cookie ci aiutano a capire come gli utenti interagiscono con il sito web, 
                  fornendo informazioni anonime per migliorare le prestazioni.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cookie di Marketing</h3>
                    <p className="text-sm text-gray-600">Per pubblicità personalizzata</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-700">
                  Questi cookie vengono utilizzati per fornire pubblicità più rilevanti per te e i tuoi interessi.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Rifiuta Tutti
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-plum border border-transparent rounded-lg hover:bg-plum-mid focus:outline-none focus:ring-2 focus:ring-plum focus:ring-offset-2 transition-colors"
                  >
                    Accetta Tutti
                  </button>
                </div>
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-2 text-sm font-medium text-white bg-plum border border-transparent rounded-lg hover:bg-plum-mid focus:outline-none focus:ring-2 focus:ring-plum focus:ring-offset-2 transition-colors"
                >
                  Salva Preferenze
                </button>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>
                Per maggiori informazioni, consulta la nostra{' '}
                <a href="/privacy" className="text-plum hover:text-plum-mid underline">
                  Privacy Policy
                </a>{' '}
                e la nostra{' '}
                <a href="/cookies" className="text-plum hover:text-plum-mid underline">
                  Cookie Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
