import React from 'react';
import OfferCard from './OfferCard';

const typeLabels = {
  veranstaltung: 'Veranstaltungen',
  foerderung: 'Förderungen',
  publikation: 'Publikationen',
  weiterbildung: 'Weiterbildungen',
  netzwerk: 'Netzwerk',
};

const typeOrder = ['veranstaltung', 'foerderung', 'weiterbildung', 'netzwerk', 'publikation'];

export default function ResultsGrid({ results }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">
          Keine Ergebnisse gefunden
        </h3>
        <p className="text-primary-gray-500">
          Versuchen Sie, Ihre Suchkriterien anzupassen oder Filter zu ändern.
        </p>
      </div>
    );
  }

  // Group results by type
  const groupedResults = results.reduce((acc, offer) => {
    const type = offer.type || 'veranstaltung';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(offer);
    return acc;
  }, {});

  // Sort categories by predefined order
  const sortedTypes = Object.keys(groupedResults).sort((a, b) => {
    return typeOrder.indexOf(a) - typeOrder.indexOf(b);
  });

  return (
    <div className="space-y-12">
      {sortedTypes.map((type) => (
        <section key={type} className="space-y-6">
          {/* Category Header */}
          <div className="border-b-2 border-black pb-3">
            <h3 className="text-2xl font-bold uppercase tracking-tight">
              {typeLabels[type] || type}
            </h3>
            <p className="text-sm text-primary-gray-500 mt-1">
              {groupedResults[type].length} {groupedResults[type].length === 1 ? 'Angebot' : 'Angebote'}
            </p>
          </div>

          {/* Category Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedResults[type].map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
