import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, cognome, email, telefono, messaggio } = body

    // Validate required fields
    if (!nome || !cognome || !email || !messaggio) {
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

    // Save to Supabase database
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        {
          nome: nome.trim(),
          cognome: cognome.trim(),
          email: email.trim().toLowerCase(),
          telefono: telefono?.trim() || null,
          messaggio: messaggio.trim()
        }
      ])

    if (dbError) {
      console.error('Supabase database error:', dbError)
      return NextResponse.json(
        { error: 'Errore nel salvataggio della richiesta. Riprova più tardi.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Richiesta inviata con successo! Ti risponderemo al più presto.'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Errore interno del server. Riprova più tardi.' },
      { status: 500 }
    )
  }
}
