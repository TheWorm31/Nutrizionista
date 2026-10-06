'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'

export default function DimagrimentoRicomposizionePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showCookieManager, setShowCookieManager] = useState(false)

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-white min-h-screen text-gray-800">
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-300"
        style={{ borderBottom: '1px solid rgba(184, 150, 90, 0.2)' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" aria-label="Torna alla home page" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--charcoal)',
              letterSpacing: '-0.01em'
            }}>
              Dott.ssa Giada Marinaro
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '-2px'
            }}>
              Biologa Nutrizionista · Dimagrimento & Peso
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center" style={{ gap: '1.25rem' }}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/#chi-sono" className="nav-link">Chi Sono</Link>
            <Link 
              href="/dimagrimento-ricomposizione" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gold hover:bg-gold-dark transition-all shadow-xs"
            >
              Dimagrimento & Peso ✨
            </Link>
            <Link 
              href="/nutrizione-clinica" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#1C6B4D] bg-[#1C6B4D]/10 hover:bg-[#1C6B4D]/20 transition-all border border-[#1C6B4D]/20 flex items-center gap-1"
            >
              <span>Clinica 🩺</span>
            </Link>
            <Link 
              href="/nutrizione-sportiva" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#0052FF] bg-[#0052FF]/10 hover:bg-[#0052FF]/20 transition-all border border-[#0052FF]/20 flex items-center gap-1"
            >
              <span>Sportiva ⚡</span>
            </Link>
            <Link 
              href="/disturbi-alimentari-dna" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-plum bg-plum/10 hover:bg-plum/20 transition-all border border-plum/20 flex items-center gap-1"
            >
              <span>DCA / DNA 💜</span>
            </Link>
            <Link 
              href="/#prenota" 
              className="btn-primary text-xs px-4 py-2"
            >
              Prenota una Visita
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              className="text-plum"
              aria-label="Apri menu di navigazione"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div style={{
            background: 'var(--ivory)',
            borderTop: '1px solid rgba(184, 150, 90, 0.2)',
            padding: '1.5rem 1.5rem 2rem'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/#chi-sono" className="nav-link" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
              <Link 
                href="/dimagrimento-ricomposizione" 
                className="font-semibold text-white bg-gold p-2.5 rounded-xl flex items-center justify-between shadow-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Dimagrimento & Aumento Peso</span>
                <span>✨</span>
              </Link>
              <Link 
                href="/nutrizione-clinica" 
                className="font-semibold text-[#1C6B4D] bg-[#1C6B4D]/10 p-2.5 rounded-xl border border-[#1C6B4D]/20 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Nutrizione Clinica & Patologie</span>
                <span>🩺</span>
              </Link>
              <Link 
                href="/nutrizione-sportiva" 
                className="font-semibold text-[#0052FF] bg-[#0052FF]/10 p-2.5 rounded-xl border border-[#0052FF]/20 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Nutrizione Sportiva & Performance</span>
                <span>⚡</span>
              </Link>
              <Link 
                href="/disturbi-alimentari-dna" 
                className="font-semibold text-plum bg-plum/10 p-2.5 rounded-xl border border-plum/20 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Nutrizione per i DNA (DCA)</span>
                <span>💜</span>
              </Link>
              <Link href="/#tariffe" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tariffe</Link>
              <Link 
                href="/#prenota" 
                className="btn-primary text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Prenota una Visita
              </Link>
            </nav>
          </div>
        )}
      </header>


      <main>
        {/* HERO SECTION */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #FFFFFF 100%)' }}>
          
          {/* Subtle Gold Glow */}
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #B8965A 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ background: 'radial-gradient(circle, #6B3E52 0%, transparent 70%)' }} />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-charcoal bg-gold/15 border border-gold/30">
                  <span>✨</span>
                  <span>Gestione del Peso Corporeo & Salute Terapeutica</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  Dimagrimento, Ricomposizione e Aumento Peso.<br />
                  <span className="text-gold">Un percorso sostenibile, costruito su di te.</span>
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
                  <p>
                    La gestione del peso corporeo — che si tratti di ridurre la massa grassa preservando quella magra o di recuperare peso e forza in modo sano — rappresenta un intervento fondamentale per la salute e la qualità della vita.
                  </p>
                  <p>
                    Lontano da schemi drastici o soluzioni temporanee, il mio approccio punta a risultati concreti, sostenibili e misurabili nel tempo, nel pieno rispetto della tua fisiologia e delle tue esigenze personali.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/#prenota" 
                    className="btn-primary shadow-lg flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold"
                  >
                    <span>Prenota la tua visita in studio</span>
                    <span>→</span>
                  </Link>

                  <a 
                    href="#dimagrimento" 
                    className="px-6 py-3.5 rounded-xl font-semibold text-charcoal bg-gold/10 hover:bg-gold/20 transition-all duration-200 border border-gold/30"
                  >
                    Scopri i percorsi ↓
                  </a>
                </div>
              </div>

              {/* Image Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img 
                    src="/immagini/image6.jpeg" 
                    alt="Dimagrimento e Ricomposizione Corporea - Dott.ssa Giada Marinaro" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/30 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold text-lg shrink-0">
                        ✨
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Risultati Sostenibili</div>
                        <div className="text-xs text-gray-600">Preservazione della massa magra e vitalità</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* FEATURE 1: DIMAGRIMENTO E RICOMPOSIZIONE CORPOREA */}
        <section id="dimagrimento" className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 space-y-16">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal">
              
              {/* Photo Left */}
              <div className="lg:col-span-5 relative order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image5.jpeg" 
                    alt="Plicometria e Valutazione Composizione Corporea" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/30 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold text-lg shrink-0">
                        ⚖️
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Perdita Grasso & Massa Magra</div>
                        <div className="text-xs text-gray-600">Intervento terapeutico per la salute generale</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-charcoal bg-gold/15 px-3.5 py-1.5 rounded-full border border-gold/30">
                  Percorso 1
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                  Dimagrimento e Ricomposizione Corporea
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  <p>
                    In ambito clinico, la gestione del peso corporeo è spesso un tassello fondamentale nel percorso di cura, soprattutto quando si convive con condizioni come sovrappeso, obesità, sindrome metabolica, prediabete o dislipidemia. In questi casi, perdere peso — o più precisamente <strong>ridurre la massa grassa mantenendo quella muscolare</strong> — non è solo un obiettivo estetico, ma un intervento terapeutico che ha un impatto diretto e misurabile sul controllo glicemico, sul profilo lipidico, sulla pressione arteriosa e sulla salute cardiovascolare generale.
                  </p>

                  <p>
                    Il percorso viene costruito con particolare attenzione quando è presente una condizione clinica di base: il deficit calorico, il timing dei pasti e la distribuzione dei macronutrienti vengono calibrati non solo per il cambiamento della composizione corporea, ma anche per non interferire con eventuali terapie farmacologiche in corso e per sostenere, e non ostacolare, il quadro clinico generale.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FDFBF7] border-l-4 border-gold text-sm text-gray-800 leading-relaxed shadow-sm">
                  <strong>Zero restrizioni estreme, obiettivi realistici:</strong> So bene quanto i percorsi di dimagrimento possano essere stati, in passato, fonte di frustrazione o fallimenti ripetuti: per questo il mio approccio punta sempre a obiettivi realistici, graduali e mantenibili nel tempo, evitando restrizioni eccessive che nel lungo periodo si rivelano controproducenti. Come sempre, il lavoro procede in coordinamento con il medico o lo specialista che ti segue, per un percorso sicuro ed efficace.
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* FEATURE 2: AUMENTO DI PESO & RECUPERO PONDERALE */}
        <section className="py-24 bg-gradient-to-b from-white via-[#F9F6F0] to-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 space-y-16">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal">
              
              {/* Content Left */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-charcoal bg-gold/15 px-3.5 py-1.5 rounded-full border border-gold/30">
                  Percorso 2
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                  Aumento di Peso e Recupero Ponderale
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                  <p>
                    Non sempre la sfida clinica riguarda il dimagrimento: esistono altrettante situazioni in cui l'obiettivo è, al contrario, <strong>recuperare peso in modo sano ed efficace</strong>. Sottopeso, malnutrizione, calo ponderale involontario legato a patologie acute o croniche, periodi di convalescenza post-chirurgica, o difficoltà ad alimentarsi adeguatamente a causa di terapie oncologiche o altre condizioni impegnative: sono tutte situazioni che richiedono un intervento nutrizionale mirato, spesso urgente, per evitare che la perdita di peso comprometta ulteriormente lo stato di salute generale.
                  </p>

                  <p>
                    In questi casi il lavoro si concentra sull'aumentare in modo strategico l'apporto calorico e proteico, individuando strategie realmente sostenibili anche quando l'appetito è ridotto o l'alimentazione risulta faticosa, dolorosa o poco tollerata.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-gold/30 text-sm text-gray-800 leading-relaxed shadow-sm space-y-2">
                  <div className="font-bold text-gray-900 text-base flex items-center gap-2">
                    <span className="text-gold font-bold">💪</span> Recuperare forza, energie e massa magra
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    L'obiettivo non è semplicemente "far ingrassare", ma recuperare massa magra, forza e energie, sostenendo il sistema immunitario e la capacità dell'organismo di affrontare la cura o la fase di recupero in corso. Anche qui, il percorso viene sempre costruito in stretta collaborazione con il medico curante o l'équipe specialistica, per garantire un intervento nutrizionale sicuro, efficace e realmente integrato.
                  </p>
                </div>
              </div>

              {/* Photo Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image3.jpeg" 
                    alt="Dott.ssa Giada Marinaro Aumento di Peso e Salute" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold/30 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold text-lg shrink-0">
                        🌱
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Recupero Strategico</div>
                        <div className="text-xs text-gray-600">Apporto calorico e proteico mirato e sostenibile</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* CALL TO ACTION BANNER */}
        <section className="py-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4A3A2C 0%, #6B543E 50%, #382A1E 100%)' }}>
          
          <div className="container mx-auto px-6 text-center text-white relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/30">
              Inizia il tuo percorso
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Raggiungi il tuo peso forma e il tuo benessere in modo sostenibile
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Prenota una visita presso lo <strong>Studio di psicologia Michele Facci (Milano)</strong> o presso <strong>Osteopatia Brambilla (Carugate)</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/#prenota" 
                className="px-8 py-4 rounded-xl font-bold bg-white text-[#4A3A2C] shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Prenota la Visita in Studio
              </Link>
              
              <Link 
                href="/#contatti" 
                className="px-8 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-300"
              >
                Contattami per Info
              </Link>
            </div>
          </div>
        </section>

      </main>


      {/* FOOTER */}
      <footer style={{ background: 'var(--charcoal)', color: '#fff' }}>
        <div className="container mx-auto px-6" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div className="grid md:grid-cols-4 gap-10" style={{ marginBottom: '3rem' }}>

            {/* Brand */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                fontWeight: 600, color: '#fff', marginBottom: '0.25rem'
              }}>
                Dott.ssa Giada Marinaro
              </div>
              <div style={{
                fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem'
              }}>
                Biologa Nutrizionista · Dimagrimento & Peso
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Percorsi nutrizionali personalizzati per dimagrimento, ricomposizione corporea e aumento peso a Milano e Carugate.
              </p>
            </div>

            {/* Menu */}
            <div>
              <h4 style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.25rem'
              }}>Menu</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {[
                  ['/','Home'],
                  ['/#chi-sono','Chi Sono'],
                  ['/#metodo','Il Mio Metodo'],
                  ['/dimagrimento-ricomposizione','Dimagrimento & Peso ✨'],
                  ['/nutrizione-clinica','Nutrizione Clinica 🩺'],
                  ['/nutrizione-sportiva','Nutrizione Sportiva ⚡'],
                  ['/disturbi-alimentari-dna','Nutrizione per i DNA 💜'],
                  ['/#tariffe','Tariffe'],
                  ['/#contatti','Contatti']
                ].map(([href, label]) => (
                  <Link key={href} href={href} style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'color 200ms ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#B8965A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <h4 style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.25rem'
              }}>Seguimi</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.instagram.com/giadamarinaro_nutrizionista"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Segui su Instagram" className="social-icon">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://tiktok.com/@giadamarinaro_nutrizionista"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Segui su TikTok" className="social-icon">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Sedi */}
            <div>
              <h4 style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                marginBottom: '1.25rem'
              }}>Dove Ricevo</h4>
              <ul className="text-gold space-y-2 text-xs">
                <li>
                  <strong className="text-white">Studio di psicologia Michele Facci</strong><br />
                  <span className="text-gray-400">Piazza Emilia 5, Milano 20129</span>
                </li>
                <li className="pt-1">
                  <strong className="text-white">Osteopatia Brambilla</strong><br />
                  <span className="text-gray-400">Via Garibaldi 23, Carugate 20061</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            justifyContent: 'space-between', alignItems: 'center',
            fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)'
          }}>
            <p>© 2025 Dott.ssa Giada Marinaro. P.IVA 12345678901</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/cookies" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Cookie Policy</Link>
              <button onClick={() => setShowCookieManager(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem'
              }}>
                Gestisci Cookie
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner 
        onAcceptAll={() => {}}
        onRejectAll={() => {}}
        onCustomize={() => setShowCookieManager(true)}
      />

      {/* Cookie Manager */}
      <CookieManager 
        isOpen={showCookieManager}
        onClose={() => setShowCookieManager(false)}
      />
    </div>
  )
}
