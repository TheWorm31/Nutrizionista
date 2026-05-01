import './globals.css'
import type { Metadata } from 'next'

// No next/font import needed — fonts are loaded via @import in globals.css

export const metadata: Metadata = {
  title: 'Dott.ssa Giada Marinaro | Biologa Nutrizionista Roma',
  description: 'Servizi di nutrizione personalizzati con sistema di prenotazioni online e marketplace per pacchetti di visite.',
  keywords: 'nutrizionista, Roma, Giada Marinaro, dieta, alimentazione, prenotazioni online',
  authors: [{ name: 'Dott.ssa Giada Marinaro' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Dott.ssa Giada Marinaro | Biologa Nutrizionista Roma',
    description: 'Servizi di nutrizione personalizzati con sistema di prenotazioni online e marketplace per pacchetti di visite.',
    type: 'website',
    locale: 'it_IT',
    siteName: 'Dott.ssa Giada Marinaro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dott.ssa Giada Marinaro | Biologa Nutrizionista Roma',
    description: 'Servizi di nutrizione personalizzati con sistema di prenotazioni online e marketplace per pacchetti di visite.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      {/* Remove the inter.className — body font is set in globals.css */}
      <body>
        {children}
      </body>
    </html>
  )
}

