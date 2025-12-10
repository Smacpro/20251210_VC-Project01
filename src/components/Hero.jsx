import React from 'react';

export default function Hero({ onStartSearch }) {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                WIR GESTALTEN DIE{' '}
                <span className="block">ZUKUNFT DER</span>
                <span className="block">MEDIEN IN BAYERN.</span>
              </h1>

              {/* Key Visual Lines */}
              <div className="key-visual-lines max-w-xs">
                <div className="key-visual-line"></div>
                <div className="key-visual-line"></div>
                <div className="key-visual-line"></div>
              </div>

              <p className="text-lg md:text-xl text-primary-gray-500 leading-relaxed max-w-xl">
                Medien.Bayern bündelt Projekte und Initiativen für die Medienbranche in Bayern.
                Entdecken Sie Veranstaltungen, Förderprogramme und Weiterbildungsangebote –
                maßgeschneidert für Medienschaffende.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartSearch}
                className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-primary-gray-500 transition-all hover:-translate-y-0.5 shadow-subtle hover:shadow-medium uppercase tracking-wide text-sm"
              >
                Empfehlungen finden
              </button>
              <a
                href="#ueber"
                className="px-8 py-4 bg-white text-black font-medium rounded-full border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-wide text-sm text-center"
              >
                Über Medien.Bayern
              </a>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-gray-50 rounded-2xl"></div>
              <div className="relative p-12 space-y-4">
                {/* Abstract visualization */}
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-16 bg-black rounded"
                          style={{
                            width: `${Math.random() * 60 + 40}%`,
                            opacity: 0.8 - i * 0.1,
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
