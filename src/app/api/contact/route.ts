import { NextRequest, NextResponse } from 'next/server'
import { appendToSheet } from '@/lib/sheets'
import { bookAppointment } from '@/lib/calendar'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, cognome, email, telefono, messaggio, selectedSlot } = body

    // Validate required fields
    if (!nome || !cognome || !email || (!messaggio && !selectedSlot)) {
      return NextResponse.json(
        { error: 'Tutti i campi obbligatori devono essere compilati' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato email non valido' },
        { status: 400 }
      )
    }

    // 1. Save to Google Sheets or Book Appointment
    let success = false
    
    if (selectedSlot) {
      // If a slot is selected, we book the appointment which also saves to sheets
      success = await bookAppointment(selectedSlot, { 
        nome: nome.trim(), 
        cognome: cognome.trim(), 
        email: email.trim().toLowerCase(), 
        telefono: telefono?.trim(),
        messaggio: messaggio?.trim()
      })
    } else {
      // Regular contact form submission
      const timestamp = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
      success = await appendToSheet([
        timestamp,
        nome.trim(),
        cognome.trim(),
        email.trim().toLowerCase(),
        telefono?.trim() || 'N/A',
        messaggio.trim(),
        'CONTATTO',
        '' // Empty Appointment Date column
      ])
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Errore nel salvataggio della richiesta. Riprova più tardi.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: selectedSlot 
        ? 'Appuntamento prenotato con successo! Controlla la tua email per la conferma.'
        : 'Richiesta inviata con successo! Ti risponderemo al più presto.'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova più tardi.' },
      { status: 500 }
    )
  }
}
