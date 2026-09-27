export interface PricingService {
  id: string
  title: string
  price: string
  priceValue: number
  duration: string
  description: string
  features: string[]
  badge?: string
  allowedModes: ('presenza')[]
  popular?: boolean
}

export const PRICING_SERVICES: PricingService[] = [
  {
    id: 'prima-visita',
    title: 'Prima Visita Nutrizionale',
    price: '120 €',
    priceValue: 120,
    duration: '60 min',
    popular: true,
    badge: 'Consigliata per iniziare',
    description: 'Il punto di partenza fondamentale per analizzare le tue abitudini, stato di salute e costruire un percorso personalizzato su misura per te in studio.',
    features: [
      'Anamnesi fisiologica, patologica e alimentare approfondita',
      'Valutazione della composizione corporea (BIA/plicometria in studio)',
      'Analisi dello stile di vita e degli obiettivi',
      'Elaborazione e consegna del piano alimentare personalizzato',
      'Supporto continuo via email/WhatsApp tra le visite'
    ],
    allowedModes: ['presenza']
  },
  {
    id: 'visita-controllo',
    title: 'Visita di Controllo',
    price: '70 €',
    priceValue: 70,
    duration: '30 min',
    description: 'Incontro periodico in studio per monitorare i progressi, valutare i risultati ottenuti e adattare il piano nutrizionale alle tue nuove esigenze.',
    features: [
      'Valutazione dei risultati e dei parametri corporei',
      'Analisi del gradimento e della sostenibilità del piano',
      'Modifiche ed eventuali aggiornamenti alle tabelle alimentari',
      'Risoluzione di dubbi e supporto motivazionale'
    ],
    allowedModes: ['presenza']
  },
  {
    id: 'nutrizione-sportiva',
    title: 'Nutrizione Sportiva & Performance',
    price: '140 €',
    priceValue: 140,
    duration: '60 - 75 min',
    badge: 'Project Invictus',
    description: 'Percorso avanzato in studio per atleti e sportivi che desiderano ottimizzare prestazione fisica, recupero muscolare e ricomposizione corporea.',
    features: [
      'Analisi dei fabbisogni energetici specifici per la disciplina',
      'Pianificazione della nutrizione peri-workout (pre, durante, post allenamento)',
      'Strategie di ricomposizione corporea (massa magra/massa grassa)',
      'Consulenza sull’integrazione sportiva basata su evidenze scientifiche',
      'Adattamento ai ritmi di gara e allenamento'
    ],
    allowedModes: ['presenza']
  },
  {
    id: 'dca-equilibrio',
    title: 'Percorso DCA & Equilibrio Alimentare',
    price: '120 €',
    priceValue: 120,
    duration: '60 min',
    description: 'Consulenza specialistica in studio ad approccio empatico e senza giudizio per ritrovare un rapporto sereno e consapevole con il cibo e il proprio corpo.',
    features: [
      'Approccio non prescrittivo orientato all’ascolto ed empatia',
      'Specializzazione DCA (formazione San Raffaele)',
      'Collaborazione con équipe multidisciplinare (psicoterapeuti/medici)',
      'Rieducazione alimentare graduale e sostenibile',
      'Zero diete punitive o conteggio calorico ossessivo'
    ],
    allowedModes: ['presenza']
  }
]
