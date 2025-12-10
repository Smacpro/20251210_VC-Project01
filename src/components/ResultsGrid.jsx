import React from 'react';
import OfferCard from './OfferCard';

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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
