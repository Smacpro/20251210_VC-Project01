import React, { useState } from 'react';

const categories = [
  { id: 'alle', name: 'Alle' },
  { id: 'veranstaltung', name: 'Veranstaltungen' },
  { id: 'foerderung', name: 'Förderprogramme' },
  { id: 'publikation', name: 'Publikationen' },
  { id: 'weiterbildung', name: 'Weiterbildung' },
  { id: 'netzwerk', name: 'Netzwerk' },
];

export default function FilterPanel({
  selectedCategories,
  onCategoriesChange,
  selectedLocations,
  onLocationsChange,
  selectedCosts,
  onCostsChange,
  timeRange,
  onTimeRangeChange,
  customDateRange,
  onCustomDateRangeChange,
  onReset,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleCategory = (categoryId) => {
    if (categoryId === 'alle') {
      onCategoriesChange(['alle']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter((c) => c !== categoryId)
        : [...selectedCategories.filter((c) => c !== 'alle'), categoryId];

      onCategoriesChange(newCategories.length ? newCategories : ['alle']);
    }
  };

  const toggleLocation = (location) => {
    const newLocations = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];

    if (newLocations.length) onLocationsChange(newLocations);
  };

  const toggleCost = (cost) => {
    const newCosts = selectedCosts.includes(cost)
      ? selectedCosts.filter((c) => c !== cost)
      : [...selectedCosts, cost];

    if (newCosts.length) onCostsChange(newCosts);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-primary-gray-100">
      {/* Category Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-extra-wide text-primary-gray-500">
          Kategorien
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${
                selectedCategories.includes(category.id)
                  ? 'bg-black text-white'
                  : 'bg-primary-gray-50 text-black hover:bg-primary-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary-gray-500 hover:text-black transition-colors"
      >
        <span>Erweiterte Filter</span>
        <svg
          className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-primary-gray-100">
          {/* Location Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-extra-wide text-primary-gray-500">
              Veranstaltungsort
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'vor-ort', label: 'Vor Ort', icon: '📍' },
                { id: 'online', label: 'Online', icon: '💻' },
                { id: 'hybrid', label: 'Hybrid', icon: '🔄' },
              ].map((location) => (
                <label
                  key={location.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(location.id)}
                    onChange={() => toggleLocation(location.id)}
                    className="w-5 h-5 rounded border-2 border-primary-gray-300 text-black focus:ring-2 focus:ring-black"
                  />
                  <span className="text-sm">
                    {location.icon} {location.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Cost Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-extra-wide text-primary-gray-500">
              Kosten
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'kostenlos', label: 'Kostenlos', icon: '🆓' },
                { id: 'kostenpflichtig', label: 'Kostenpflichtig', icon: '💶' },
              ].map((cost) => (
                <label key={cost.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCosts.includes(cost.id)}
                    onChange={() => toggleCost(cost.id)}
                    className="w-5 h-5 rounded border-2 border-primary-gray-300 text-black focus:ring-2 focus:ring-black"
                  />
                  <span className="text-sm">
                    {cost.icon} {cost.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Range Filter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-extra-wide text-primary-gray-500">
              Zeitraum
            </h4>
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="w-full px-4 py-2 border-2 border-primary-gray-200 rounded-lg focus:border-black focus:outline-none text-sm"
            >
              <option value="alle">Alle</option>
              <option value="naechste-woche">Nächste Woche</option>
              <option value="naechster-monat">Nächster Monat</option>
              <option value="naechste-3-monate">Nächste 3 Monate</option>
              <option value="custom">Benutzerdefiniert</option>
            </select>

            {timeRange === 'custom' && (
              <div className="flex gap-3 items-center">
                <input
                  type="date"
                  value={customDateRange.start || ''}
                  onChange={(e) =>
                    onCustomDateRangeChange({ ...customDateRange, start: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border-2 border-primary-gray-200 rounded-lg focus:border-black focus:outline-none text-sm"
                />
                <span className="text-sm text-primary-gray-500">bis</span>
                <input
                  type="date"
                  value={customDateRange.end || ''}
                  onChange={(e) =>
                    onCustomDateRangeChange({ ...customDateRange, end: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border-2 border-primary-gray-200 rounded-lg focus:border-black focus:outline-none text-sm"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
