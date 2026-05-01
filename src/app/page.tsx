'use client'

import { useState, useEffect, useRef } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'
import { CalendarSlot } from '@/lib/calendar'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [showCookieManager, setShowCookieManager] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  // Scroll to calendar when opened
  useEffect(() => {
    if (showCalendar && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showCalendar])

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


  // Validation functions
  const validateName = (name: string): boolean => {
    return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name) && name.trim().length >= 2
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio'
    } else if (!validateName(formData.nome)) {
      newErrors.nome = 'Il nome può contenere solo lettere, spazi, apostrofi e trattini'
    }

    if (!formData.cognome.trim()) {
      newErrors.cognome = 'Il cognome è obbligatorio'
    } else if (!validateName(formData.cognome)) {
      newErrors.cognome = 'Il cognome può contenere solo lettere, spazi, apostrofi e trattini'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Il messaggio deve essere di almeno 10 caratteri'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cognome: formData.cognome,
          email: formData.email,
          telefono: phoneNumber,
          messaggio: formData.message,
          selectedSlot: selectedSlot
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        // Reset form
        setFormData({ nome: '', cognome: '', email: '', message: '' })
        setPhoneNumber(undefined)
        setSelectedSlot(null)
        setShowCalendar(false)
      } else {
        setErrors({ submit: result.error || 'Errore nell\'invio del messaggio' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ submit: 'Errore di connessione. Riprova più tardi.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-sm transition-all duration-300"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#home" aria-label="Torna alla home page"
            style={{ textDecoration: 'none' }}>
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
              Biologa Nutrizionista
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center" style={{ gap: '2rem' }}>
            <a href="#chi-sono" className="nav-link">Chi Sono</a>
            <a href="#metodo" className="nav-link">Il Mio Metodo</a>
            <a href="#servizi" className="nav-link">Servizi</a>
            <a href="#contatti" className="btn-primary">Prenota una Visita</a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-plum"
              aria-label="Apri menu di navigazione"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--plum)' }}>
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
              {['#chi-sono', '#metodo', '#servizi'].map((href, i) => (
                <a key={i} href={href} className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: '1rem' }}>
                  {['Chi Sono', 'Il Mio Metodo', 'Servizi'][i]}
                </a>
              ))}
              <a href="#contatti" className="btn-primary"
                style={{ marginTop: '0.5rem', textAlign: 'center' }}
                onClick={() => setIsMenuOpen(false)}>
                Prenota una Visita
              </a>
            </nav>
          </div>
        )}
      </header>


      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center grain-overlay"
          style={{ backgroundColor: 'var(--charcoal)' }}>

          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/immagini/hero-bg.jpg')" }}
            role="img" aria-label="Studio professionale della Dott.ssa Giada Marinaro" />
          
          {/* Gradient overlay — richer than flat black */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(105deg, rgba(20,30,24,0.72) 0%, rgba(30,44,30,0.50) 55%, rgba(184,150,90,0.15) 100%)'
          }} />

          {/* Decorative blob shapes */}
          <div className="blob-animate absolute" style={{
            width: '480px', height: '480px', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
            background: 'radial-gradient(ellipse, rgba(74,46,90,0.35) 0%, transparent 70%)',
            top: '10%', right: '8%', pointerEvents: 'none', zIndex: 1
          }} />
          <div className="blob-animate-delayed absolute" style={{
            width: '320px', height: '320px', borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
            background: 'radial-gradient(ellipse, rgba(184,150,90,0.20) 0%, transparent 70%)',
            bottom: '15%', right: '20%', pointerEvents: 'none', zIndex: 1
          }} />

          {/* Content */}
          <div className="container mx-auto px-6 relative text-white text-center md:text-left"
            style={{ zIndex: 2 }}>


            {/* Eyebrow */}
            <div className="hero-title" style={{ marginBottom: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem'
              }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--gold-light)' }} />
                Biologa Nutrizionista · Milano
              </span>
            </div>

            <h1 className="hero-title" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#fff',
              maxWidth: '14ch',
              marginBottom: '1.5rem'
            }}>
              Ritrova il tuo benessere,{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
                un pasto alla volta
              </em>
            </h1>

            <p className="hero-sub" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: '50ch',
              marginBottom: '2.5rem'
            }}>
              Piani alimentari personalizzati per raggiungere i tuoi obiettivi di salute,
              senza stress e senza rinunce.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#contatti" className="btn-secondary">Inizia il tuo percorso</a>
              <a href="#chi-sono" className="btn-ghost" style={{
                color: '#fff', borderColor: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(8px)'
              }}>
                Scopri chi sono
              </a>
            </div>
          </div>

          {/* Bottom fade to ivory */}
          <div className="absolute bottom-0 left-0 right-0" style={{
            height: '120px',
            background: 'linear-gradient(to top, var(--ivory) 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none'
          }} />
        </section>


        {/* Chi Sono Section */}
        <section id="chi-sono" className="section-padding" style={{ background: 'var(--ivory)' }}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Photo */}
              <div className="reveal relative">
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  background: 'var(--cream-dark)',
                  backgroundImage: "url('/immagini/giada-marinaro.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: 'var(--shadow-xl)'
                }} role="img" aria-label="Dott.ssa Giada Marinaro" />
                {/* Gold accent border */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(184,150,90,0.25)',
                  pointerEvents: 'none'
                }} />
                {/* Floating credential badge */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', right: '-1rem',
                  background: 'var(--ivory)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.25rem',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex', alignItems: 'center', gap: '0.75rem'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--plum) 0%, var(--plum-light) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <svg width="20" height="20" fill="none" stroke="#fff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                      Biologa Nutrizionista
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Abilitata all'esercizio
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="reveal reveal-delay-1">
                <span className="eyebrow">Chi sono</span>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                  fontWeight: 600,
                  color: 'var(--charcoal)',
                  lineHeight: 1.2,
                  marginBottom: '1.5rem'
                }}>
                  Piacere, sono{' '}
                  <span className="text-gradient">Giada Marinaro</span>
                </h2>
                <p style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.75, fontSize: '1rem' }}>
                  La mia passione è aiutare le persone a riscoprire un rapporto sano e gioioso con il cibo.
                  Credo in un approccio empatico e scientifico, lontano da diete restrittive e privazioni.
                </p>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.75, fontSize: '1rem' }}>
                  Come Biologa Nutrizionista, il mio obiettivo è fornirti gli strumenti per fare scelte alimentari
                  consapevoli e sostenibili nel tempo, costruendo insieme un percorso che rispetti le tue esigenze,
                  i tuoi gusti e il tuo stile di vita.
                </p>
                <a href="#servizi" className="link-gold">
                  Scopri come posso aiutarti <span className="arrow-nudge">→</span>
                </a>
              </div>

            </div>
          </div>
        </section>


        {/* Il Mio Metodo Section */}
        <section id="metodo" className="section-padding" style={{ background: 'var(--cream)' }}>
          <div className="container mx-auto px-6">
            <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Come lavoro</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem'
              }}>
                Un percorso su misura per te
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '46ch', margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
                Ogni percorso è unico, come te. Ecco come lavoreremo insieme, passo dopo passo.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  n: '01', title: 'Primo Incontro', delay: '',
                  desc: 'Analizzeremo insieme le tue abitudini, obiettivi e storia. Una chiacchierata approfondita per conoscerci e porre le basi del percorso.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                },
                {
                  n: '02', title: 'Piano Personalizzato', delay: 'reveal-delay-1',
                  desc: 'Elaborerò un piano alimentare flessibile e sostenibile. Non una dieta, ma una guida concreta per il tuo benessere quotidiano.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                },
                {
                  n: '03', title: 'Supporto Continuo', delay: 'reveal-delay-2',
                  desc: 'Ci incontreremo periodicamente per monitorare i progressi e adattare il percorso. Sarò al tuo fianco per sostenerti sempre.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                },
              ].map(step => (
                <div key={step.n} className={`method-card reveal ${step.delay}`}>
                  <span className="method-step-number">{step.n}</span>
                  <div className="method-icon-wrap">
                    <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {step.icon}
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.15rem', color: 'var(--charcoal)', marginBottom: '0.6rem'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Servizi Section */}
        <section id="servizi" className="section-padding" style={{ background: 'var(--ivory)' }}>
          <div className="container mx-auto px-6">

            <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Cosa offro</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem'
              }}>
                Come posso aiutarti
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '46ch', margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
                Percorsi nutrizionali per diverse esigenze, sempre con un approccio personalizzato.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Dimagrimento e Ricomposizione',
                  desc: 'Percorsi mirati per perdere peso in modo sano e sostenibile, migliorando la composizione corporea e il benessere generale.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
                  delay: ''
                },
                {
                  title: 'Nutrizione Clinica',
                  desc: 'Piani alimentari specifici per la gestione di condizioni patologiche accertate: diabete, ipertensione, disturbi gastrointestinali e altro.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                  delay: 'reveal-delay-1'
                },
                {
                  title: 'Nutrizione Sportiva',
                  desc: 'Strategie alimentari per ottimizzare la performance sportiva, migliorare il recupero e raggiungere i tuoi obiettivi agonistici.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  delay: 'reveal-delay-2'
                },
              ].map(service => (
                <div key={service.title} className={`service-card reveal ${service.delay}`}>
                  <div className="service-card-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.15rem', color: 'var(--charcoal)', marginBottom: '0.75rem'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: 1.7, flex: 1, marginBottom: '1.5rem' }}>
                    {service.desc}
                  </p>
                  <a href="#contatti" className="link-gold">
                    Richiedi una consulenza <span className="arrow-nudge">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Prenotazione Online Section */}
        <section id="prenota" className="section-padding" style={{ background: 'var(--cream)' }}>
          <div className="container mx-auto px-6">
            <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Prenotazione</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Prenota la tua visita online
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '55ch', margin: '0 auto', fontSize: '1rem' }}>
                Visualizza le disponibilità in tempo reale e prenota il tuo appuntamento in pochi secondi. 
                Scegli il giorno e l'orario più comodo per te.
              </p>
            </div>

            <div className="max-w-4xl mx-auto text-center mb-10 reveal">
              <button 
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="btn-primary px-10 py-4 text-lg shadow-lg"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                {showCalendar ? 'Chiudi Calendario' : 'Mostra Disponibilità e Prenota'}
              </button>
            </div>
            
            {showCalendar && (
              <div ref={calendarRef} className="reveal-delay-1 max-w-4xl mx-auto scroll-mt-24">
                <div style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: 'clamp(1.5rem, 4vw, 3rem)',
                  border: '1px solid var(--border)'
                }}>
                  <AvailabilityCalendar 
                    onSlotSelect={setSelectedSlot}
                    selectedSlot={selectedSlot}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contatti Section (Form) */}
        <section id="contatti" className="section-padding" style={{ background: 'var(--ivory)' }}>
          <div className="container mx-auto px-6">
            <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Contatti</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Iniziamo il tuo percorso insieme
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '46ch', margin: '0 auto', fontSize: '1rem' }}>
                Hai domande o preferisci scrivermi un messaggio? Compila il modulo qui sotto e ti risponderò al più presto.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-start">
              {/* Info Column */}
              <div className="md:col-span-2 space-y-8 reveal">
                <div className="card-glass p-8" style={{ background: '#fff' }}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 font-display">Recapiti</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-plum/5 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="text-plum h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Studio Professionale</p>
                        <p className="text-gray-600">Via del Benessere 123, Milano</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-plum/5 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="text-plum h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Email</p>
                        <a href="mailto:info@giadamarinaro.com" className="text-gray-600 hover:text-plum transition-colors">info@giadamarinaro.com</a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-plum/5 flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="text-plum h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Telefono</p>
                        <a href="tel:+393331234567" className="text-gray-600 hover:text-plum transition-colors">+39 333 123 4567</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-l-4 border-gold bg-gold/5 rounded-r-lg">
                  <p className="text-sm italic text-gray-700 leading-relaxed">
                    "La nutrizione non è solo ciò che mangi, ma come nutri la tua vita e il tuo benessere ogni giorno."
                  </p>
                </div>
              </div>

              {/* Form Column */}
              <div className="md:col-span-3 reveal">
                <div style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                  padding: 'clamp(1.5rem, 4vw, 3rem)',
                  border: '1px solid var(--border)'
                }}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 font-display">Invia un messaggio</h3>
                  
                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <div className="text-plum mr-3">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">Richiesta inviata con successo!</p>
                          <p className="text-sm text-green-600">Ti risponderemo al più presto. Controlla la tua email per la conferma.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <div className="text-red-600 mr-3">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <p className="text-red-800">{errors.submit}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nome" className="field-label font-semibold">Nome <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="nome" 
                          value={formData.nome}
                          onChange={(e) => handleInputChange('nome', e.target.value)}
                          className={`field-input ${errors.nome ? 'error' : ''}`}
                          placeholder="Il tuo nome" 
                          maxLength={30}
                          required
                        />
                        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                      </div>
                      <div>
                        <label htmlFor="cognome" className="field-label font-semibold">Cognome <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          id="cognome" 
                          value={formData.cognome}
                          onChange={(e) => handleInputChange('cognome', e.target.value)}
                          className={`field-input ${errors.cognome ? 'error' : ''}`}
                          placeholder="Il tuo cognome" 
                          maxLength={30}
                          required
                        />
                        {errors.cognome && <p className="text-red-500 text-sm mt-1">{errors.cognome}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="field-label font-semibold">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`field-input ${errors.email ? 'error' : ''}`}
                        placeholder="nome.cognome@email.com" 
                        maxLength={254}
                        required
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="field-label font-semibold">Telefono <span className="text-gray-400 text-sm font-normal">(opzionale)</span></label>
                      <div className={`field-input focus-within:ring-2 focus-within:ring-plum/20 focus-within:border-plum transition-colors ${
                        errors.phone ? 'error' : ''
                      }`}>
                        <PhoneInput
                          id="phone"
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          placeholder="Inserisci il tuo numero di telefono"
                          defaultCountry="IT"
                          className="w-full"
                          countrySelectProps={{
                            className: 'text-sm'
                          }}
                          inputComponent={({ className, ...props }) => (
                            <input 
                              className={`${className} ml-2`}
                              {...props}
                            />
                          )}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="message" className="field-label font-semibold">Messaggio <span className="text-red-500">*</span></label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`field-input resize-vertical ${errors.message ? 'error' : ''}`}
                        placeholder="Descrivi il tuo obiettivo o le tue esigenze nutrizionali..." 
                        maxLength={1000}
                        required
                      />
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-gray-400 text-xs">{formData.message.length}/1000 caratteri</div>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 pt-2">
                      <input type="checkbox" id="privacy-policy" required className="mt-1 h-4 w-4 text-plum border-gray-300 rounded focus:ring-plum focus:ring-2" />
                      <label htmlFor="privacy-policy" className="text-sm text-gray-800 leading-relaxed">
                        <span className="text-red-500">*</span>Accetto la <a href="/privacy" className="text-plum hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e il trattamento dei miei dati personali per la gestione della richiesta di contatto.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-4 shadow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      style={{ borderRadius: 'var(--radius-lg)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Invio in corso...
                        </>
                      ) : (
                        'Invia il messaggio'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sta Schiscia Section */}
        <section style={{ background: 'var(--ivory)', padding: '6rem 0' }}>
          <div className="container mx-auto px-6">
            <div className="reveal" style={{
              background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--plum) 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}>
              {/* Decorative element */}
              <div style={{
                position: 'absolute', top: '-80px', right: '-80px',
                width: '300px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(184,150,90,0.25) 0%, transparent 70%)',
                borderRadius: '50%', pointerEvents: 'none'
              }} />

              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', fontSize: '2rem'
              }}>🍱</div>

              <span style={{
                fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--gold-light)',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'
              }}>
                <span style={{ width: '20px', height: '1px', background: 'var(--gold-light)' }} />
                Il mio format social
                <span style={{ width: '20px', height: '1px', background: 'var(--gold-light)' }} />
              </span>

              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                color: '#fff', marginBottom: '1rem'
              }}>
                "Sta Schiscia"
              </h2>

              <p style={{
                color: 'rgba(255,255,255,0.72)', fontSize: '1rem',
                lineHeight: 1.75, maxWidth: '56ch', marginBottom: '2rem',
                position: 'relative', zIndex: 1
              }}>
                Il mio format nasce dall'idea di rendere la sana alimentazione pratica e accessibile.
                Su Instagram e TikTok ti mostro come preparare pasti equilibrati, nutrienti e gustosi.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="https://www.instagram.com/giadamarinaro_nutrizionista"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" style={{ fontSize: '0.9rem', padding: '0.7rem 1.5rem' }}>
                  Instagram
                </a>
                <a href="https://tiktok.com/@giadamarinaro_nutrizionista"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost" style={{
                    color: '#fff', borderColor: 'rgba(255,255,255,0.3)',
                    fontSize: '0.9rem', padding: '0.7rem 1.5rem'
                  }}>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>


      {/* Footer */}
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
                Biologa Nutrizionista
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                Percorsi nutrizionali personalizzati a Milano.
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
                  ['#home','Home'],
                  ['#chi-sono','Chi Sono'],
                  ['#metodo','Il Mio Metodo'],
                  ['#servizi','Servizi'],
                  ['#contatti','Contatti']
                ].map(([href, label]) => (
                  <a key={href} href={href} style={{
                    color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'color 200ms ease'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage-light)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                    {label}
                  </a>
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
              {[
                ['Privacy Policy','/privacy'],
                ['Cookie Policy','/cookies']
              ].map(([label, href]) => (
                <a key={href} href={href} style={{
                  color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                  transition: 'color 200ms ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage-light)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                  {label}
                </a>
              ))}
              <button onClick={() => setShowCookieManager(true)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem',
                transition: 'color 200ms ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                Gestisci Cookie
              </button>
            </div>
          </div>
        </div>
      </footer>


      {/* Cookie Banner */}
      <CookieBanner 
        onAcceptAll={() => {
          console.log('All cookies accepted')
          // Here you would enable all cookies
        }}
        onRejectAll={() => {
          console.log('Non-necessary cookies rejected')
          // Here you would disable non-necessary cookies
        }}
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