'use client'

import { useState, useEffect } from 'react'
import { CalendarSlot } from '@/lib/calendar'

interface CalendarProps {
  onSlotSelect?: (slot: CalendarSlot) => void
  selectedSlot?: CalendarSlot | null
}

// Extended interface to handle both Date and string types
interface CalendarSlotWithFlexibleDates extends Omit<CalendarSlot, 'start' | 'end'> {
  start: Date | string
  end: Date | string
}

export default function AvailabilityCalendar({ onSlotSelect, selectedSlot }: CalendarProps) {
  const [slots, setSlots] = useState<CalendarSlotWithFlexibleDates[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Set mounted state
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only fetch after component is mounted and on client side
    if (isMounted && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        fetchAvailableSlots()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [isMounted])

  const fetchAvailableSlots = async () => {
    // Don't fetch if component is not mounted
    if (!isMounted) return
    
    try {
      setLoading(true)
      setError(null)
      
      console.log('Fetching calendar slots...')
      const response = await fetch('/api/calendar/slots', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache'
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Received data:', data)
      
      if (data.success && data.slots) {
        setSlots(data.slots || [])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      console.error('Error fetching slots:', err)
      const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto'
      setError(errorMessage)
      
      // Retry mechanism - retry up to 3 times
      if (retryCount < 3) {
        console.log(`Retrying fetch (attempt ${retryCount + 1}/3)...`)
        setRetryCount(prev => prev + 1)
        setTimeout(() => {
          fetchAvailableSlots()
        }, 1000 * (retryCount + 1)) // Exponential backoff
      } else {
        // Set empty slots on final failure to prevent infinite loading
        setSlots([])
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return new Intl.DateTimeFormat('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj)
  }

  const formatTime = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date)
    return new Intl.DateTimeFormat('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj)
  }

  const groupSlotsByDate = (slots: CalendarSlotWithFlexibleDates[]) => {
    const grouped: { [key: string]: CalendarSlotWithFlexibleDates[] } = {}
    
    slots.forEach(slot => {
      // Ensure start is a Date object
      const startDate = slot.start instanceof Date ? slot.start : new Date(slot.start)
      const dateKey = startDate.toDateString()
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(slot)
    })
    
    return grouped
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-plum"></div>
        <span className="ml-3 text-gray-600">Caricamento disponibilità...</span>
        {retryCount > 0 && (
          <span className="ml-2 text-sm text-gray-500">
            (Tentativo {retryCount}/3)
          </span>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 mb-2">
            <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Errore nel caricamento</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-x-3">
            <button 
              onClick={() => {
                setRetryCount(0)
                setError(null)
                fetchAvailableSlots()
              }}
              className="btn-primary"
            >
              Riprova
            </button>
            <button 
              onClick={() => {
                setError(null)
                setSlots([])
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Continua senza calendario
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg mx-auto">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-3">Calendario Completamente Occupato</h3>
          <p className="text-red-600 mb-4">
            La Dott.ssa Giada Marinaro ha un calendario completamente pieno con attività programmate.
          </p>
          <div className="bg-white border border-red-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-red-800 mb-2">Attività Programmate:</h4>
            <ul className="text-sm text-red-600 text-left space-y-1">
              <li>• 8:00 - 9:00: Break</li>
              <li>• 9:00 - 10:00: GYM</li>
              <li>• 10:00 - 12:00: Coursera Learning</li>
              <li>• 12:00 - 14:00: Break</li>
              <li>• 14:00 - 16:00: 24ore BS Learning</li>
            </ul>
          </div>
          <p className="text-red-600 text-sm">
            <strong>Soluzione:</strong> Compila il form di contatto per richiedere un appuntamento personalizzato. 
            Ti contatteremo per trovare un orario alternativo.
          </p>
        </div>
      </div>
    )
  }

  const groupedSlots = groupSlotsByDate(slots)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Seleziona un orario</h3>
        <p className="text-gray-600">Scegli il giorno e l'orario che preferisci per la tua prima visita</p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSlots).map(([dateKey, daySlots]) => (
          <div key={dateKey} className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {formatDate(daySlots[0].start)}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {daySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => {
                    // Convert flexible dates back to CalendarSlot format
                    const calendarSlot: CalendarSlot = {
                      ...slot,
                      start: slot.start instanceof Date ? slot.start : new Date(slot.start),
                      end: slot.end instanceof Date ? slot.end : new Date(slot.end)
                    }
                    onSlotSelect?.(calendarSlot)
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    selectedSlot?.id === slot.id
                      ? 'border-plum bg-plum/5 text-plum'
                      : 'border-gray-200 hover:border-plum/30 hover:bg-plum/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">
                        {formatTime(slot.start)} - {formatTime(slot.end)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {slot.description || 'Prima visita nutrizionale'}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      selectedSlot?.id === slot.id ? 'bg-plum' : 'bg-gray-300'
                    }`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="bg-plum/5 border border-plum/20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-plum mr-3">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-charcoal">
                Slot selezionato: {formatDate(selectedSlot.start)} alle {formatTime(selectedSlot.start)}
              </p>
              <p className="text-sm text-plum">
                Procedi con la compilazione del form per confermare la prenotazione
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
