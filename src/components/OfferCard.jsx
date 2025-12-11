import React from 'react';

const typeColors = {
  veranstaltung: 'bg-accent-yellow',
  foerderung: 'bg-accent-turquoise',
  publikation: 'bg-accent-blue',
  weiterbildung: 'bg-accent-yellow',
  netzwerk: 'bg-black',
};

const typeLabels = {
  veranstaltung: 'Veranstaltung',
  foerderung: 'Förderung',
  publikation: 'Publikation',
  weiterbildung: 'Weiterbildung',
  netzwerk: 'Netzwerk',
};

const locationIcons = {
  'vor-ort': '📍',
  online: '💻',
  hybrid: '🔄',
};

export default function OfferCard({ offer }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="group bg-white rounded-lg border-2 border-primary-gray-100 hover:border-black transition-all hover:-translate-y-1 hover:shadow-medium overflow-hidden">
      {/* Type Indicator */}
      <div className={`h-1 ${typeColors[offer.type] || 'bg-black'}`}></div>

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <span className="px-3 py-1 bg-primary-gray-50 text-xs font-semibold uppercase tracking-wide rounded-full">
            {typeLabels[offer.type] || offer.type}
          </span>
          {offer.cost === 'kostenlos' && (
            <span className="px-3 py-1 bg-black text-white text-xs font-semibold uppercase tracking-wide rounded-full">
              Kostenlos
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary-gray-500 transition-colors">
          {offer.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-primary-gray-500 line-clamp-3 leading-relaxed">
          {offer.description}
        </p>

        {/* Meta Information - Only for events */}
        {offer.type === 'veranstaltung' && (
          <div className="flex flex-wrap gap-3 text-sm text-primary-gray-500 pt-3 border-t border-primary-gray-100">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{formatDate(offer.date)}</span>
            </div>
            {offer.location && (
              <div className="flex items-center gap-1">
                <span>{locationIcons[offer.location] || '📍'}</span>
                <span>{offer.city || offer.location}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {offer.tags && offer.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {offer.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-gray-50 text-xs text-primary-gray-500 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-gray-100">
          <span className="text-xs text-primary-gray-400">{offer.source}</span>
          {offer.url && offer.url !== '#' ? (
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-wide hover:underline flex items-center gap-1"
            >
              Mehr erfahren
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-primary-gray-400 italic">
              Keine Website verfügbar
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
