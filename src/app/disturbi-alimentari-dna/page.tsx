'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'

export default function DisturbiAlimentariDnaPage() {
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
    <div className="bg-[#FAF8F5] min-h-screen text-[var(--ink)]">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-300"
        style={{ borderBottom: '1px solid var(--border)' }}>
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
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: '-2px'
            }}>
              Biologa Nutrizionista · Nutrizione per i DNA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/#chi-sono" className="nav-link">Chi Sono</Link>
            <Link href="/#metodo" className="nav-link">Il Mio Metodo</Link>
            <Link href="/#servizi" className="nav-link">Servizi</Link>
            <Link href="/#tariffe" className="nav-link">Tariffe</Link>
            <Link href="/#recensioni" className="nav-link">Recensioni</Link>
            <Link href="/#prenota" className="btn-primary">Prenota una Visita</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-plum"
              aria-label="Apri menu di navigazione"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--plum)' }}
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
            borderTop: '1px solid var(--border)',
            padding: '1.5rem 1.5rem 2rem'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/#chi-sono" className="nav-link" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
              <Link href="/#metodo" className="nav-link" onClick={() => setIsMenuOpen(false)}>Il Mio Metodo</Link>
              <Link href="/#servizi" className="nav-link" onClick={() => setIsMenuOpen(false)}>Servizi</Link>
              <Link href="/#tariffe" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tariffe</Link>
              <Link href="/#recensioni" className="nav-link" onClick={() => setIsMenuOpen(false)}>Recensioni</Link>
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
          style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--ivory) 100%)' }}>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <span className="eyebrow">
                  Disturbi della Nutrizione e dell'Alimentazione
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[var(--charcoal)]"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  Nutrizione per i DNA.<br />
                  <span className="text-gradient">Un percorso accogliente, mai da soli.</span>
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-normal">
                  <p>
                    Affrontare un percorso legato ai DNA — i Disturbi della Nutrizione e dell'Alimentazione — richiede coraggio, ed è un passo che merita di essere accolto con la massima delicatezza, rispetto e professionalità.
                  </p>
                  <p>
                    So quanto possa essere complesso il rapporto con il cibo quando questo diventa fonte di ansia, controllo o sofferenza, e voglio che tu sappia che qui troverai un ambiente sicuro, privo di giudizio, in cui poter ricostruire piano piano un legame più sereno con l'alimentazione.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/#prenota" 
                    className="btn-primary"
                  >
                    <span>Prenota un primo colloquio</span>
                    <span className="arrow-nudge">→</span>
                  </Link>

                  <a 
                    href="#multidisciplinare" 
                    className="btn-ghost"
                  >
                    Scopri l'approccio multidisciplinare ↓
                  </a>
                </div>
              </div>

              {/* Image Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img 
                    src="/immagini/image4.jpeg" 
                    alt="Dott.ssa Giada Marinaro - Nutrizione per i DNA" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        DCA
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--charcoal)]">Formazione San Raffaele</div>
                        <div className="text-xs text-[var(--muted)]">Specializzazione DCA & Équipe Multidisciplinare</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION 2: MULTIDISCIPLINARY APPROACH */}
        <section id="multidisciplinare" className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            
            <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--ivory)] border border-[var(--border)] p-8 sm:p-12 shadow-xl reveal">
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                <div className="w-16 h-16 rounded-2xl bg-[var(--plum)] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>

                <div className="space-y-4 text-left">
                  <span className="eyebrow">
                    Lavoro in Équipe
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--charcoal)] font-display" style={{ fontFamily: 'var(--font-display)' }}>
                    Un percorso mai da soli
                  </h2>

                  <p className="text-[var(--muted)] text-base leading-relaxed">
                    Il mio approccio si inserisce sempre all'interno di un lavoro multidisciplinare, in stretta collaborazione con <strong>psicologi, psichiatri, medici e altri professionisti della salute</strong>, perché so bene che la componente nutrizionale, da sola, non può bastare di fronte ai DNA.
                  </p>

                  <p className="text-[var(--muted)] text-base leading-relaxed">
                    Questi disturbi nascono e si mantengono attraverso meccanismi complessi, che intrecciano corpo, mente ed emozioni, e per questo il mio lavoro si integra sempre con quello dell'équipe che ti accompagna, senza mai sostituirsi al percorso psicologico o medico necessario.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* SECTION 3: MY ROLE & CONDITIONS TREATED */}
        <section className="py-24 bg-gradient-to-b from-white via-[var(--cream)] to-white relative">
          <div className="container mx-auto px-6">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal">
              
              {/* Photo Left */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image3.jpeg" 
                    alt="Dott.ssa Giada Marinaro consulenza DNA" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        INFO
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--charcoal)]">Rispetto dei tuoi tempi</div>
                        <div className="text-xs text-[var(--muted)]">Nessuna forzatura o numero imposto dall'alto</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Right */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <span className="eyebrow">
                  Il mio ruolo nel tuo percorso
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--charcoal)] font-display" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                  Ricostruire insieme la fiducia con il cibo e il tuo corpo
                </h2>

                <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                  Il mio compito è accompagnarti nella riscoperta di un'alimentazione equilibrata, aiutandoti passo dopo passo a normalizzare i pasti, a ridurre le rigidità e i meccanismi di controllo, restrizione o compenso, e a ritrovare fiducia nel tuo corpo e nei suoi segnali di fame e sazietà.
                </p>

                <div className="p-6 rounded-2xl bg-white border border-[var(--border)] shadow-sm space-y-4">
                  <h3 className="font-bold text-[var(--charcoal)] text-lg flex items-center gap-2">
                    <span className="text-[var(--plum)]">✓</span> Le forme di DNA che trattiamo insieme:
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-[var(--ink)]">
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--border)] font-medium">
                      <span className="text-[var(--plum)] font-bold">•</span> Anoressia Nervosa
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--border)] font-medium">
                      <span className="text-[var(--plum)] font-bold">•</span> Bulimia Nervosa
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--border)] font-medium">
                      <span className="text-[var(--plum)] font-bold">•</span> Binge Eating (DCA Incontrollato)
                    </div>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--border)] font-medium">
                      <span className="text-[var(--plum)] font-bold">•</span> ARFID (Disturbo Evitante-Restrittivo)
                    </div>
                  </div>

                  <p className="text-xs text-[var(--muted)] pt-2 leading-relaxed">
                    Che tu stia affrontando una di queste condizioni o altre forme di DNA, il lavoro che facciamo insieme parte sempre da dove ti trovi tu in questo momento, senza forzature.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[var(--ivory)] border-l-4 border-[var(--plum)] text-sm text-[var(--ink)] leading-relaxed">
                  <strong>Nessun giudizio, zero numeri freddi:</strong> Non lavoro con numeri imposti dall'alto o obiettivi di peso calati con freddezza: il percorso viene costruito gradualmente, rispettando i tuoi tempi, le tue paure e le tue resistenze, che sono parte naturale di questo cammino e non un ostacolo da giudicare.
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION 4: SAFE ENVIRONMENT */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-6 max-w-4xl text-center reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Un ambiente accogliente
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--charcoal)] mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Senza giudizio, senza fretta, senza pressioni
            </h2>
            <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Capisco che parlare di queste difficoltà, a volte anche solo prenotare un primo appuntamento, possa sembrare un passo enorme. Per questo il primo incontro è pensato per ascoltarti, capire la tua storia e le tue difficoltà specifiche, senza fretta e senza pressioni. Non troverai mai atteggiamenti giudicanti riguardo al cibo, al corpo o alle abitudini alimentari: solo attenzione, competenza e la volontà sincera di aiutarti a stare meglio.
            </p>
          </div>
        </section>


        {/* SECTION 5: FOR FAMILY & LOVED ONES */}
        <section className="py-20 bg-[var(--cream)] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[var(--border)] reveal">
              <div className="mb-6">
                <span className="eyebrow">Supporto ai familiari</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--charcoal)] font-display mt-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Per i familiari e le persone vicine
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal">
                <p>
                  Se sei un genitore, un partner, un figlio o un amico di qualcuno che sta attraversando un DNA, so che anche tu stai vivendo un momento difficile. Vedere una persona che ami soffrire nel rapporto con il cibo genera spesso un senso di impotenza, preoccupazione costante e, a volte, la sensazione di non sapere mai cosa dire o cosa fare, per paura di peggiorare le cose.
                </p>

                <p>
                  Voglio dirti che i tuoi dubbi sono legittimi, e che anche il tuo ruolo in questo percorso è importante. Non è compito tuo diagnosticare, controllare quello che mangia chi ami o "correggere" i suoi comportamenti: questo può, comprensibilmente, generare tensioni e non è ciò che serve davvero.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="p-5 rounded-2xl bg-[var(--ivory)] border border-[var(--border)] space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Presenza Stabile & Ascolto
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Evita di trasformarti in un controllore dei pasti o del peso, perché rischia di alimentare ulteriormente vergogna e chiusura. Cerca piuttosto di essere una presenza stabile, disponibile ad ascoltare senza giudicare, capace di validare le emozioni difficili.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--ivory)] border border-[var(--border)] space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Informarsi da Fonti Affidabili
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Un primo passo utile è informarti per riconoscere che non si tratta di una scelta o di un capriccio, ma di una sofferenza reale. Incoraggiare con delicatezza la persona a chiedere supporto specialistico è uno dei gesti più preziosi.
                    </p>
                  </div>
                </div>

                <p className="p-5 rounded-2xl bg-[var(--ivory)] border border-[var(--border)] font-medium text-[var(--charcoal)] text-sm">
                  <strong>Posso essere un punto di riferimento anche per te:</strong> per aiutarti a capire come muoverti, cosa evitare nella gestione quotidiana dei pasti in famiglia, e come sostenere il percorso di cura senza sentirti costantemente sopraffatto da un peso che non è solo tuo da portare.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* SECTION 6: EMERGENCY / HELPLINES */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-6 max-w-4xl relative z-10 reveal">
            
            <div className="text-center mb-10">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>
                Supporto & Ascolto Nazionale
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--charcoal)] font-display" style={{ fontFamily: 'var(--font-display)' }}>
                Un punto di riferimento, sempre disponibile
              </h2>
              <p className="text-[var(--muted)] text-sm sm:text-base mt-2">
                Se stai leggendo questa pagina in un momento di difficoltà, per te o per una persona che ami, ricorda che non sei solo/a.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              {/* SOS Disturbi Alimentari */}
              <div className="p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--plum)] mb-1">Servizio Nazionale Gratuito</div>
                  <h3 className="text-xl font-bold text-[var(--charcoal)] mb-3">SOS Disturbi Alimentari</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Servizio di ascolto, informazione e orientamento anonimo e gratuito, promosso dalla Presidenza del Consiglio dei Ministri e dall'Istituto Superiore di Sanità.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[var(--border)] text-center">
                  <a href="tel:800180969" className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--plum)] hover:scale-105 transition-transform">
                    <span>800 18 09 69</span>
                  </a>
                  <div className="text-[11px] text-[var(--muted)] mt-1">Chiamata gratuita e anonima</div>
                </div>
              </div>

              {/* Telefono Amico Italia */}
              <div className="p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--plum)] mb-1">Ascolto Emotivo Tutti i Giorni</div>
                  <h3 className="text-xl font-bold text-[var(--charcoal)] mb-3">Telefono Amico Italia</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Per chi cerca semplicemente un ascolto in un momento di difficoltà emotiva, anche non legata strettamente ai DNA.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[var(--border)] text-center">
                  <a href="tel:0223272327" className="inline-flex items-center gap-2 text-2xl font-bold text-[var(--plum)] hover:scale-105 transition-transform">
                    <span>02 2327 2327</span>
                  </a>
                  <div className="text-[11px] text-[var(--muted)] mt-1">Tutti i giorni dalle 10:00 alle 24:00 (365 giorni/anno)</div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* CALL TO ACTION BANNER */}
        <section className="py-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--plum) 0%, var(--plum-mid) 100%)' }}>
          
          <div className="container mx-auto px-6 text-center text-white relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/30">
              Inizia con serenità
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Fai il primo passo verso un legame più sereno con l'alimentazione
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Ricevo in studio a <strong>Milano (Studio di psicologia Michele Facci)</strong> e a <strong>Carugate (Osteopatia Brambilla)</strong> per costruire un percorso su misura per te.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/#prenota" 
                className="px-8 py-4 rounded-xl font-bold bg-white text-[var(--plum)] shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Prenota un primo colloquio
              </Link>
              
              <Link 
                href="/#contatti" 
                className="px-8 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all duration-300"
              >
                Contattami per Informazioni
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
                Biologa Nutrizionista · Nutrizione per i DNA
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Percorsi nutrizionali per i disturbi dell'alimentazione, nutrizione clinica e sportiva a Milano e Carugate.
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
                  ['/#servizi','Servizi'],
                  ['/#tariffe','Tariffe'],
                  ['/#contatti','Contatti']
                ].map(([href, label]) => (
                  <Link key={href} href={href} style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'color 200ms ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
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
