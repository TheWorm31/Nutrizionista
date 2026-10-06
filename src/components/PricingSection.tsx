'use client'

import React from 'react'
import Link from 'next/link'
import { PRICING_SERVICES, PricingService } from '@/config/pricing'

interface PricingSectionProps {
  onSelectService?: (serviceId: string) => void
}

export default function PricingSection({ onSelectService }: PricingSectionProps) {
  const handleSelectService = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId)
    } else {
      const el = document.getElementById('prenota')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="tariffe" className="section-padding scroll-mt-20" style={{ background: 'var(--cream)' }}>
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Tariffe e Prestazioni</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: '1rem'
          }}>
            Listino Prezzi & Percorsi Nutrizionali
          </h2>
          <p style={{
            color: 'var(--muted)',
            maxWidth: '56ch',
            margin: '0 auto',
            fontSize: '1rem',
            lineHeight: 1.75
          }}>
            Massima trasparenza per la tua salute. Tutte le prestazioni sono sanitarie e <b>detraibili al 19%</b> in dichiarazione dei redditi.
          </p>
        </div>

        {/* Grid Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_SERVICES.map((service: PricingService) => (
            <div
              key={service.id}
              className={`reveal flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                service.popular
                  ? 'border-2 border-plum shadow-md bg-white'
                  : 'border border-gray-200 bg-white hover:border-plum/40'
              }`}
              style={{ borderRadius: 'var(--radius-xl)' }}
            >
              <div>
                {/* Clean Inline Badge */}
                {service.badge ? (
                  <div className="mb-3">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold tracking-wide ${
                      service.popular
                        ? 'bg-plum text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {service.badge}
                    </span>
                  </div>
                ) : (
                  <div className="h-4 mb-3" />
                )}

                {/* Header card */}
                <div className="mb-4">
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--charcoal)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed min-h-[3rem]">
                    {service.description}
                  </p>
                </div>

                {/* Price block */}
                <div className="py-4 my-2 border-y border-gray-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold font-display" style={{ color: 'var(--plum)' }}>
                      {service.price}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">/ seduta</span>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                    ⏱ {service.duration}
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 my-5 text-xs text-gray-600">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-plum shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {service.id === 'nutrizione-sportiva' && (
                  <Link
                    href="/nutrizione-sportiva"
                    className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs text-white bg-[#0052FF] hover:bg-[#003ECC] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>⚡ Scopri i 4 Percorsi Sportivi</span>
                    <span>→</span>
                  </Link>
                )}
                {service.id === 'dca-equilibrio' && (
                  <Link
                    href="/disturbi-alimentari-dna"
                    className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs text-white bg-plum hover:bg-plum-dark transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>💜 Scopri il Percorso DNA</span>
                    <span>→</span>
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => handleSelectService(service.id)}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    service.popular
                      ? 'btn-primary shadow-gold'
                      : 'border border-plum/30 text-plum hover:bg-plum/5'
                  }`}
                >
                  <span>Prenota questa visita</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note / Info Box */}
        <div className="mt-12 max-w-3xl mx-auto p-4 sm:p-6 rounded-2xl bg-white/80 border border-gray-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
          <div className="w-12 h-12 rounded-full bg-plum/10 text-plum flex items-center justify-center shrink-0 text-xl font-bold">
            💡
          </div>
          <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-gray-800 mb-0.5">Nota sulla detraibilità e fatturazione:</p>
            Tutti gli importi sono esenti IVA (ex Art. 10 DPR 633/72). In quanto spese sanitarie professionali, le ricevute emesse sono integramente <b>detraibili al 19%</b> tramite pagamento tracciabile (carte, bonifico o POS in studio).
          </div>
        </div>

      </div>
    </section>
  )
}
