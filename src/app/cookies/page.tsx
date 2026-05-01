import React from 'react'

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Informativa sui Cookie
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Data di ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cosa sono i Cookie
              </h2>
              <p className="text-gray-700 mb-4">
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. 
                Vengono utilizzati per migliorare la tua esperienza di navigazione e per fornire funzionalità personalizzate.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Tipi di Cookie Utilizzati
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cookie Tecnici (Necessari)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>cookie-consent:</strong> Memorizza le tue preferenze sui cookie</li>
                    <li><strong>session-id:</strong> Mantiene la sessione attiva durante la navigazione</li>
                    <li><strong>csrf-token:</strong> Protegge da attacchi di tipo CSRF</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Durata:</strong> Sessione o 1 anno | <strong>Base giuridica:</strong> Interesse legittimo
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cookie Funzionali
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Migliorano la funzionalità del sito web e la tua esperienza utente.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>language-preference:</strong> Memorizza la lingua preferita</li>
                    <li><strong>theme-preference:</strong> Memorizza le preferenze di visualizzazione</li>
                    <li><strong>form-data:</strong> Salva temporaneamente i dati del form</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Durata:</strong> 30 giorni | <strong>Base giuridica:</strong> Consenso
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cookie Analitici
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Ci aiutano a capire come gli utenti interagiscono con il sito web.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>_ga:</strong> Google Analytics - Distingue gli utenti unici</li>
                    <li><strong>_ga_*:</strong> Google Analytics - Memorizza informazioni sulla sessione</li>
                    <li><strong>_gid:</strong> Google Analytics - Distingue gli utenti per 24 ore</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Durata:</strong> 2 anni | <strong>Base giuridica:</strong> Consenso
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cookie di Terze Parti
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Utilizzati da servizi esterni integrati nel sito.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>Google Calendar:</strong> Per la gestione degli appuntamenti</li>
                    <li><strong>SendGrid:</strong> Per l'invio di email</li>
                    <li><strong>Supabase:</strong> Per la gestione del database</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Durata:</strong> Variabile | <strong>Base giuridica:</strong> Consenso
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Gestione dei Cookie
              </h2>
              <p className="text-gray-700 mb-4">
                Puoi gestire le tue preferenze sui cookie in diversi modi:
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Tramite il Banner di Consenso
                </h3>
                <p className="text-blue-800">
                  Quando visiti il sito per la prima volta, apparirà un banner che ti permette di:
                </p>
                <ul className="list-disc pl-6 text-blue-800 mt-2">
                  <li>Accettare tutti i cookie</li>
                  <li>Rifiutare i cookie non necessari</li>
                  <li>Personalizzare le tue preferenze</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tramite le Impostazioni del Browser
                </h3>
                <p className="text-gray-700 mb-2">
                  Puoi disabilitare i cookie direttamente dal tuo browser:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                  <li><strong>Firefox:</strong> Opzioni → Privacy e sicurezza → Cookie</li>
                  <li><strong>Safari:</strong> Preferenze → Privacy → Cookie</li>
                  <li><strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Tramite il Centro Preferenze
                </h3>
                <p className="text-green-800">
                  Puoi modificare le tue preferenze in qualsiasi momento cliccando su 
                  "Gestisci Cookie" nel footer del sito.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cookie di Terze Parti
              </h2>
              <p className="text-gray-700 mb-4">
                Il nostro sito utilizza servizi di terze parti che possono impostare cookie:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Google Analytics
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Utilizziamo Google Analytics per analizzare l'utilizzo del sito web.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Privacy Policy:</strong> 
                    <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline ml-1">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Opt-out:</strong> 
                    <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-800 underline ml-1">
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Google Calendar API
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Utilizziamo l'API di Google Calendar per gestire gli appuntamenti.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Privacy Policy:</strong> 
                    <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800 underline ml-1">
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Impatto della Disabilitazione dei Cookie
              </h2>
              <p className="text-gray-700 mb-4">
                Disabilitare alcuni cookie potrebbe influire sulla funzionalità del sito:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Cookie tecnici:</strong> Il sito potrebbe non funzionare correttamente</li>
                <li><strong>Cookie funzionali:</strong> Perderai le tue preferenze personalizzate</li>
                <li><strong>Cookie analitici:</strong> Non potremo migliorare il sito basandoci sui dati di utilizzo</li>
                <li><strong>Cookie di terze parti:</strong> Alcuni servizi potrebbero non funzionare</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Aggiornamenti a questa Informativa
              </h2>
              <p className="text-gray-700 mb-4">
                Questa informativa sui cookie può essere aggiornata periodicamente per riflettere 
                cambiamenti nei cookie utilizzati o per altre ragioni operative, legali o normative.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contatti
              </h2>
              <p className="text-gray-700 mb-4">
                Per domande sui cookie o per esercitare i tuoi diritti, contattaci:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> wizliza@gmail.com</p>
                <p><strong>Oggetto:</strong> Richiesta Cookie - Privacy</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
