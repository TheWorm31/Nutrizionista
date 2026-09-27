import { google } from 'googleapis'

let headersChecked = false

export async function ensureSheetHeaders(sheetsInstance?: any, spreadsheetIdParam?: string) {
  if (headersChecked) return
  try {
    const spreadsheetId = spreadsheetIdParam || process.env.GOOGLE_SHEETS_ID
    const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY

    if (!spreadsheetId || !clientEmail || !privateKey) {
      return
    }

    let sheets = sheetsInstance
    if (!sheets) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
      sheets = google.sheets({ version: 'v4', auth })
    }

    const targetHeaders = [
      'Data Invio',
      'Nome',
      'Cognome',
      'Email',
      'Telefono',
      'Messaggio',
      'Tipologia',
      'Data Appuntamento',
      'Modalità Visita',
      'Sede Studio',
      'Prestazione'
    ]

    // Read range A1:K1 to verify if header row needs updating
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:K1',
    })

    const currentHeaders = res.data.values?.[0] || []
    const needsUpdate = targetHeaders.some((h, i) => currentHeaders[i] !== h)

    if (needsUpdate) {
      console.log('Updating row 1 headers A1:K1 in Google Sheet...')
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'A1:K1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [targetHeaders]
        }
      })
      console.log('Google Sheet headers A1:K1 updated successfully!')
    }

    headersChecked = true
  } catch (err: any) {
    console.error('Could not auto-update headers in Google Sheet:', err?.message || err)
  }
}

// Automatically attempt header update on module initialization
ensureSheetHeaders().catch(() => {})

export async function appendToSheet(values: any[]) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID
    const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error('Google Sheets credentials or ID missing')
      return false
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Ensure cell K1 ("Prestazione") exists
    await ensureSheetHeaders(sheets, spreadsheetId)

    console.log('Attempting to append to sheet:', spreadsheetId)

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1', // Append row below existing content
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    })

    console.log('Google Sheets response status:', response.status)
    return response.status === 200
  } catch (error: any) {
    console.error('Error appending to Google Sheet:', error.message || error)
    if (error.response) {
      console.error('Google API Error Details:', error.response.data)
    }
    return false
  }
}
