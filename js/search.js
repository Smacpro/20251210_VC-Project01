// Search and filter logic for the recommendation system

class RecommendationEngine {
    constructor(data) {
        this.allOffers = data;
        this.filteredOffers = [...data];
        this.currentFilters = {
            searchText: '',
            categories: ['alle'],
            locations: ['vor-ort', 'online', 'hybrid'],
            costs: ['kostenlos', 'kostenpflichtig'],
            timeRange: 'naechster-monat',
            customDateStart: null,
            customDateEnd: null,
            persona: null
        };
    }

    // Main search method
    search() {
        let results = [...this.allOffers];

        // Apply persona filter first (if selected)
        if (this.currentFilters.persona) {
            results = this.filterByPersona(results, this.currentFilters.persona);
        }

        // Apply text search
        if (this.currentFilters.searchText) {
            results = this.filterByText(results, this.currentFilters.searchText);
        }

        // Apply category filter
        if (!this.currentFilters.categories.includes('alle')) {
            results = this.filterByCategories(results, this.currentFilters.categories);
        }

        // Apply location filter
        results = this.filterByLocation(results, this.currentFilters.locations);

        // Apply cost filter
        results = this.filterByCost(results, this.currentFilters.costs);

        // Apply time filter
        results = this.filterByTime(results, this.currentFilters.timeRange,
            this.currentFilters.customDateStart, this.currentFilters.customDateEnd);

        this.filteredOffers = results;
        return results;
    }

    // Filter by free text search
    filterByText(offers, searchText) {
        const searchLower = searchText.toLowerCase();
        return offers.filter(offer => {
            return (
                offer.title.toLowerCase().includes(searchLower) ||
                offer.description.toLowerCase().includes(searchLower) ||
                offer.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                offer.source.toLowerCase().includes(searchLower) ||
                (offer.city && offer.city.toLowerCase().includes(searchLower))
            );
        });
    }

    // Filter by persona
    filterByPersona(offers, persona) {
        // Score offers based on persona match
        const scored = offers.map(offer => {
            let score = 0;

            // Direct persona match
            if (offer.personas.includes(persona)) {
                score += 10;
            }

            // Match based on persona interests
            const personaData = PERSONAS[persona];
            if (personaData) {
                const interestMatches = offer.tags.filter(tag =>
                    personaData.interests.some(interest =>
                        tag.toLowerCase().includes(interest.toLowerCase()) ||
                        interest.toLowerCase().includes(tag.toLowerCase())
                    )
                ).length;
                score += interestMatches * 2;

                // Prefer certain offer types based on persona
                if (personaData.preferredTypes.includes(offer.type)) {
                    score += 5;
                }
            }

            return { ...offer, score };
        });

        // Sort by score and return offers with score > 0
        return scored
            .filter(offer => offer.score > 0)
            .sort((a, b) => b.score - a.score);
    }

    // Filter by categories
    filterByCategories(offers, categories) {
        return offers.filter(offer =>
            offer.categories.some(cat => categories.includes(cat))
        );
    }

    // Filter by location type
    filterByLocation(offers, locations) {
        return offers.filter(offer => locations.includes(offer.location));
    }

    // Filter by cost
    filterByCost(offers, costs) {
        return offers.filter(offer => costs.includes(offer.cost));
    }

    // Filter by time range
    filterByTime(offers, timeRange, customStart, customEnd) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        return offers.filter(offer => {
            const offerDate = new Date(offer.date);

            switch (timeRange) {
                case 'alle':
                    return true;

                case 'naechste-woche':
                    const nextWeek = new Date(today);
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    return offerDate >= today && offerDate <= nextWeek;

                case 'naechster-monat':
                    const nextMonth = new Date(today);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    return offerDate >= today && offerDate <= nextMonth;

                case 'naechste-3-monate':
                    const next3Months = new Date(today);
                    next3Months.setMonth(next3Months.getMonth() + 3);
                    return offerDate >= today && offerDate <= next3Months;

                case 'custom':
                    if (customStart && customEnd) {
                        const start = new Date(customStart);
                        const end = new Date(customEnd);
                        return offerDate >= start && offerDate <= end;
                    }
                    return true;

                default:
                    return true;
            }
        });
    }

    // Update filters
    updateFilters(newFilters) {
        this.currentFilters = { ...this.currentFilters, ...newFilters };
        return this.search();
    }

    // Reset all filters
    resetFilters() {
        this.currentFilters = {
            searchText: '',
            categories: ['alle'],
            locations: ['vor-ort', 'online', 'hybrid'],
            costs: ['kostenlos', 'kostenpflichtig'],
            timeRange: 'naechster-monat',
            customDateStart: null,
            customDateEnd: null,
            persona: null
        };
        return this.search();
    }

    // Get current filter summary
    getActiveFiltersSummary() {
        const filters = [];

        if (this.currentFilters.persona) {
            filters.push(`Persona: ${PERSONAS[this.currentFilters.persona].name}`);
        }

        if (this.currentFilters.searchText) {
            filters.push(`Suche: "${this.currentFilters.searchText}"`);
        }

        if (!this.currentFilters.categories.includes('alle')) {
            const cats = this.currentFilters.categories.map(c => CATEGORIES[c]?.name || c).join(', ');
            filters.push(`Kategorien: ${cats}`);
        }

        return filters.join(' • ');
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

// Utility function to check if date is in the future
function isFutureDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
}

// Utility function to get relative date description
function getRelativeDateDescription(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return 'Vergangen';
    } else if (diffDays === 0) {
        return 'Heute';
    } else if (diffDays === 1) {
        return 'Morgen';
    } else if (diffDays <= 7) {
        return `In ${diffDays} Tagen`;
    } else if (diffDays <= 30) {
        const weeks = Math.floor(diffDays / 7);
        return `In ${weeks} Woche${weeks > 1 ? 'n' : ''}`;
    } else if (diffDays <= 365) {
        const months = Math.floor(diffDays / 30);
        return `In ${months} Monat${months > 1 ? 'en' : ''}`;
    } else {
        return formatDate(dateString);
    }
}
