import { google } from 'googleapis'

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

    console.log('Attempting to append to sheet:', spreadsheetId)

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1', // Using just 'A1' often defaults to the first sheet regardless of name
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
