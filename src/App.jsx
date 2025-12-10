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
  const recommendationRef = useRef(null);

  // Load real CSV data on mount
  useEffect(() => {
    loadCSVFromRepo()
      .then((data) => {
        if (data && data.length > 0) {
          console.log(`Loaded ${data.length} offers from CSV`);
          setOffers(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load CSV, using sample data:', error);
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
