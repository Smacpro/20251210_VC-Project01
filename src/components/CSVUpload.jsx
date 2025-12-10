import React, { useRef } from 'react';
import { parseCSV, downloadCSVTemplate } from '../utils/csvParser';

export default function CSVUpload({ onDataLoaded }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const offers = await parseCSV(file);
      onDataLoaded(offers);
      alert(`✓ ${offers.length} Angebote erfolgreich geladen!`);
    } catch (error) {
      console.error('CSV Parse Error:', error);
      alert('Fehler beim Laden der CSV-Datei. Bitte überprüfen Sie das Format.');
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-primary-gray-100 p-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">
            CSV-Daten hochladen
          </h3>
          <p className="text-primary-gray-500">
            Laden Sie Ihre eigene CSV-Datei mit Angeboten hoch oder verwenden Sie unsere Beispieldaten.
          </p>
        </div>

        <div className="key-visual-lines max-w-xs mx-auto">
          <div className="key-visual-line"></div>
          <div className="key-visual-line"></div>
          <div className="key-visual-line"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-primary-gray-500 transition-all hover:-translate-y-0.5 shadow-subtle hover:shadow-medium uppercase tracking-wide text-sm"
          >
            📁 CSV hochladen
          </button>
          <button
            onClick={downloadCSVTemplate}
            className="px-8 py-4 bg-white text-black font-medium rounded-full border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-wide text-sm"
          >
            ⬇️ Vorlage herunterladen
          </button>
        </div>

        <div className="pt-6 border-t border-primary-gray-100">
          <details className="text-left">
            <summary className="cursor-pointer font-semibold text-sm uppercase tracking-wide text-primary-gray-500 hover:text-black transition-colors">
              CSV-Format Anleitung
            </summary>
            <div className="mt-4 space-y-2 text-sm text-primary-gray-500">
              <p>Ihre CSV-Datei sollte folgende Spalten enthalten:</p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li><strong>Typ:</strong> veranstaltung, foerderung, publikation, weiterbildung, netzwerk</li>
                <li><strong>Titel:</strong> Name des Angebots</li>
                <li><strong>Beschreibung:</strong> Kurze Beschreibung</li>
                <li><strong>Datum:</strong> Format YYYY-MM-DD (z.B. 2025-06-15)</li>
                <li><strong>Ort:</strong> vor-ort, online, oder hybrid</li>
                <li><strong>Stadt:</strong> Ortsname (optional)</li>
                <li><strong>Kosten:</strong> kostenlos oder kostenpflichtig</li>
                <li><strong>Tags:</strong> Komma-getrennte Schlagworte</li>
                <li><strong>Quelle:</strong> Website-Name</li>
                <li><strong>URL:</strong> Vollständiger Link</li>
                <li><strong>Zielgruppe:</strong> Einsteiger, Professional, etc.</li>
                <li><strong>Kategorien:</strong> Komma-getrennte Kategorien</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
