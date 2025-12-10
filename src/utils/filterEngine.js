// Filter engine for recommendations

const personas = {
  einsteiger: {
    interests: ['Ausbildung', 'Karriere', 'Grundlagen', 'Networking', 'Einstieg'],
    preferredTypes: ['weiterbildung', 'veranstaltung'],
  },
  quereinsteiger: {
    interests: ['Weiterbildung', 'Umschulung', 'Networking', 'Trends', 'Innovation'],
    preferredTypes: ['weiterbildung', 'veranstaltung', 'netzwerk'],
  },
  professional: {
    interests: ['Innovation', 'Technologie', 'Networking', 'Trends', 'Weiterbildung'],
    preferredTypes: ['veranstaltung', 'weiterbildung', 'publikation', 'netzwerk'],
  },
  gruender: {
    interests: ['Förderung', 'Finanzierung', 'Startups', 'Innovation', 'Networking', 'Pitch'],
    preferredTypes: ['foerderung', 'veranstaltung', 'netzwerk'],
  },
  student: {
    interests: ['Ausbildung', 'Karriere', 'Praktikum', 'Workshop', 'Stipendium'],
    preferredTypes: ['weiterbildung', 'veranstaltung', 'foerderung'],
  },
};

export function filterOffers(offers, filters) {
  let results = [...offers];

  // Apply persona filter
  if (filters.persona) {
    results = filterByPersona(results, filters.persona);
  }

  // Apply text search
  if (filters.searchText) {
    results = filterByText(results, filters.searchText);
  }

  // Apply category filter
  if (!filters.categories.includes('alle')) {
    results = filterByCategories(results, filters.categories);
  }

  // Apply location filter
  results = filterByLocation(results, filters.locations);

  // Apply cost filter
  results = filterByCost(results, filters.costs);

  // Apply time filter
  results = filterByTime(results, filters.timeRange, filters.customDateRange);

  return results;
}

function filterByText(offers, searchText) {
  const searchLower = searchText.toLowerCase();
  return offers.filter((offer) => {
    return (
      offer.title.toLowerCase().includes(searchLower) ||
      offer.description.toLowerCase().includes(searchLower) ||
      (offer.tags && offer.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
      offer.source.toLowerCase().includes(searchLower) ||
      (offer.city && offer.city.toLowerCase().includes(searchLower))
    );
  });
}

function filterByPersona(offers, persona) {
  const personaData = personas[persona];
  if (!personaData) return offers;

  // Score offers based on persona match
  const scored = offers.map((offer) => {
    let score = 0;

    // Direct persona match
    if (offer.personas && offer.personas.includes(persona)) {
      score += 10;
    }

    // Match based on persona interests
    if (offer.tags) {
      const interestMatches = offer.tags.filter((tag) =>
        personaData.interests.some(
          (interest) =>
            tag.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(tag.toLowerCase())
        )
      ).length;
      score += interestMatches * 2;
    }

    // Prefer certain offer types based on persona
    if (personaData.preferredTypes.includes(offer.type)) {
      score += 5;
    }

    return { ...offer, score };
  });

  // Sort by score and return offers with score > 0
  return scored.filter((offer) => offer.score > 0).sort((a, b) => b.score - a.score);
}

function filterByCategories(offers, categories) {
  return offers.filter((offer) =>
    offer.categories ? offer.categories.some((cat) => categories.includes(cat)) : false
  );
}

function filterByLocation(offers, locations) {
  return offers.filter((offer) => locations.includes(offer.location));
}

function filterByCost(offers, costs) {
  return offers.filter((offer) => costs.includes(offer.cost));
}

function filterByTime(offers, timeRange, customDateRange) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return offers.filter((offer) => {
    const offerDate = new Date(offer.date);

    switch (timeRange) {
      case 'alle':
        return true;

      case 'naechste-woche': {
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        return offerDate >= today && offerDate <= nextWeek;
      }

      case 'naechster-monat': {
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return offerDate >= today && offerDate <= nextMonth;
      }

      case 'naechste-3-monate': {
        const next3Months = new Date(today);
        next3Months.setMonth(next3Months.getMonth() + 3);
        return offerDate >= today && offerDate <= next3Months;
      }

      case 'custom': {
        if (customDateRange.start && customDateRange.end) {
          const start = new Date(customDateRange.start);
          const end = new Date(customDateRange.end);
          return offerDate >= start && offerDate <= end;
        }
        return true;
      }

      default:
        return true;
    }
  });
}
