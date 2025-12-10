import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import PersonaSelector from './PersonaSelector';
import FilterPanel from './FilterPanel';
import ResultsGrid from './ResultsGrid';
import { filterOffers } from '../utils/filterEngine';

export default function RecommendationSystem({ offers }) {
  const [searchText, setSearchText] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(['alle']);
  const [selectedLocations, setSelectedLocations] = useState(['vor-ort', 'online', 'hybrid']);
  const [selectedCosts, setSelectedCosts] = useState(['kostenlos', 'kostenpflichtig']);
  const [timeRange, setTimeRange] = useState('naechster-monat');
  const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });
  const [filteredResults, setFilteredResults] = useState(offers);

  useEffect(() => {
    const results = filterOffers(offers, {
      searchText,
      persona: selectedPersona,
      categories: selectedCategories,
      locations: selectedLocations,
      costs: selectedCosts,
      timeRange,
      customDateRange,
    });
    setFilteredResults(results);
  }, [
    offers,
    searchText,
    selectedPersona,
    selectedCategories,
    selectedLocations,
    selectedCosts,
    timeRange,
    customDateRange,
  ]);

  const resetFilters = () => {
    setSearchText('');
    setSelectedPersona(null);
    setSelectedCategories(['alle']);
    setSelectedLocations(['vor-ort', 'online', 'hybrid']);
    setSelectedCosts(['kostenlos', 'kostenpflichtig']);
    setTimeRange('naechster-monat');
    setCustomDateRange({ start: null, end: null });
  };

  return (
    <section id="empfehlungen" className="py-20 bg-primary-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
            Finden Sie Ihr Angebot
          </h2>
          <p className="text-lg text-primary-gray-500 max-w-2xl mx-auto">
            Nutzen Sie unsere Suchfunktion, um passende Veranstaltungen, Förderprogramme
            und Publikationen zu entdecken.
          </p>

          {/* Key Visual Lines */}
          <div className="key-visual-lines max-w-sm mx-auto">
            <div className="key-visual-line"></div>
            <div className="key-visual-line"></div>
            <div className="key-visual-line"></div>
          </div>
        </div>

        {/* Persona Selection */}
        <div className="mb-12">
          <PersonaSelector
            selected={selectedPersona}
            onSelect={setSelectedPersona}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchText} onChange={setSearchText} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterPanel
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            selectedLocations={selectedLocations}
            onLocationsChange={setSelectedLocations}
            selectedCosts={selectedCosts}
            onCostsChange={setSelectedCosts}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            customDateRange={customDateRange}
            onCustomDateRangeChange={setCustomDateRange}
            onReset={resetFilters}
          />
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium uppercase tracking-wide">
            {filteredResults.length}{' '}
            {filteredResults.length === 1 ? 'Ergebnis' : 'Ergebnisse'}
          </p>
          {(selectedPersona || searchText || !selectedCategories.includes('alle')) && (
            <button
              onClick={resetFilters}
              className="text-sm text-primary-gray-500 hover:text-black transition-colors uppercase tracking-wide"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>

        {/* Results Grid */}
        <ResultsGrid results={filteredResults} />
      </div>
    </section>
  );
}
