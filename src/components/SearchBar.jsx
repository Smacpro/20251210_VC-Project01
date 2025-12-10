import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Suche nach Thema, Schlagwort oder Veranstalter..."
          className="w-full px-6 py-5 pr-12 text-lg border-2 border-primary-gray-200 rounded-full focus:border-black focus:outline-none transition-colors bg-white"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black text-white hover:bg-primary-gray-500 transition-colors"
          aria-label="Suchen"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
