import { google } from 'googleapis'
import { supabase } from './supabase'

// Initialize Google Calendar API
const calendar = google.calendar({ version: 'v3' })

export interface CalendarSlot {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
  isAvailable: boolean
}

export async function getAvailableSlots(): Promise<CalendarSlot[]> {
  try {
    // First, try to get real events from Google Calendar
    const realEvents = await getRealCalendarEvents()
    
    if (realEvents.length > 0) {
      console.log(`Found ${realEvents.length} real calendar events`)
      return realEvents
    }
    
    // If no real events or Google Calendar not accessible, return empty
    console.log('No real calendar events found - calendar appears fully booked')
    return []

  } catch (error) {
    console.error('Error fetching available slots:', error)
    return []
  }
}

export async function getRealCalendarEvents(): Promise<CalendarSlot[]> {
  try {
    const calendarId = 'wizliza@gmail.com'
    
    if (!process.env.GOOGLE_CALENDAR_CLIENT_EMAIL || !process.env.GOOGLE_CALENDAR_PRIVATE_KEY) {
      console.log('Google Calendar credentials not configured')
      return []
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Get events from Google Calendar for the next 7 days
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next 7 days
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []
    console.log(`Retrieved ${events.length} events from Google Calendar`)
    
    // Debug: Log some events to see what we're getting
    if (events.length > 0) {
      console.log('Sample events:')
      events.slice(0, 3).forEach(event => {
        const title = event.summary || 'Evento senza titolo'
        console.log(`  - ${title}: ${event.start?.dateTime} to ${event.end?.dateTime}`)
      })
    }

    // Calculate available slots by finding gaps in your schedule
    const availableSlots = calculateAvailableSlots(events)
    
    return availableSlots

  } catch (error) {
    console.error('Error fetching real calendar events:', error)
    return []
  }
}

function calculateAvailableSlots(events: any[]): CalendarSlot[] {
  const slots: CalendarSlot[] = []
  const today = new Date()
  
  // Generate potential appointment slots for the next 7 days
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    // Skip weekends for nutritionist appointments
    if (date.getDay() === 0 || date.getDay() === 6) continue
    
    // Define potential appointment times (8 AM - 7 PM, 1-hour slots)
    const potentialSlots = [
      { start: 8, end: 9 },
      { start: 9, end: 10 },
      { start: 10, end: 11 },
      { start: 11, end: 12 },
      { start: 13, end: 14 },
      { start: 14, end: 15 },
      { start: 15, end: 16 },
      { start: 16, end: 17 },
      { start: 17, end: 18 },
      { start: 18, end: 19 }
    ]
    
    potentialSlots.forEach((slot, index) => {
      const slotStart = new Date(date)
      slotStart.setHours(slot.start, 0, 0, 0)
      
      const slotEnd = new Date(date)
      slotEnd.setHours(slot.end, 0, 0, 0)
      
      // Check if this slot conflicts with any existing events
      const hasConflict = events.some(event => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false
        
        const eventStart = new Date(event.start.dateTime)
        const eventEnd = new Date(event.end.dateTime)
        
        // Check if the appointment slot overlaps with any existing event
        const overlaps = (slotStart < eventEnd && slotEnd > eventStart)
        
        if (overlaps) {
          const eventTitle = event.summary || 'Evento senza titolo'
          console.log(`  Slot ${slot.start}:00-${slot.end}:00 conflicts with ${eventTitle}`)
        }
        
        return overlaps
      })
      
      // If no conflict, this slot is available
      if (!hasConflict) {
        console.log(`  Available slot: ${slot.start}:00-${slot.end}:00 on ${date.toDateString()}`)
        slots.push({
          id: `real-${i}-${index}`,
          title: 'Disponibile',
          start: slotStart,
          end: slotEnd,
          description: 'Prima visita nutrizionale',
          isAvailable: true
        })
      }
    })
  }
  
  console.log(`Calculated ${slots.length} available slots from real calendar data`)
  return slots
}

export async function syncWithGoogleCalendar(): Promise<boolean> {
  try {
    // For demo purposes, we'll use wizliza@gmail.com as the calendar
    const calendarId = 'wizliza@gmail.com'
    
    if (!process.env.GOOGLE_CALENDAR_API_KEY) {
      console.log('Google Calendar API key not configured, skipping sync')
      return true
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    })

    const calendar = google.calendar({ version: 'v3', auth })

    // Get events from Google Calendar
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      timeMax: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Next 30 days
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items || []

    // Process events and update database
    for (const event of events) {
      if (event.start?.dateTime && event.end?.dateTime) {
        const startTime = new Date(event.start.dateTime)
        const endTime = new Date(event.end.dateTime)
        
        // Check if this is a busy time (not available)
        // Based on your calendar, you have scheduled activities, so these times are NOT available
        const isAvailable = false // Your calendar shows you're busy with scheduled activities

        // Upsert event in database
        await supabase
          .from('calendar_events')
          .upsert({
            id: event.id || undefined,
            title: event.summary || 'Evento',
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            description: event.description,
            is_available: isAvailable
          }, {
            onConflict: 'id'
          })
      }
    }

    return true
  } catch (error) {
    console.error('Error syncing with Google Calendar:', error)
    return false
  }
}

export async function bookAppointment(slotId: string, contactData: {
  nome: string
  cognome: string
  email: string
  telefono?: string
}): Promise<boolean> {
  try {
    // Mark slot as unavailable in database
    const { error: updateError } = await supabase
      .from('calendar_events')
      .update({ 
        is_available: false,
        title: `Appuntamento - ${contactData.nome} ${contactData.cognome}`,
        description: `Cliente: ${contactData.nome} ${contactData.cognome}\nEmail: ${contactData.email}\nTelefono: ${contactData.telefono || 'Non fornito'}`
      })
      .eq('id', slotId)

    if (updateError) {
      console.error('Error booking appointment:', updateError)
      return false
    }

    // TODO: Add Google Calendar event creation here if needed
    // This would require additional Google Calendar write permissions

    return true
  } catch (error) {
    console.error('Error booking appointment:', error)
    return false
  }
}

// Generate realistic available slots based on your actual schedule
export function generateSampleSlots(): CalendarSlot[] {
  // Based on your actual calendar, you're completely booked with:
  // 8-9 AM Break, 9-10 AM GYM, 10-12 PM Coursera, 12-2 PM Break, 2-4 PM Learning
  // You have NO availability during normal business hours
  
  console.log('Calendar is fully booked - no availability slots to show')
  return [] // Return empty array - no availability
}
