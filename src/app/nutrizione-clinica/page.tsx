'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'

export default function NutrizioneClinicaPage() {
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
        style={{ borderBottom: '1px solid rgba(28, 107, 77, 0.15)' }}>
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
              color: '#1C6B4D',
              marginTop: '-2px'
            }}>
              Biologa Nutrizionista · Nutrizione Clinica
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: '1.25rem' }}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/#chi-sono" className="nav-link">Chi Sono</Link>
            <Link href="/#servizi" className="nav-link">Servizi</Link>
            <Link 
              href="/nutrizione-clinica" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#1C6B4D] hover:bg-[#15533B] transition-all shadow-xs"
            >
              Nutrizione Clinica 🩺
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
            <Link href="/#tariffe" className="nav-link">Tariffe</Link>
            <Link 
              href="/#prenota" 
              className="btn-primary"
            >
              Prenota una Visita
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-[#1C6B4D]"
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
            background: '#F2F8F5',
            borderTop: '1px solid rgba(28, 107, 77, 0.15)',
            padding: '1.5rem 1.5rem 2rem'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/#chi-sono" className="nav-link" onClick={() => setIsMenuOpen(false)}>Chi Sono</Link>
              <Link 
                href="/nutrizione-clinica" 
                className="font-semibold text-white bg-[#1C6B4D] p-2.5 rounded-xl flex items-center justify-between shadow-xs"
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
        {/* HERO SECTION - CLINICAL & REASSURING */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #EAF4F0 0%, #FFFFFF 100%)' }}>
          
          {/* Subtle Sage Green Glow */}
          <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #1C6B4D 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ background: 'radial-gradient(circle, #B8965A 0%, transparent 70%)' }} />

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 border border-[#1C6B4D]/20">
                  <span>🩺</span>
                  <span>Alimentazione Terapeutica e Supporto Clinico</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  Nutrizione Clinica.<br />
                  <span className="text-[#1C6B4D]">Il cibo come strumento di cura.</span>
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
                  <p>
                    Quando la salute richiede attenzione, anche l'alimentazione diventa uno strumento terapeutico fondamentale. Che tu stia affrontando una patologia metabolica, cardiovascolare, gastrointestinale o qualsiasi altra condizione clinica, il cibo può davvero fare la differenza nel percorso di cura e nella qualità della tua vita quotidiana.
                  </p>
                  <p>
                    Il mio lavoro in ambito clinico nasce sempre da un'analisi approfondita della tua condizione di salute, in dialogo costante con il tuo medico curante o specialista di riferimento, per costruire un piano alimentare che sia non solo efficace dal punto di vista scientifico, ma anche realmente sostenibile nella tua vita di tutti i giorni. So che ricevere una diagnosi può essere un momento delicato e a tratti spaventoso, e il cibo rischia spesso di trasformarsi in un ulteriore elemento di stress, invece che in una risorsa. Il mio obiettivo è proprio questo: restituirti serenità, aiutandoti a capire cosa puoi mangiare e perché, senza inutili rinunce o terrorismo alimentare, ma con indicazioni chiare, aggiornate e basate sulle più recenti evidenze scientifiche.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/#prenota" 
                    className="px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #1C6B4D 0%, #124D36 100%)' }}
                  >
                    <span>Prenota la tua visita in studio</span>
                    <span>→</span>
                  </Link>

                  <a 
                    href="#patologie" 
                    className="px-6 py-3.5 rounded-xl font-semibold text-[#1C6B4D] bg-[#1C6B4D]/10 hover:bg-[#1C6B4D]/15 transition-all duration-200 border border-[#1C6B4D]/20"
                  >
                    Scopri le condizioni cliniche trattate ↓
                  </a>
                </div>
              </div>

              {/* Image Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img 
                    src="/immagini/image3.jpeg" 
                    alt="Nutrizione Clinica - Dott.ssa Giada Marinaro" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1C6B4D]/20 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1C6B4D] text-white flex items-center justify-center font-bold text-lg shrink-0">
                        📋
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Approccio Evidence-Based</div>
                        <div className="text-xs text-gray-600">Collaborazione con medici curanti e specialisti</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* THE 4 MAIN CLINICAL AREAS SECTION */}
        <section id="patologie" className="py-20 bg-white relative">
          <div className="container mx-auto px-6">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 reveal">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3.5 py-1.5 rounded-full mb-3 border border-[#1C6B4D]/20">
                Aree di Intervento Clinico
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 font-display" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                Piani nutrizionali personalizzati per la tua condizione
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Ogni patologia richiede protocolli specifici. Lavoriamo insieme per migliorare i parametri ematochimici e la qualità della vita.
              </p>
            </div>

            {/* Grid 4 Clinical Areas */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* 1. DIABETE */}
              <div className="reveal p-8 rounded-3xl bg-[#F4F9F6] border-2 border-[#1C6B4D]/20 hover:border-[#1C6B4D] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C6B4D] text-white flex items-center justify-center text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                      🩸
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3 py-1 rounded-full border border-[#1C6B4D]/20">
                      Glicemia & Controllo Metabolico
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display" style={{ fontFamily: 'var(--font-display)' }}>
                    Diabete e Prediabete
                  </h3>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-3 font-normal">
                    <p>
                      Che si tratti di diabete di tipo 1, di tipo 2 o di una condizione di prediabete appena diagnosticata, l'alimentazione è uno dei pilastri fondamentali per la gestione della glicemia e per la prevenzione delle complicanze a lungo termine. Non si tratta di eliminare drasticamente i carboidrati o di seguire schemi rigidi e demoralizzanti, ma di imparare a conoscere come i diversi alimenti influenzano la tua glicemia, per costruire pasti equilibrati che ti permettano di mantenere un buon controllo metabolico senza vivere il momento del pasto come una fonte di ansia costante.
                    </p>
                    <p>
                      Lavoreremo insieme sulla distribuzione dei carboidrati nell'arco della giornata, sulla scelta della qualità degli alimenti, sulla gestione dell'indice e del carico glicemico, e sull'integrazione dell'alimentazione con la tua terapia farmacologica o insulinica, sempre in accordo con il tuo diabetologo. L'obiettivo è aiutarti a vivere con serenità la convivenza con il diabete, senza che questo diventi un limite alla qualità della tua vita quotidiana e sociale.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C6B4D]/10">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C6B4D] hover:text-[#124D36] transition-colors"
                  >
                    <span>Prenota la visita per Diabete e Prediabete</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 2. DISLIPIDEMIA */}
              <div className="reveal p-8 rounded-3xl bg-[#F4F9F6] border-2 border-[#1C6B4D]/20 hover:border-[#1C6B4D] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C6B4D] text-white flex items-center justify-center text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                      ❤️
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3 py-1 rounded-full border border-[#1C6B4D]/20">
                      Colesterolo & Trigliceridi
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display" style={{ fontFamily: 'var(--font-display)' }}>
                    Dislipidemia
                  </h3>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-3 font-normal">
                    <p>
                      Quando i valori di colesterolo o trigliceridi risultano alterati, l'alimentazione rappresenta spesso il primo e più importante strumento di intervento, prima ancora — o insieme — a un'eventuale terapia farmacologica. Non tutti i grassi sono uguali, e non basta "mangiare meno grassi": capire quali fonti privilegiare e quali invece limitare fa davvero la differenza sui tuoi valori nel sangue.
                    </p>
                    <p>
                      Costruiremo insieme un piano alimentare che favorisca il riequilibrio del profilo lipidico, lavorando sulla qualità dei grassi, sull'apporto di fibre, sulla scelta di alimenti con proprietà ipocolesterolemizzanti riconosciute dalla letteratura scientifica, e su uno stile alimentare generale che sostenga la salute cardiovascolare nel tempo. Anche qui, l'approccio resta sempre concreto e sostenibile: piccoli cambiamenti mantenuti nel tempo hanno un impatto molto più significativo di regimi drastici e difficili da seguire.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C6B4D]/10">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C6B4D] hover:text-[#124D36] transition-colors"
                  >
                    <span>Prenota la visita per Dislipidemia</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 3. SINDROME METABOLICA */}
              <div className="reveal p-8 rounded-3xl bg-[#F4F9F6] border-2 border-[#1C6B4D]/20 hover:border-[#1C6B4D] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C6B4D] text-white flex items-center justify-center text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                      ⚖️
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3 py-1 rounded-full border border-[#1C6B4D]/20">
                      Rischio Cardiovascolare Globale
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display" style={{ fontFamily: 'var(--font-display)' }}>
                    Sindrome Metabolica
                  </h3>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-3 font-normal">
                    <p>
                      La sindrome metabolica, quella condizione in cui si combinano fattori come glicemia alterata, pressione arteriosa elevata, dislipidemia e accumulo di grasso addominale, richiede un approccio nutrizionale che tenga conto di tutti questi elementi insieme, e non isolatamente. È una condizione che, se non affrontata, aumenta in modo significativo il rischio cardiovascolare, ma che risponde molto bene a un cambiamento alimentare e dello stile di vita costruito con costanza.
                    </p>
                    <p>
                      Il percorso che costruiremo insieme punterà a migliorare contemporaneamente tutti i parametri coinvolti: la gestione del peso corporeo, il controllo glicemico, il profilo lipidico e la pressione arteriosa, attraverso un'alimentazione equilibrata, la giusta distribuzione dei macronutrienti e, dove utile, l'integrazione con un'attività fisica adeguata alle tue possibilità. Non è un percorso che richiede perfezione, ma costanza: ogni piccolo miglioramento nei tuoi valori si traduce in un beneficio concreto per la tua salute futura.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C6B4D]/10">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C6B4D] hover:text-[#124D36] transition-colors"
                  >
                    <span>Prenota la visita per Sindrome Metabolica</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* 4. DISTURBI INTESTINALI */}
              <div className="reveal p-8 rounded-3xl bg-[#F4F9F6] border-2 border-[#1C6B4D]/20 hover:border-[#1C6B4D] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1C6B4D] text-white flex items-center justify-center text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                      🌿
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3 py-1 rounded-full border border-[#1C6B4D]/20">
                      IBS, FODMAP & Microbiota
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display" style={{ fontFamily: 'var(--font-display)' }}>
                    Disturbi Intestinali & Gastrointestinali
                  </h3>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-3 font-normal">
                    <p>
                      Gonfiore, dolore addominale, alterazioni dell'alvo, sindrome dell'intestino irritabile (IBS), malattie infiammatorie croniche intestinali o altre problematiche gastrointestinali possono influenzare pesantemente la qualità della vita quotidiana, e l'alimentazione gioca un ruolo centrale sia nella gestione dei sintomi che nel benessere generale dell'intestino.
                    </p>
                    <p>
                      Il mio approccio parte sempre dall'individuazione degli alimenti e delle abitudini che possono scatenare o peggiorare i tuoi sintomi, per poi costruire un piano alimentare personalizzato che, a seconda della tua condizione specifica, può prevedere protocolli come la dieta a basso contenuto di FODMAP, strategie di reintroduzione graduale degli alimenti, o percorsi mirati al riequilibrio del microbiota intestinale. Il lavoro viene sempre svolto in coordinamento con il tuo gastroenterologo, per garantire un approccio integrato e sicuro.
                    </p>
                    <p className="font-semibold text-gray-900">
                      So quanto i disturbi intestinali possano condizionare non solo la vita fisica, ma anche quella sociale ed emotiva: l'obiettivo del percorso è proprio restituirti maggiore libertà e serenità, aiutandoti a individuare cosa il tuo intestino tollera bene, senza restrizioni superflue o eliminazioni non necessarie.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C6B4D]/10">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C6B4D] hover:text-[#124D36] transition-colors"
                  >
                    <span>Prenota la visita per Disturbi Intestinali</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* METHODOLOGY & MEDICAL COLLABORATION */}
        <section className="py-24 bg-gradient-to-b from-white via-[#F2F8F5] to-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 space-y-16">
            
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal">
              
              {/* Photo Left */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image6.jpeg" 
                    alt="Dott.ssa Giada Marinaro consulenza clinica" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1C6B4D]/20 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1C6B4D] text-white flex items-center justify-center font-bold text-lg shrink-0">
                        🩺
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">Analisi Clinica Approfondita</div>
                        <div className="text-xs text-gray-600">Referti ematochimici e dialogo medico</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Right */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#1C6B4D] bg-[#1C6B4D]/10 px-3.5 py-1.5 rounded-full border border-[#1C6B4D]/20">
                  Dialogo & Sostenibilità
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                  Un metodo fondato sull'ascolto e la collaborazione medica
                </h2>

                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Ricevere una diagnosi non deve significare stravolgere la propria vita in modo punitivo. Nel mio studio a Milano o Carugate, analizziamo i tuoi esami ematochimici e la tua storia clinica per ritagliare una terapia nutrizionale su misura.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#1C6B4D]/15 shadow-sm space-y-2">
                    <div className="font-bold text-[#1C6B4D] text-base flex items-center gap-2">
                      <span>✓</span> Dialogo con il Curante
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Lavoro in costante raccordo con il tuo medico di medicina generale, diabetologo, cardiologo o gastroenterologo.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#1C6B4D]/15 shadow-sm space-y-2">
                    <div className="font-bold text-[#1C6B4D] text-base flex items-center gap-2">
                      <span>✓</span> Zero Terrorismo Alimentare
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Indicazioni pratiche e sostenibili per capire cosa puoi mangiare senza inutili rinunce o paura a tavola.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* CALL TO ACTION BANNER */}
        <section className="py-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #124D36 0%, #1C6B4D 50%, #0B3324 100%)' }}>
          
          <div className="container mx-auto px-6 text-center text-white relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/30">
              Inizia il tuo percorso clinico
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Pronto a prenderti cura della tua salute a tavola?
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Prenota una visita presso lo <strong>Studio di psicologia Michele Facci (Milano)</strong> o presso <strong>Osteopatia Brambilla (Carugate)</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/#prenota" 
                className="px-8 py-4 rounded-xl font-bold bg-white text-[#1C6B4D] shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Prenota la Visita Clinica
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
                textTransform: 'uppercase', color: '#1C6B4D', marginBottom: '0.75rem'
              }}>
                Biologa Nutrizionista · Nutrizione Clinica
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Percorsi nutrizionali personalizzati, nutrizione clinica e sportiva a Milano e Carugate.
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
                  onMouseEnter={e => (e.currentTarget.style.color = '#1C6B4D')}
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
              <ul className="text-[#1C6B4D] space-y-2 text-xs">
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
