'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'

export default function NutrizioneSportivaPage() {
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
      
      {/* Header - Unified Site Styling */}
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
              Biologa Nutrizionista · Nutrizione Sportiva
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
                  Nutrizione Sportiva & Performance
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[var(--charcoal)]"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  Alimenta la tua passione. <br />
                  <span className="text-gradient">Massimizza le tue prestazioni.</span>
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl font-normal">
                  <p>
                    Che tu sia un atleta agonista, un amante del fitness o semplicemente qualcuno che ha scoperto la passione per il movimento, il cibo che scegli ogni giorno è uno degli alleati più potenti che hai per raggiungere i tuoi obiettivi. La nutrizione sportiva non è fatta di regole rigide o diete standardizzate: è un percorso su misura, costruito attorno al tuo sport, ai tuoi ritmi di allenamento, al tuo corpo e alla tua vita quotidiana.
                  </p>
                  <p>
                    Insieme lavoreremo per capire come alimentarti in modo da sostenere davvero le tue prestazioni, migliorare il recupero muscolare, prevenire infortuni e affaticamento, e arrivare agli allenamenti e alle gare con l'energia giusta. Non si tratta solo di numeri e macronutrienti, ma di costruire un rapporto sereno e consapevole con l'alimentazione, che ti accompagni prima, durante e dopo lo sforzo fisico, aiutandoti a dare il meglio di te senza sacrifici inutili o approcci punitivi verso il cibo.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <Link 
                    href="/#prenota" 
                    className="btn-primary"
                  >
                    <span>Prenota la tua visita in studio</span>
                    <span className="arrow-nudge">→</span>
                  </Link>

                  <a 
                    href="#percorsi" 
                    className="btn-ghost"
                  >
                    Scopri i 4 percorsi ↓
                  </a>
                </div>
              </div>

              {/* Image Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img 
                    src="/immagini/image1.png" 
                    alt="Nutrizione Sportiva e Performance - Dott.ssa Giada Marinaro" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center font-bold text-base shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--charcoal)]">Project Invictus Certified</div>
                        <div className="text-xs text-[var(--muted)]">Specialista in Nutrizione Sportiva e Ricomposizione Corporea</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* THE 4 SPECIALIZED PATHWAYS SECTION */}
        <section id="percorsi" className="py-20 bg-white relative">
          <div className="container mx-auto px-6">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 reveal">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>
                I Percorsi Dedicati
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--charcoal)] mb-4"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                Trova il percorso studiato per le tue esigenze
              </h2>
              <p className="text-[var(--muted)] text-base leading-relaxed">
                Ogni atleta e ogni sportivo ha un obiettivo differente. Ecco i percorsi nutrizionali specifici pensati per accompagnarti verso la massima performance e la migliore forma fisica.
              </p>
            </div>

            {/* Grid 4 Pathways */}
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              
              {/* 1. PERCORSO CUT */}
              <div className="reveal p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] hover:border-[var(--plum)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="eyebrow">
                      Definizione & Massa Magra
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--charcoal)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Percorso Cut
                  </h3>

                  <div className="text-sm text-[var(--muted)] leading-relaxed space-y-3 font-normal">
                    <p>
                      Quando l'obiettivo è ridurre la massa grassa preservando il più possibile quella muscolare, il momento del cut richiede un equilibrio delicato: un deficit calorico che sia sufficiente per farti vedere risultati concreti, ma mai così aggressivo da farti perdere forza, energia negli allenamenti o, peggio ancora, massa magra faticosamente costruita. So quanto questa fase possa essere frustrante e a tratti scoraggiante, soprattutto quando ci si sente stanchi o si fatica a percepire i progressi giorno per giorno.
                    </p>
                    <p>
                      Costruiremo insieme un piano che tenga conto del tuo dispendio energetico reale, del tuo tipo di allenamento, dei tuoi tempi di recupero e delle tue preferenze alimentari, per rendere questo percorso sostenibile nel tempo, senza rinunce estreme o rigidità inutili. L'obiettivo non è solo la definizione muscolare, ma arrivarci mantenendo lucidità mentale, energia e un buon rapporto con il cibo.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)]">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--plum)] hover:text-[var(--plum-mid)] transition-colors"
                  >
                    <span>Prenota la visita per il Percorso Cut</span>
                    <span className="arrow-nudge">→</span>
                  </Link>
                </div>
              </div>

              {/* 2. PERCORSO BULK */}
              <div className="reveal p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] hover:border-[var(--plum)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="eyebrow">
                      Ipertrofia & Forza
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--charcoal)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Percorso Bulk
                  </h3>

                  <div className="text-sm text-[var(--muted)] leading-relaxed space-y-3 font-normal">
                    <p>
                      Costruire massa muscolare in modo efficace richiede molto più che "mangiare di più": significa gestire con criterio un surplus calorico che favorisca la crescita muscolare, minimizzando allo stesso tempo l'accumulo di massa grassa in eccesso. Che tu stia iniziando un percorso di bulk per la prima volta o che tu voglia ottimizzare una fase già in corso, ti aiuterò a capire quanto e cosa mangiare, in che modo distribuire i pasti attorno agli allenamenti e come sostenere davvero la crescita muscolare con le giuste quantità di proteine, carboidrati e grassi.
                    </p>
                    <p>
                      Anche qui, l'obiettivo è trovare il tuo equilibrio: un surplus che ti permetta di costruire muscolo in modo efficiente, senza però trasformarsi in un aumento di peso incontrollato o in una fase che poi richiede sacrifici eccessivi per essere "corretta".
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)]">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--plum)] hover:text-[var(--plum-mid)] transition-colors"
                  >
                    <span>Prenota la visita per il Percorso Bulk</span>
                    <span className="arrow-nudge">→</span>
                  </Link>
                </div>
              </div>

              {/* 3. PERCORSO ENDURANCE */}
              <div className="reveal p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] hover:border-[var(--plum)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="eyebrow">
                      Resistenza & Corsa / Ciclismo
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--charcoal)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Percorso Endurance
                  </h3>

                  <div className="text-sm text-[var(--muted)] leading-relaxed space-y-3 font-normal">
                    <p>
                      Se il tuo mondo è fatto di lunghe distanze, resistenza e gestione dell'energia nel tempo, corsa, ciclismo, triathlon, nuoto o qualsiasi disciplina di endurance, sai bene quanto l'alimentazione possa influenzare non solo la prestazione, ma anche la tua capacità di allenarti con costanza senza incorrere in cali di energia, infortuni da sovraccarico o problemi gastrointestinali durante lo sforzo.
                    </p>
                    <p>
                      Lavoreremo su strategie nutrizionali specifiche per prima, durante e dopo l'attività: dalla gestione dei carboidrati per garantirti scorte energetiche adeguate, alla strategia di idratazione, fino al corretto reintegro post-allenamento per favorire un recupero rapido ed efficace. Che tu stia preparando la tua prima mezza maratona o punti a migliorare i tempi in una gara di livello agonistico, costruiremo un piano alimentare che sostenga davvero la tua resistenza, senza lasciarti mai a corto di energie nei momenti che contano di più.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)]">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--plum)] hover:text-[var(--plum-mid)] transition-colors"
                  >
                    <span>Prenota la visita per Endurance</span>
                    <span className="arrow-nudge">→</span>
                  </Link>
                </div>
              </div>

              {/* 4. RICOMPOSIZIONE CORPOREA */}
              <div className="reveal p-8 rounded-3xl bg-[var(--ivory)] border border-[var(--border)] hover:border-[var(--plum)] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="eyebrow">
                      Grasso/Muscolo Simultaneo
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--charcoal)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    Ricomposizione Corporea
                  </h3>

                  <div className="text-sm text-[var(--muted)] leading-relaxed space-y-3 font-normal">
                    <p>
                      Non sempre l'obiettivo è "solo" perdere grasso o "solo" costruire muscolo: spesso quello che si desidera davvero è cambiare la composizione del proprio corpo, riducendo la massa grassa mentre si mantiene o si aumenta quella muscolare, contemporaneamente. È un percorso più complesso rispetto a un semplice cut o bulk, perché richiede una gestione ancora più fine e personalizzata di calorie, macronutrienti e timing nutrizionale in relazione al tuo allenamento.
                    </p>
                    <p>
                      La ricomposizione corporea non è una gara contro il tempo né una rincorsa a risultati immediati: è un processo che rispetta la fisiologia del tuo corpo e che, per essere davvero efficace e duraturo, deve essere costruito con pazienza e intelligenza. Partiremo da una valutazione approfondita della tua composizione corporea attuale, delle tue abitudini, del tuo stile di vita e dei tuoi obiettivi reali, per definire insieme un piano alimentare che supporti al meglio il tuo percorso di allenamento, qualunque esso sia.
                    </p>
                    <p className="font-semibold text-[var(--charcoal)]">
                      Non troverai qui diete drastiche o promesse di trasformazioni impossibili in poche settimane: il mio approccio punta a risultati concreti, misurabili e soprattutto mantenibili nel tempo, perché il corpo che desideri deve essere anche un corpo che riesci a vivere bene, ogni giorno.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)]">
                  <Link 
                    href="/#prenota" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--plum)] hover:text-[var(--plum-mid)] transition-colors"
                  >
                    <span>Prenota la visita per Ricomposizione Corporea</span>
                    <span className="arrow-nudge">→</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* SPECIALIST APPROACH & DUAL PHOTO SHOWCASE WITH IMAGE5 & IMAGE2 */}
        <section className="py-24 bg-gradient-to-b from-white via-[var(--cream)] to-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 space-y-24">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto reveal">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>
                Metodologia & Strumentazione
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--charcoal)] mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                Un approccio scientifico e strumentale alla tua prestazione
              </h2>
              <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed">
                Ogni percorso di nutrizione sportiva parte da una solida valutazione iniziale della composizione corporea e dall'analisi del tuo dispendio energetico reale.
              </p>
            </div>

            {/* FEATURE 1: IMAGE5.JPEG - Valutazione Corporea & Plicometria */}
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal">
              {/* Photo Container Left */}
              <div className="lg:col-span-5 relative order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image5.jpeg" 
                    alt="Dott.ssa Giada Marinaro Plicometria e Valutazione Corporea" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        BIA
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--charcoal)]">Plicometria & BIA Clinica</div>
                        <div className="text-xs text-[var(--muted)]">Analisi strumentale ad alta precisione</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                <span className="eyebrow">
                  Valutazione Iniziale
                </span>

                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--charcoal)] font-display" style={{ fontFamily: 'var(--font-display)' }}>
                  Plicometria e Bioimpedenziometria (BIA)
                </h3>

                <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                  Per costruire un piano alimentare realmente efficace, il primo passo è conoscere la tua struttura corporea in modo oggettivo e scientifico. Non ci affidiamo al semplice peso della bilancia, che non distingue tra muscolo, grasso e acqua.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-[var(--border)] shadow-sm space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Stima delle Pliche Corporee
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Misurazione diretta del tessuto adiposo sottocutaneo nei punti repere specifici per valutare con esattezza la distribuzione della massa grassa.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[var(--border)] shadow-sm space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Idratazione & Massa Magra
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Monitoraggio dello stato di idratazione (ICW/ECW) e della massa muscolare attiva per prevenire il catabolismo durante le fasi di deficit.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* FEATURE 2: IMAGE2.PNG - Nutrient Timing & Performance Peri-Workout */}
            <div className="grid lg:grid-cols-12 gap-12 items-center reveal pt-8">
              {/* Content Left */}
              <div className="lg:col-span-7 space-y-6">
                <span className="eyebrow">
                  Strategia in Allenamento
                </span>

                <h3 className="text-3xl sm:text-4xl font-bold text-[var(--charcoal)] font-display" style={{ fontFamily: 'var(--font-display)' }}>
                  Nutrient Timing & Supporto Peri-Workout
                </h3>

                <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
                  Cosa mangi prima, durante e dopo l'attività fisica determina direttamente la qualità dei tuoi allenamenti, i tempi di recupero e l'adattamento muscolare. La nutrizione sportiva ottimizza la finestra temporale per massimizzare la resa energetica.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-white border border-[var(--border)] shadow-sm space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Scorte di Glicogeno
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Pianificazione dei carboidrati pre-workout per arrivare alla sessione con le riserve saturate e mantenere un'elevata intensità di sforzo.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[var(--border)] shadow-sm space-y-2">
                    <div className="font-bold text-[var(--plum)] text-sm flex items-center gap-2">
                      <span>✓</span> Sintesi Proteica & Recupero
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Strategia post-workout e integrazione evidence-based per ridurre la sensazione di affaticamento e stimolare la riparazione muscolare.
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Container Right */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img 
                    src="/immagini/image2.png" 
                    alt="Dott.ssa Giada Marinaro Nutrient Timing e Allenamento" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--border)] shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--plum)] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        PERI
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--charcoal)]">Nutrient Timing Peri-Workout</div>
                        <div className="text-xs text-[var(--muted)]">Energia, idratazione e recupero veloce</div>
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
          style={{ background: 'linear-gradient(135deg, var(--plum) 0%, var(--plum-mid) 100%)' }}>
          
          <div className="container mx-auto px-6 text-center text-white relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/30">
              Inizia il tuo percorso sportivo
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 font-display" style={{ fontFamily: 'var(--font-display)' }}>
              Pronto a portare le tue prestazioni al livello successivo?
            </h2>

            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Prenota una visita presso lo <strong>Studio di psicologia Michele Facci (Milano)</strong> o presso <strong>Osteopatia Brambilla (Carugate)</strong> per costruire il tuo piano alimentare su misura.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/#prenota" 
                className="px-8 py-4 rounded-xl font-bold bg-white text-[var(--plum)] shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03]"
              >
                Prenota la Visita Ora
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
                Biologa Nutrizionista · Nutrizione Sportiva
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Percorsi nutrizionali personalizzati e nutrizione sportiva a Milano e Carugate.
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
