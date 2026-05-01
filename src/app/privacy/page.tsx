import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Informativa sulla Privacy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Data di ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Titolare del Trattamento
              </h2>
              <p className="text-gray-700 mb-4">
                Il titolare del trattamento dei dati personali è:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Dott.ssa Giada Marinaro</strong></p>
                <p>Email: wizliza@gmail.com</p>
                <p>Professione: Nutrizionista</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Tipi di Dati Raccolti
              </h2>
              <p className="text-gray-700 mb-4">
                Raccogliamo i seguenti tipi di dati personali:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Dati di identificazione:</strong> Nome, cognome, indirizzo email, numero di telefono</li>
                <li><strong>Dati di contatto:</strong> Informazioni fornite attraverso il form di contatto</li>
                <li><strong>Dati di navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate (tramite cookie)</li>
                <li><strong>Dati di appuntamento:</strong> Preferenze di orario e informazioni relative alle visite nutrizionali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Finalità del Trattamento
              </h2>
              <p className="text-gray-700 mb-4">
                I dati personali vengono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Gestione delle richieste di contatto e prenotazione appuntamenti</li>
                <li>Invio di conferme e comunicazioni relative ai servizi nutrizionali</li>
                <li>Miglioramento del sito web e dell'esperienza utente</li>
                <li>Analisi statistiche anonime del traffico web</li>
                <li>Adempimenti legali e fiscali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Base Giuridica del Trattamento
              </h2>
              <p className="text-gray-700 mb-4">
                Il trattamento dei dati personali si basa su:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Consenso esplicito</strong> dell'interessato per l'invio di comunicazioni</li>
                <li><strong>Interesse legittimo</strong> per il miglioramento dei servizi</li>
                <li><strong>Adempimento contrattuale</strong> per la fornitura di servizi nutrizionali</li>
                <li><strong>Obbligo legale</strong> per gli adempimenti fiscali e contabili</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Conservazione dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                I dati personali vengono conservati per i seguenti periodi:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Dati di contatto:</strong> 3 anni dalla data dell'ultimo contatto</li>
                <li><strong>Dati di appuntamento:</strong> 10 anni per adempimenti fiscali</li>
                <li><strong>Dati di navigazione:</strong> 12 mesi (cookie analitici)</li>
                <li><strong>Email di marketing:</strong> fino alla revoca del consenso</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Condivisione dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                I dati personali non vengono venduti o ceduti a terzi. Possono essere condivisi solo con:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Fornitori di servizi:</strong> Supabase (database), SendGrid (email), Google Calendar (appuntamenti)</li>
                <li><strong>Autorità competenti:</strong> Solo su richiesta legale</li>
                <li><strong>Consulenti:</strong> Solo per adempimenti legali e fiscali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Diritti dell'Interessato
              </h2>
              <p className="text-gray-700 mb-4">
                Ai sensi del GDPR, l'interessato ha diritto a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Accesso:</strong> Conoscere quali dati vengono trattati</li>
                <li><strong>Rettifica:</strong> Correggere dati inesatti</li>
                <li><strong>Cancellazione:</strong> Richiedere la cancellazione dei dati</li>
                <li><strong>Limitazione:</strong> Limitare il trattamento</li>
                <li><strong>Portabilità:</strong> Ricevere i dati in formato strutturato</li>
                <li><strong>Opposizione:</strong> Opporsi al trattamento</li>
                <li><strong>Revoca consenso:</strong> Revocare il consenso in qualsiasi momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Sicurezza dei Dati
              </h2>
              <p className="text-gray-700 mb-4">
                Adottiamo misure tecniche e organizzative appropriate per proteggere i dati personali:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Crittografia SSL/TLS per le comunicazioni</li>
                <li>Accesso limitato ai dati solo al personale autorizzato</li>
                <li>Backup regolari e sistemi di recupero</li>
                <li>Monitoraggio continuo della sicurezza</li>
                <li>Formazione del personale sulla protezione dei dati</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Cookie e Tecnologie Simili
              </h2>
              <p className="text-gray-700 mb-4">
                Il sito utilizza cookie per migliorare l'esperienza utente. Per maggiori informazioni, consulta la nostra 
                <a href="/cookies" className="text-blue-600 hover:text-blue-800 underline">Informativa sui Cookie</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Modifiche all'Informativa
              </h2>
              <p className="text-gray-700 mb-4">
                Questa informativa può essere aggiornata periodicamente. Le modifiche sostanziali verranno comunicate 
                tramite email o avviso sul sito web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contatti
              </h2>
              <p className="text-gray-700 mb-4">
                Per esercitare i tuoi diritti o per qualsiasi domanda sulla privacy, contattaci:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> wizliza@gmail.com</p>
                <p><strong>Oggetto:</strong> Richiesta Privacy - GDPR</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Autorità di Controllo
              </h2>
              <p className="text-gray-700 mb-4">
                Hai diritto di presentare reclamo al Garante per la Protezione dei Dati Personali:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Garante Privacy</strong></p>
                <p>Piazza di Monte Citorio, 121 - 00186 Roma</p>
                <p>Tel: 06.696771 - Fax: 06.69677.3785</p>
                <p>Email: garante@gpdp.it</p>
                <p>Web: www.gpdp.it</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
