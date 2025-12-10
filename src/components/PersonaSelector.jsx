import React from 'react';

const personas = [
  {
    id: 'einsteiger',
    icon: '🎓',
    name: 'Einsteiger',
    description: 'Neu in der Medienbranche',
  },
  {
    id: 'quereinsteiger',
    icon: '🔄',
    name: 'Quereinsteiger',
    description: 'Aus einer anderen Branche',
  },
  {
    id: 'professional',
    icon: '💼',
    name: 'Professional',
    description: 'Erfahrener Medienschaffender',
  },
  {
    id: 'gruender',
    icon: '🚀',
    name: 'Gründer',
    description: 'Unternehmer im Medienbereich',
  },
  {
    id: 'student',
    icon: '📚',
    name: 'Student',
    description: 'In Ausbildung oder Studium',
  },
];

export default function PersonaSelector({ selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-extra-wide text-primary-gray-500">
        Wer sind Sie?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {personas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSelect(selected === persona.id ? null : persona.id)}
            className={`p-6 rounded-lg border-2 transition-all hover:-translate-y-1 ${
              selected === persona.id
                ? 'border-black bg-black text-white shadow-medium'
                : 'border-primary-gray-200 bg-white hover:border-black hover:shadow-subtle'
            }`}
          >
            <div className="text-4xl mb-3">{persona.icon}</div>
            <h4 className="font-semibold mb-1 text-sm uppercase tracking-wide">
              {persona.name}
            </h4>
            <p
              className={`text-xs ${
                selected === persona.id ? 'text-primary-gray-100' : 'text-primary-gray-500'
              }`}
            >
              {persona.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
