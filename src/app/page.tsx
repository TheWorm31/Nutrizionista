'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import CookieBanner from '@/components/CookieBanner'
import CookieManager from '@/components/CookieManager'
import PricingSection from '@/components/PricingSection'
import { PRICING_SERVICES } from '@/config/pricing'
import { CalendarSlot } from '@/lib/calendar'

// Custom phone input component to prevent focus loss on typing
const CustomPhoneInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} className={`${props.className || ''} ml-2 outline-none bg-transparent w-full`} />
))
CustomPhoneInput.displayName = 'CustomPhoneInput'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Booking Flow States
  const [bookingStep, setBookingStep] = useState<number>(1)
  const [bookingServiceId, setBookingServiceId] = useState<string>('prima-visita')
  const [bookingVisitType, setBookingVisitType] = useState<string>('presenza')
  const [bookingStudio, setBookingStudio] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<CalendarSlot | null>(null)
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{
    nome: string
    cognome: string
    email: string
    serviceName: string
    servicePrice: string
    visitType: string
    studio?: string
    slotStart: Date | string
  } | null>(null)

  const [bookingFormData, setBookingFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    message: ''
  })
  const [bookingPhoneNumber, setBookingPhoneNumber] = useState<string | undefined>(undefined)
  const [bookingErrors, setBookingErrors] = useState<{[key: string]: string}>({})
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  // Contact Flow States (pure message)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    message: ''
  })
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [showCookieManager, setShowCookieManager] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const selectedServiceObj = PRICING_SERVICES.find(s => s.id === bookingServiceId) || PRICING_SERVICES[0]

  const handleSelectServiceFromList = (serviceId: string) => {
    setBookingSuccess(false)
    setConfirmedBookingDetails(null)
    setSelectedSlot(null)
    if (serviceId === 'prima-visita' || serviceId === 'visita-controllo') {
      setBookingServiceId(serviceId)
      setBookingStudio('carugate')
    } else {
      setBookingServiceId('prima-visita')
      setBookingStudio('milano')
      window.open('https://prenota.studiopsicologiafacci.it/?utm_source=nutrizionista-a-milano.it', '_blank')
    }
    setBookingStep(1)
    const el = document.getElementById('prenota')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const resetBookingFlow = () => {
    setBookingSuccess(false)
    setConfirmedBookingDetails(null)
    setBookingFormData({ nome: '', cognome: '', email: '', message: '' })
    setBookingPhoneNumber(undefined)
    setSelectedSlot(null)
    setBookingVisitType('presenza')
    setBookingStudio('')
    setBookingServiceId('prima-visita')
    setBookingStep(1)
  }

  const isBookingTypeSelected = bookingStudio === 'carugate' && (bookingServiceId === 'prima-visita' || bookingServiceId === 'visita-controllo')

  // Scroll to calendar when opened
  useEffect(() => {
    if (isBookingTypeSelected && calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isBookingTypeSelected])

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
  }, [bookingVisitType, bookingStudio, selectedSlot])


  // Validation functions
  const validateName = (name: string): boolean => {
    return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name) && name.trim().length >= 2
  }

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleBookingInputChange = (field: string, value: string) => {
    setBookingFormData(prev => ({ ...prev, [field]: value }))
    if (bookingErrors[field]) {
      setBookingErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateBookingForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    if (!bookingFormData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio'
    } else if (!validateName(bookingFormData.nome)) {
      newErrors.nome = 'Il nome può contenere solo lettere, spazi, apostrofi e trattini'
    }

    if (!bookingFormData.cognome.trim()) {
      newErrors.cognome = 'Il cognome è obbligatorio'
    } else if (!validateName(bookingFormData.cognome)) {
      newErrors.cognome = 'Il cognome può contenere solo lettere, spazi, apostrofi e trattini'
    }

    if (!bookingFormData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria'
    } else if (!validateEmail(bookingFormData.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido'
    }

    setBookingErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateContactForm = (): boolean => {
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateBookingForm()) {
      return
    }

    setIsBookingSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: bookingFormData.nome,
          cognome: bookingFormData.cognome,
          email: bookingFormData.email,
          telefono: bookingPhoneNumber,
          messaggio: bookingFormData.message,
          selectedSlot: selectedSlot,
          visitType: bookingVisitType,
          studio: bookingVisitType === 'presenza' ? bookingStudio : undefined,
          serviceName: selectedServiceObj.title,
          servicePrice: selectedServiceObj.price
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setConfirmedBookingDetails({
          nome: bookingFormData.nome,
          cognome: bookingFormData.cognome,
          email: bookingFormData.email,
          serviceName: selectedServiceObj.title,
          servicePrice: selectedServiceObj.price,
          visitType: bookingVisitType,
          studio: bookingStudio,
          slotStart: selectedSlot?.start || new Date()
        })
        setBookingSuccess(true)
      } else {
        setBookingErrors({ submit: result.error || 'Errore nella prenotazione' })
      }
    } catch (error) {
      console.error('Error booking visit:', error)
      setBookingErrors({ submit: 'Errore di connessione. Riprova più tardi.' })
    } finally {
      setIsBookingSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateContactForm()) {
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
          messaggio: formData.message
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ nome: '', cognome: '', email: '', message: '' })
        setPhoneNumber(undefined)
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
          <nav className="hidden md:flex items-center" style={{ gap: '1.5rem' }}>
            <a href="#chi-sono" className="nav-link">Chi Sono</a>
            <a href="#metodo" className="nav-link">Il Mio Metodo</a>
            <a href="#servizi" className="nav-link">Servizi</a>
            <Link 
              href="/nutrizione-sportiva" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#0052FF] bg-[#0052FF]/10 hover:bg-[#0052FF]/20 transition-all border border-[#0052FF]/20 flex items-center gap-1"
            >
              <span>Sportiva</span>
              <span>⚡</span>
            </Link>
            <Link 
              href="/disturbi-alimentari-dna" 
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-plum bg-plum/10 hover:bg-plum/20 transition-all border border-plum/20 flex items-center gap-1"
            >
              <span>Percorso DNA</span>
              <span>💜</span>
            </Link>
            <a href="#tariffe" className="nav-link">Tariffe</a>
            <a href="#recensioni" className="nav-link">Recensioni</a>
            <a href="#prenota" className="btn-primary">Prenota una Visita</a>
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
              <a href="#chi-sono" className="nav-link" onClick={() => setIsMenuOpen(false)}>Chi Sono</a>
              <a href="#metodo" className="nav-link" onClick={() => setIsMenuOpen(false)}>Il Mio Metodo</a>
              <a href="#servizi" className="nav-link" onClick={() => setIsMenuOpen(false)}>Servizi</a>
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
              <a href="#tariffe" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tariffe</a>
              <a href="#recensioni" className="nav-link" onClick={() => setIsMenuOpen(false)}>Recensioni</a>
              <a href="#prenota" className="btn-primary"
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
        <section id="home" className="relative flex items-center grain-overlay hero-responsive"
          style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>

          {/* Background image — visible only on desktop */}
          <div className="absolute inset-0 bg-cover bg-top hidden md:block"
            style={{ backgroundImage: "url('/immagini/hero-bg.jpg')", opacity: 0.75 }}
            role="img" aria-label="Studio professionale della Dott.ssa Giada Marinaro" />
          
          {/* Gradient overlay — visible only on desktop */}
          <div className="absolute inset-0 hidden md:block" style={{
            background: 'linear-gradient(90deg, rgba(38,28,24,0.25) 0%, rgba(38,28,24,0.05) 45%, transparent 75%)'
          }} />

          {/* Decorative blob shapes */}
          <div className="blob-animate absolute" style={{
            width: '480px', height: '480px', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
            background: 'radial-gradient(ellipse, rgba(156,74,47,0.15) 0%, transparent 70%)',
            top: '10%', right: '8%', pointerEvents: 'none', zIndex: 1
          }} />
          <div className="blob-animate-delayed absolute" style={{
            width: '320px', height: '320px', borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
            background: 'radial-gradient(ellipse, rgba(184,150,90,0.15) 0%, transparent 70%)',
            bottom: '15%', right: '20%', pointerEvents: 'none', zIndex: 1
          }} />

          {/* Content */}
          <div className="container mx-auto px-6 relative text-center md:text-left"
            style={{ zIndex: 2 }}>


            {/* Eyebrow */}
            <div className="hero-title" style={{ marginBottom: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--hero-eyebrow)',
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem'
              }}>
                <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'var(--hero-line)' }} />
                Biologa Nutrizionista · Milano, Carugate
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'var(--hero-text)',
              maxWidth: '24ch',
              marginBottom: '1.5rem'
            }}>
              <span className="hero-title-line hero-title-line-1">
                Nessuna dieta standard,
              </span>
              <span className="hero-title-line hero-title-line-2">
                nessun giudizio.
              </span>
              <span className="hero-title-line hero-title-line-3" style={{ color: 'var(--hero-em)' }}>
                Solo un percorso costruito intorno a te.
              </span>
            </h1>

            <p className="hero-sub" style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--hero-sub)',
              maxWidth: '50ch',
              marginBottom: '2.5rem'
            }}>
              Piani alimentari personalizzati per raggiungere i tuoi obiettivi di salute,
              senza stress e senza rinunce.
            </p>

            <div className="hero-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="#contatti" className="btn-primary md:hidden">Inizia il tuo percorso</a>
              <a href="#contatti" className="btn-secondary hidden md:inline-flex">Inizia il tuo percorso</a>
              <a href="#chi-sono" className="btn-ghost" style={{
                color: 'var(--hero-ghost-color)', borderColor: 'var(--hero-ghost-border)',
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
                  backgroundImage: "url('/immagini/image6.jpeg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
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
                  Prima di essere una <span className="text-gradient">professionista della nutrizione</span>, sono una persona che crede nell'importanza dell'<span className="text-gradient">equilibrio</span>.
                </h2>
                <p style={{ color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.75, fontSize: '1rem' }}>
                  Piacere, sono Giada Marinaro. Sono una nutrizionista laureata in Scienze della Nutrizione, con una formazione orientata sia alla nutrizione clinica sia alla nutrizione sportiva.
Nel mio percorso professionale ho scelto di approfondire il trattamento dei Disturbi del Comportamento Alimentare, specializzandomi presso il San Raffaele e collaborando all'interno di un'équipe multidisciplinare. Questa esperienza mi ha insegnato quanto sia importante considerare la persona nella sua complessità, andando oltre il semplice piano alimentare per costruire percorsi di cura basati sull'ascolto, sul rispetto e sulla collaborazione.
                </p>
                <p style={{ color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.75, fontSize: '1rem' }}>
                  Parallelamente, mi occupo di nutrizione sportiva, ambito nel quale ho conseguito la certificazione Project Invictus. Supporto atleti e persone attive che desiderano migliorare la propria performance, ottimizzare il recupero, modificare la composizione corporea o semplicemente imparare a nutrirsi in modo più consapevole in relazione ai propri obiettivi.
La mia passione per lo sport nasce anche dall'esperienza personale: mi alleno regolarmente in sala pesi e conosco da vicino l'importanza di un'alimentazione che sostenga il benessere, la salute e la prestazione fisica.
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
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Come lavoro</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem'
              }}>
                Prima della dieta, la persona
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: The Persona (Manifesto) */}
              <div className="lg:col-span-5 order-1 flex flex-col justify-center">
                <div className="relative card-glass text-center reveal flex flex-col justify-center items-center h-full" style={{
                  border: '1.5px solid var(--gold)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                  background: '#fff',
                  overflow: 'hidden',
                  padding: '3rem 2.5rem'
                }}>
                  {/* Concentric Circles for "La Persona al Centro" */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.08 }}>
                    <div style={{ width: '380px', height: '380px', borderRadius: '50%', border: '1px solid var(--plum)', position: 'absolute' }} />
                    <div style={{ width: '280px', height: '280px', borderRadius: '50%', border: '2px solid var(--gold)', position: 'absolute' }} />
                    <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '1px solid var(--plum)', position: 'absolute' }} />
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1px dashed var(--gold)', position: 'absolute' }} />
                  </div>

                  <span className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Il manifesto</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--plum)',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Tu al Centro
                  </h3>
                  <p style={{
                    color: 'var(--charcoal)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '38ch'
                  }}>
                    Credo in una nutrizione personalizzata, fondata sulle <b>evidenze scientifiche</b> ma adattata alla realtà e alle <b>esigenze</b> di ogni persona.<br />Il mio obiettivo è aiutarti a costruire abitudini sostenibili nel tempo, senza rigidità inutili, attraverso un percorso che metta <b>al centro te</b>, la tua storia e i tuoi obiettivi.
                  </p>
                </div>
              </div>

              {/* Right Column: Steps 1, 2 & 3 */}
              <div className="lg:col-span-7 order-2 flex flex-col gap-6 justify-between">
                {[
                  {
                    n: '01', title: 'Primo Incontro', delay: 'reveal-delay-1',
                    desc: 'Mi racconterai la tua storia. Analizzeremo insieme le tue abitudini, alimentari e non.',
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  },
                  {
                    n: '02', title: 'Piano Personalizzato', delay: 'reveal-delay-2',
                    desc: 'Piano alimentare flessibile e sostenibile, che tiene conto dei tuoi gusti e delle tuoi preferenze alimentari.',
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  },
                  {
                    n: '03', title: 'Supporto Continuo', delay: 'reveal-delay-3',
                    desc: 'Monitoraggio progressi e adattamento percorso, insieme.',
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  }
                ].map(step => (
                  <div key={step.n} className={`method-card reveal ${step.delay} flex-1 flex flex-col justify-center`}>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Dimagrimento e Ricomposizione',
                  desc: 'Perdita peso in modo sostenibile.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
                  delay: ''
                },
                {
                  title: 'Nutrizione Clinica',
                  desc: 'Supporto per patologie (diabete, ipertensione, ecc.)',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                  delay: 'reveal-delay-1'
                },
                {
                  title: 'Nutrizione Sportiva',
                  desc: 'Performance, ipertrofia (Bulk), definizione (Cut), endurance e ricomposizione corporea.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  delay: 'reveal-delay-2',
                  href: '/nutrizione-sportiva',
                  linkText: 'Scopri i 4 percorsi sportivi ⚡'
                },
                {
                  title: 'Nutrizione per i DNA (Disturbi Alimentari)',
                  desc: 'Ritrovare un equilibrio con l’alimentazione attraverso un approccio accogliente e multidisciplinare.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
                  delay: 'reveal-delay-3',
                  href: '/disturbi-alimentari-dna',
                  linkText: 'Scopri il percorso DNA 💜'
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
                  {service.href ? (
                    <Link href={service.href} className={`font-semibold text-xs py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all border shadow-xs ${
                      service.href === '/disturbi-alimentari-dna' 
                        ? 'text-plum bg-plum/10 hover:bg-plum/20 border-plum/20' 
                        : 'text-[#0052FF] bg-[#0052FF]/10 hover:bg-[#0052FF]/20 border-[#0052FF]/20'
                    }`}>
                      <span>{service.linkText}</span> <span className="arrow-nudge">→</span>
                    </Link>
                  ) : (
                    <a href="#contatti" className="link-gold">
                      Richiedi una consulenza <span className="arrow-nudge">→</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Recensioni Section */}
        <section id="recensioni" className="section-padding" style={{ background: 'var(--ivory)' }}>
          <div className="container mx-auto px-6">
            
            {/* Header */}
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Esperienze dei pazienti</span>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
                fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem'
              }}>
                Cosa dicono del mio percorso
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '52ch', margin: '0 auto', fontSize: '1rem', lineHeight: 1.75 }}>
                Le testimonianze reali delle persone che hanno ritrovato il loro equilibrio alimentare e raggiunto i propri obiettivi.
              </p>
            </div>

            {/* Summary Rating Cards / Badges */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 reveal">
              
              {/* MioDottore Badge */}
              <div className="card p-6 text-center flex flex-col items-center justify-center gap-2" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 font-display">
                  <span className="w-8 h-8 rounded-full bg-cyan-600/10 text-cyan-700 flex items-center justify-center font-semibold text-sm">MD</span>
                  <span>MioDottore</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-lg">
                  ★★★★★ <span className="text-sm font-semibold text-gray-700 ml-1">5.0 / 5.0</span>
                </div>
                <p className="text-xs text-gray-500">Recensioni verificate dai pazienti</p>
              </div>

              {/* Google Reviews Badge */}
              <div className="card p-6 text-center flex flex-col items-center justify-center gap-2" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800 font-display">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-lg">
                  ★★★★★ <span className="text-sm font-semibold text-gray-700 ml-1">5.0 / 5.0</span>
                </div>
                <p className="text-xs text-gray-500">Valutazione massima utenti Google</p>
              </div>

              {/* Satisfaction Pill */}
              <div className="card p-6 text-center flex flex-col items-center justify-center gap-2 sm:col-span-2 lg:col-span-1" style={{ background: 'var(--plum-pale)', border: '1px solid var(--border-plum)' }}>
                <div className="text-3xl font-bold text-plum font-display">100%</div>
                <div className="font-semibold text-charcoal text-sm">Pazienti Soddisfatti</div>
                <p className="text-xs text-muted">Percorsi basati sull'ascolto senza rigidità</p>
              </div>
            </div>

            {/* Review Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Paziente MioDottore',
                  source: 'MioDottore',
                  sourceBadge: 'MioDottore',
                  sourceColor: 'bg-cyan-600/10 text-cyan-800 border-cyan-200',
                  stars: 5,
                  date: 'Recensione verificata • MioDottore.it',
                  text: 'La dottoressa è stata estremamente attenta e gentile, comprensiva e ricettiva. Ho apprezzato molto il suo approccio, non vedo l\'ora della prossima visita!'
                },
                {
                  name: 'Utente Google',
                  source: 'Google',
                  sourceBadge: 'Google Recensioni',
                  sourceColor: 'bg-blue-600/10 text-blue-800 border-blue-200',
                  stars: 5,
                  date: 'Recensione verificata • Google Maps',
                  text: 'Grande capacità comunicativa e di ascolto. La Dott.ssa Marinaro è una professionista molto preparata, capace di fornire spiegazioni chiare ed esaustive durante tutta la visita.'
                },
                {
                  name: 'Paziente MioDottore',
                  source: 'MioDottore',
                  sourceBadge: 'MioDottore',
                  sourceColor: 'bg-cyan-600/10 text-cyan-800 border-cyan-200',
                  stars: 5,
                  date: 'Recensione verificata • MioDottore.it',
                  text: 'Professionista competente ed empatica. Ha saputo ascoltare le mie esigenze e costruire un percorso personalizzato senza mai giudicare. Una dottoressa che non si può che consigliare!'
                },
                {
                  name: 'Utente Google',
                  source: 'Google',
                  sourceBadge: 'Google Recensioni',
                  sourceColor: 'bg-blue-600/10 text-blue-800 border-blue-200',
                  stars: 5,
                  date: 'Recensione verificata • Google Maps',
                  text: 'Visita completa e accurata. Molto disponibile anche nel supporto tra un incontro e l\'altro per qualsiasi chiarimento sul piano alimentare. Esperienza davvero ottima.'
                }
              ].map((rev, idx) => (
                <div key={idx} className="card p-6 flex flex-col justify-between reveal transition-all duration-300 hover:shadow-xl" style={{ background: '#fff' }}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.stars }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${rev.sourceColor}`}>
                        {rev.sourceBadge}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{rev.name}</div>
                      <div className="text-xs text-gray-500">{rev.date}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-plum/10 text-plum font-bold flex items-center justify-center text-xs">
                      {rev.name.charAt(0)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* External Links Bar */}
            <div className="mt-12 text-center flex flex-wrap justify-center gap-4 reveal">
              <a 
                href="https://www.miodottore.it/giada-marinaro/nutrizionista/milano" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-ghost flex items-center gap-2"
              >
                <span>Vedi il profilo su MioDottore</span>
                <span className="arrow-nudge">↗</span>
              </a>
              <a 
                href="https://www.google.com/search?q=Dott.ssa+Giada+Marinaro+Biologa+Nutrizionista+Milano" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-ghost flex items-center gap-2"
              >
                <span>Vedi le recensioni su Google</span>
                <span className="arrow-nudge">↗</span>
              </a>
            </div>

          </div>
        </section>


        {/* Pricing Section */}
        <PricingSection onSelectService={handleSelectServiceFromList} />


        {/* Prenotazione Online Section */}
        <section id="prenota" className="section-padding" style={{ background: 'var(--cream)' }}>
          <div className="container mx-auto px-6">
            <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Prenotazione</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem' }}>
                Prenota la tua visita ora
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '55ch', margin: '0 auto', fontSize: '1rem' }}>
                Seleziona il servizio desiderato e lo studio di preferenza per sbloccare le date disponibili nel calendario.
              </p>
            </div>

            <div className="max-w-4xl mx-auto reveal">
              
              {/* Stepper Navigation Bar */}
              {!bookingSuccess && (
                <div className="flex items-center justify-center mb-8 gap-2 sm:gap-4 border-b border-gray-200 pb-6">
                  {/* Step 1 Pill */}
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      bookingStep === 1
                        ? 'bg-plum text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-plum/40'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      bookingStep === 1 ? 'bg-white text-plum' : 'bg-gray-100 text-gray-600'
                    }`}>1</span>
                    <span>1. Servizio & Studio</span>
                  </button>

                  <span className="text-gray-300 hidden sm:inline">→</span>

                  {/* Step 2 Pill */}
                  <button
                    type="button"
                    disabled={!isBookingTypeSelected}
                    onClick={() => isBookingTypeSelected && setBookingStep(2)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      bookingStep === 2
                        ? 'bg-plum text-white shadow-md'
                        : isBookingTypeSelected
                        ? 'bg-white text-gray-700 border border-gray-200 hover:border-plum/40'
                        : 'bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      bookingStep === 2 ? 'bg-white text-plum' : 'bg-gray-100 text-gray-600'
                    }`}>2</span>
                    <span>2. Data & Ora</span>
                  </button>

                  <span className="text-gray-300 hidden sm:inline">→</span>

                  {/* Step 3 Pill */}
                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={() => selectedSlot && setBookingStep(3)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      bookingStep === 3
                        ? 'bg-plum text-white shadow-md'
                        : selectedSlot
                        ? 'bg-white text-gray-700 border border-gray-200 hover:border-plum/40'
                        : 'bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      bookingStep === 3 ? 'bg-white text-plum' : 'bg-gray-100 text-gray-600'
                    }`}>3</span>
                    <span>3. Dati & Conferma</span>
                  </button>
                </div>
              )}

              {/* SUCCESS CONFIRMATION SCREEN */}
              {bookingSuccess && confirmedBookingDetails ? (
                <div className="card p-8 sm:p-10 animate-fadeIn text-center space-y-6" style={{ background: '#fff', border: '2px solid var(--plum)', borderRadius: 'var(--radius-xl)' }}>
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center text-4xl shadow-inner">
                    ✓
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-plum bg-plum/10 px-3 py-1 rounded-full">Richiesta Registrata</span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 font-display mt-3">Richiesta di Prenotazione Inviata!</h3>
                    <p className="text-gray-600 max-w-lg mx-auto text-sm mt-2 leading-relaxed">
                      Grazie <strong>{confirmedBookingDetails.nome}</strong>, la tua richiesta è stata presa in carico con successo. Ti risponderemo a breve all'indirizzo <strong>{confirmedBookingDetails.email}</strong>.
                    </p>
                  </div>

                  <div className="bg-ivory border border-gray-200 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Prestazione:</span>
                      <span className="font-bold text-gray-800">{confirmedBookingDetails.serviceName} ({confirmedBookingDetails.servicePrice})</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Sede Visita:</span>
                      <span className="font-semibold text-gray-800">
                        📍 {confirmedBookingDetails.studio === 'milano' ? 'Studio di psicologia Michele Facci (Milano)' : 'Osteopatia Brambilla (Carugate)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Data e Ora:</span>
                      <span className="font-semibold text-gray-800">
                        🗓 {new Date(confirmedBookingDetails.slotStart).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })} alle {new Date(confirmedBookingDetails.slotStart).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={resetBookingFlow}
                      className="btn-primary text-base px-8 py-3 shadow-gold"
                    >
                      Effettua un'altra prenotazione
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* STEP 1: STUDIO & SERVICE */}
                  {bookingStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* 1. Studio Selection FIRST */}
                      <div className="card p-6" style={{ background: '#fff' }}>
                        <label className="field-label font-semibold mb-3 text-center block text-base">
                          1. Seleziona lo studio di preferenza <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setBookingStudio('milano')
                              setSelectedSlot(null)
                              window.open('https://prenota.studiopsicologiafacci.it/?utm_source=nutrizionista-a-milano.it', '_blank')
                            }}
                            className={`p-5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                              bookingStudio === 'milano'
                                ? 'border-plum bg-plum/5 text-plum'
                                : 'border-gray-200 hover:border-plum/20 text-gray-700'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-base flex items-center gap-2">
                                Studio di psicologia Michele Facci
                                <span className="text-xs bg-plum/10 text-plum px-2 py-0.5 rounded-full font-normal">Sito Esterno ↗</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Piazza Emilia 5, Milano (20129)</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              bookingStudio === 'milano' ? 'border-plum bg-plum' : 'border-gray-300'
                            }`}>
                              {bookingStudio === 'milano' && <span className="block w-2.5 h-2.5 rounded-full bg-white"></span>}
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setBookingStudio('carugate')
                              setSelectedSlot(null)
                              if (bookingServiceId !== 'prima-visita' && bookingServiceId !== 'visita-controllo') {
                                setBookingServiceId('prima-visita')
                              }
                            }}
                            className={`p-5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                              bookingStudio === 'carugate'
                                ? 'border-plum bg-plum/5 text-plum'
                                : 'border-gray-200 hover:border-plum/20 text-gray-700'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-base">Osteopatia Brambilla</div>
                              <div className="text-xs text-gray-500 mt-1">Via Garibaldi 23, Carugate (20061)</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              bookingStudio === 'carugate' ? 'border-plum bg-plum' : 'border-gray-300'
                            }`}>
                              {bookingStudio === 'carugate' && <span className="block w-2.5 h-2.5 rounded-full bg-white"></span>}
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Milano redirect notice */}
                      {bookingStudio === 'milano' && (
                        <div className="card p-8 animate-fadeIn text-center space-y-4" style={{ background: '#fff', border: '1.5px solid var(--plum)' }}>
                          <div className="text-4xl">📍</div>
                          <h3 className="text-xl font-bold text-gray-800 font-display">Studio di psicologia Michele Facci</h3>
                          <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                            Le visite presso lo <strong>Studio di psicologia Michele Facci (Piazza Emilia 5, Milano)</strong> sono gestite direttamente tramite il portale esterno.
                          </p>
                          <a
                            href="https://prenota.studiopsicologiafacci.it/?utm_source=nutrizionista-a-milano.it"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3 shadow-md"
                          >
                            <span>Apri Portale Studio di psicologia Michele Facci ↗</span>
                          </a>
                        </div>
                      )}

                      {/* 2. Service Selection (Only for Carugate: Prima Visita & Visita di Controllo) */}
                      {bookingStudio === 'carugate' && (
                        <div className="card p-6 animate-fadeIn" style={{ background: '#fff' }}>
                          <label className="field-label font-semibold mb-3 text-center block text-base">
                            2. Seleziona la prestazione desiderata <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {PRICING_SERVICES
                              .filter(srv => srv.id === 'prima-visita' || srv.id === 'visita-controllo')
                              .map(srv => (
                                <button
                                  key={srv.id}
                                  type="button"
                                  onClick={() => {
                                    setBookingServiceId(srv.id)
                                    setSelectedSlot(null)
                                  }}
                                  className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                                    bookingServiceId === srv.id
                                      ? 'border-plum bg-plum/5 text-plum'
                                      : 'border-gray-200 hover:border-plum/20 text-gray-700'
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <div className="font-bold text-base">{srv.title}</div>
                                      <div className="text-xs text-gray-500 mt-0.5 font-normal">⏱ {srv.duration}</div>
                                    </div>
                                    <span className="font-bold text-lg font-display text-plum ml-2 whitespace-nowrap">{srv.price}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">{srv.description}</p>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Proceed to Step 2 Button */}
                      {isBookingTypeSelected && (
                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setBookingStep(2)
                              const el = document.getElementById('prenota')
                              if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="btn-primary text-base px-8 py-3.5 shadow-gold inline-flex items-center gap-2"
                          >
                            <span>Continua: Seleziona Data e Ora</span>
                            <span>→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2: CALENDAR AVAILABILITY */}
                  {bookingStep === 2 && isBookingTypeSelected && (
                    <div className="animate-fadeIn space-y-4">
                      {/* Summary pill + Edit button */}
                      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-semibold text-gray-800">{selectedServiceObj.title} ({selectedServiceObj.price})</span>
                          <span className="text-xs bg-plum/10 text-plum px-2.5 py-1 rounded-full font-medium">
                            📍 Sede: Osteopatia Brambilla (Carugate)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setBookingStep(1)}
                          className="text-xs font-semibold text-plum hover:underline"
                        >
                          ✏️ Modifica studio/servizio
                        </button>
                      </div>

                      <div ref={calendarRef} className="scroll-mt-24">
                        <div style={{
                          background: '#fff',
                          borderRadius: 'var(--radius-xl)',
                          boxShadow: 'var(--shadow-xl)',
                          padding: 'clamp(1.5rem, 4vw, 3rem)',
                          border: '1px solid var(--border)'
                        }}>
                          <AvailabilityCalendar 
                            onSlotSelect={(slot) => {
                              setSelectedSlot(slot)
                              setBookingStep(3)
                              const el = document.getElementById('prenota')
                              if (el) el.scrollIntoView({ behavior: 'smooth' })
                            }}
                            selectedSlot={selectedSlot}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: FORM & CONFIRMATION */}
                  {bookingStep === 3 && selectedSlot && (
                    <div className="card p-8 animate-fadeIn space-y-6" style={{
                      background: '#fff',
                      border: '1.5px solid var(--plum)',
                      boxShadow: 'var(--shadow-xl)',
                      borderRadius: 'var(--radius-xl)'
                    }}>
                      <div className="flex justify-between items-center border-b pb-4">
                        <h3 className="text-2xl font-bold text-gray-800 font-display">Completa la tua prenotazione</h3>
                        <button
                          type="button"
                          onClick={() => setBookingStep(2)}
                          className="text-xs font-semibold text-plum hover:underline"
                        >
                          ✏️ Modifica data/ora
                        </button>
                      </div>

                      {/* Order Summary Card */}
                      <div className="bg-gradient-to-r from-plum/5 to-amber-50 border border-plum/20 rounded-2xl p-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-plum mb-3">Riepilogo della tua Prenotazione</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 text-xs block">Prestazione selezionata:</span>
                            <span className="font-bold text-gray-800">{selectedServiceObj.title}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs block">Tariffa:</span>
                            <span className="font-bold text-plum font-display text-base">{selectedServiceObj.price}</span> <span className="text-xs text-gray-500">({selectedServiceObj.duration})</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs block">Studio / Sede:</span>
                            <span className="font-semibold text-gray-800">
                              📍 Osteopatia Brambilla (Carugate)
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs block">Data e Ora selezionata:</span>
                            <span className="font-semibold text-gray-800">
                              🗓 {new Date(selectedSlot.start).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })} alle {new Date(selectedSlot.start).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {bookingErrors.submit && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <div className="text-red-600 mr-3">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <p className="text-red-800">{bookingErrors.submit}</p>
                          </div>
                        </div>
                      )}

                      <form onSubmit={handleBookingSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="booking-nome" className="field-label font-semibold">Nome <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              id="booking-nome" 
                              value={bookingFormData.nome}
                              onChange={(e) => handleBookingInputChange('nome', e.target.value)}
                              className={`field-input ${bookingErrors.nome ? 'error' : ''}`}
                              placeholder="Il tuo nome" 
                              maxLength={30}
                              required
                            />
                            {bookingErrors.nome && <p className="text-red-500 text-sm mt-1">{bookingErrors.nome}</p>}
                          </div>
                          <div>
                            <label htmlFor="booking-cognome" className="field-label font-semibold">Cognome <span className="text-red-500">*</span></label>
                            <input 
                              type="text" 
                              id="booking-cognome" 
                              value={bookingFormData.cognome}
                              onChange={(e) => handleBookingInputChange('cognome', e.target.value)}
                              className={`field-input ${bookingErrors.cognome ? 'error' : ''}`}
                              placeholder="Il tuo cognome" 
                              maxLength={30}
                              required
                            />
                            {bookingErrors.cognome && <p className="text-red-500 text-sm mt-1">{bookingErrors.cognome}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="booking-email" className="field-label font-semibold">Email <span className="text-red-500">*</span></label>
                            <input 
                              type="email" 
                              id="booking-email" 
                              value={bookingFormData.email}
                              onChange={(e) => handleBookingInputChange('email', e.target.value)}
                              className={`field-input ${bookingErrors.email ? 'error' : ''}`}
                              placeholder="nome.cognome@email.com" 
                              maxLength={254}
                              required
                            />
                            {bookingErrors.email && <p className="text-red-500 text-sm mt-1">{bookingErrors.email}</p>}
                          </div>

                          <div>
                            <label htmlFor="booking-phone" className="field-label font-semibold">Telefono <span className="text-gray-400 text-sm font-normal">(opzionale)</span></label>
                            <div className={`field-input focus-within:ring-2 focus-within:ring-plum/20 focus-within:border-plum transition-colors ${
                              bookingErrors.phone ? 'error' : ''
                            }`}>
                              <PhoneInput
                                id="booking-phone"
                                value={bookingPhoneNumber}
                                onChange={setBookingPhoneNumber}
                                placeholder="Inserisci il tuo telefono"
                                defaultCountry="IT"
                                className="w-full"
                                inputComponent={CustomPhoneInput}
                              />
                            </div>
                            {bookingErrors.phone && <p className="text-red-500 text-sm mt-1">{bookingErrors.phone}</p>}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="booking-message" className="field-label font-semibold">Messaggio / Note per la visita <span className="text-gray-400 text-sm font-normal">(opzionale)</span></label>
                          <textarea 
                            id="booking-message" 
                            rows={3} 
                            value={bookingFormData.message}
                            onChange={(e) => handleBookingInputChange('message', e.target.value)}
                            className="field-input resize-vertical"
                            placeholder="Se hai richieste particolari, patologie, o note da segnalare..." 
                            maxLength={1000}
                          />
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                          <input type="checkbox" id="booking-privacy-policy" required className="mt-1 h-4 w-4 text-plum border-gray-300 rounded focus:ring-plum focus:ring-2" />
                          <label htmlFor="booking-privacy-policy" className="text-sm text-gray-800 leading-relaxed">
                            <span className="text-red-500">*</span>Accetto la <a href="/privacy" className="text-plum hover:underline font-semibold" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e il trattamento dei miei dati personali.
                          </label>
                        </div>

                        <button 
                          type="submit" 
                          disabled={isBookingSubmitting}
                          className="w-full btn-primary text-lg py-4 shadow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          style={{ borderRadius: 'var(--radius-lg)' }}
                        >
                          {isBookingSubmitting ? 'Inviando la richiesta...' : `Conferma Prenotazione (${selectedServiceObj.price})`}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

            </div>
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
                        <p className="font-semibold text-gray-800">Dove mi trovi</p>
                        <ul className="text-gray-600 list-disc pl-4 space-y-2 mt-1">
                          <li>
                            <b>Studio di psicologia Michele Facci</b>, Piazza Emilia 5, Milano 20129
                          </li>
                          <li>
                            <b>Osteopatia Brambilla</b>, Via Garibaldi 23, Carugate 20061
                          </li>
                        </ul>
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
                        <a href="mailto:dottoressa.marinarog@gmail.com" className="text-gray-600 hover:text-plum transition-colors">dottoressa.marinarog@gmail.com</a>
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
                        <a href="tel:+393517134807" className="text-gray-600 hover:text-plum transition-colors">+39 351 713 4807</a>
                      </div>
                    </div>
                  </div>
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
                          inputComponent={CustomPhoneInput}
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
                <strong>Sta Schiscia</strong> è il mio spazio dedicato a chi ha poco tempo ma non vuole rinunciare a mangiare bene. Idee pratiche, ricette equilibrate e consigli nutrizionali per trasformare la classica "schiscetta" in un alleato del benessere. 
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="https://www.instagram.com/giadamarinaro_nutrizione/"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-secondary" style={{ fontSize: '0.9rem', padding: '0.7rem 1.5rem' }}>
                  Instagram
                </a>
                <a href="https://www.tiktok.com/@giadamarinaro_nutrizione"
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