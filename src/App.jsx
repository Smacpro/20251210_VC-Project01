import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RecommendationSystem from './components/RecommendationSystem';
import CSVUpload from './components/CSVUpload';
import Footer from './components/Footer';
import { sampleOffers } from './data/sampleOffers';
import { loadCSVFromRepo } from './utils/csvParser';

function App() {
  const [offers, setOffers] = useState(sampleOffers);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('loading');
  const [debugInfo, setDebugInfo] = useState([]);
  const recommendationRef = useRef(null);

  // Load real CSV data on mount
  useEffect(() => {
    const debugLog = [];
    debugLog.push('Starting CSV load...');
    setDebugInfo([...debugLog]);

    loadCSVFromRepo()
      .then((data) => {
        if (data && data.length > 0) {
          console.log(`✓ Loaded ${data.length} offers from CSV`);
          debugLog.push(`✓ CSV loaded successfully: ${data.length} offers`);
          setOffers(data);
          setDataSource('csv');
        } else {
          console.log('CSV returned empty, using sample data');
          debugLog.push('⚠ CSV returned no data, using sample offers');
          setDataSource('sample');
        }
        setDebugInfo([...debugLog]);
      })
      .catch((error) => {
        console.error('Failed to load CSV, using sample data:', error);
        debugLog.push(`✗ CSV loading failed: ${error.message}`);
        debugLog.push('Using sample data as fallback');
        setDataSource('sample');
        setDebugInfo([...debugLog]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDataLoaded = (newOffers) => {
    setOffers(newOffers);
    setShowCSVUpload(false);
    // Scroll to recommendations
    setTimeout(() => {
      recommendationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToRecommendations = () => {
    recommendationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Debug Info Banner */}
      {(loading || dataSource !== 'csv') && (
        <div className={`px-4 py-3 ${dataSource === 'sample' ? 'bg-yellow-50 border-b-2 border-yellow-400' : 'bg-blue-50 border-b-2 border-blue-400'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {loading ? '⏳' : dataSource === 'csv' ? '✓' : '⚠️'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {loading && 'Lade CSV-Daten...'}
                  {!loading && dataSource === 'csv' && `CSV-Daten geladen (${offers.length} Angebote)`}
                  {!loading && dataSource === 'sample' && 'CSV konnte nicht geladen werden - Beispieldaten werden angezeigt'}
                </p>
                {debugInfo.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs cursor-pointer text-gray-600 hover:text-black">
                      Debug-Informationen anzeigen
                    </summary>
                    <div className="mt-2 text-xs font-mono bg-white p-3 rounded border border-gray-200">
                      {debugInfo.map((info, i) => (
                        <div key={i} className="mb-1">{info}</div>
                      ))}
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div>BASE_URL: {import.meta.env.BASE_URL}</div>
                        <div>Mode: {import.meta.env.MODE}</div>
                        <div>Offers count: {offers.length}</div>
                      </div>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onStartSearch={scrollToRecommendations} />

        {/* CSV Upload Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCSVUpload(!showCSVUpload)}
                className="text-sm font-medium uppercase tracking-wide text-primary-gray-500 hover:text-black transition-colors flex items-center gap-2 mx-auto"
              >
                <span>{showCSVUpload ? '▼' : '▶'}</span>
                <span>Eigene Daten hochladen</span>
              </button>
            </div>

            {showCSVUpload && <CSVUpload onDataLoaded={handleDataLoaded} />}
          </div>
        </section>

        {/* Recommendation System */}
        <div ref={recommendationRef}>
          <RecommendationSystem offers={offers} />
        </div>

        {/* Info Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 border-2 border-primary-gray-100 rounded-lg hover:border-black transition-all">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">
                  Personalisiert
                </h3>
                <p className="text-sm text-primary-gray-500">
                  Empfehlungen basierend auf Ihrer Persona und Ihren Interessen
                </p>
              </div>

              <div className="text-center p-8 border-2 border-primary-gray-100 rounded-lg hover:border-black transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">
                  Aktuell
                </h3>
                <p className="text-sm text-primary-gray-500">
                  Stets aktuelle Informationen zu Events, Förderungen und mehr
                </p>
              </div>

              <div className="text-center p-8 border-2 border-primary-gray-100 rounded-lg hover:border-black transition-all">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">
                  Umfassend
                </h3>
                <p className="text-sm text-primary-gray-500">
                  Alle wichtigen Medien-Initiativen in Bayern an einem Ort
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">
              Immer up to date
            </h2>
            <p className="text-lg text-primary-gray-100 mb-8">
              Erhalten Sie regelmäßig Updates zu neuen Veranstaltungen, Förderungen und Trends
              der bayerischen Medienlandschaft.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 px-6 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-accent-yellow"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-accent-yellow transition-all uppercase tracking-wide text-sm whitespace-nowrap"
              >
                Anmelden
              </button>
            </form>

            <p className="text-xs text-primary-gray-300 mt-4">
              Mit der Anmeldung akzeptieren Sie unsere{' '}
              <a href="#datenschutz" className="underline hover:text-accent-yellow">
                Datenschutzerklärung
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
