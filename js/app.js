// Main application logic

// Initialize the recommendation engine
let recommendationEngine;
let currentResults = [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const activeFiltersDisplay = document.getElementById('activeFilters');
const noResultsDiv = document.getElementById('noResults');
const resetFiltersButton = document.getElementById('resetFilters');
const timeFilterSelect = document.getElementById('timeFilter');
const customDateRange = document.getElementById('customDateRange');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize recommendation engine with data
    recommendationEngine = new RecommendationEngine(OFFERS_DATA);

    // Set up event listeners
    setupEventListeners();

    // Perform initial search
    performSearch();
});

// Set up all event listeners
function setupEventListeners() {
    // Search button
    searchButton.addEventListener('click', performSearch);

    // Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Persona cards
    const personaCards = document.querySelectorAll('.persona-card');
    personaCards.forEach(card => {
        card.addEventListener('click', () => handlePersonaSelection(card));
    });

    // Category filters
    const categoryFilters = document.querySelectorAll('.filter-chip');
    categoryFilters.forEach(chip => {
        chip.addEventListener('click', () => handleCategoryFilter(chip));
    });

    // Location checkboxes
    const locationCheckboxes = document.querySelectorAll('input[name="location"]');
    locationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', performSearch);
    });

    // Cost checkboxes
    const costCheckboxes = document.querySelectorAll('input[name="cost"]');
    costCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', performSearch);
    });

    // Time filter select
    timeFilterSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            customDateRange.style.display = 'flex';
        } else {
            customDateRange.style.display = 'none';
        }
        performSearch();
    });

    // Custom date inputs
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    if (startDateInput && endDateInput) {
        startDateInput.addEventListener('change', performSearch);
        endDateInput.addEventListener('change', performSearch);
    }

    // Reset filters button
    resetFiltersButton.addEventListener('click', resetAllFilters);
}

// Handle persona selection
function handlePersonaSelection(selectedCard) {
    const personaCards = document.querySelectorAll('.persona-card');
    const selectedPersona = selectedCard.dataset.persona;

    // Toggle selection
    if (selectedCard.classList.contains('active')) {
        selectedCard.classList.remove('active');
        recommendationEngine.updateFilters({ persona: null });
    } else {
        personaCards.forEach(card => card.classList.remove('active'));
        selectedCard.classList.add('active');
        recommendationEngine.updateFilters({ persona: selectedPersona });
    }

    performSearch();
}

// Handle category filter selection
function handleCategoryFilter(selectedChip) {
    const categoryFilters = document.querySelectorAll('.filter-chip');
    const selectedCategory = selectedChip.dataset.category;

    if (selectedCategory === 'alle') {
        // If "Alle" is selected, deselect all others
        categoryFilters.forEach(chip => chip.classList.remove('active'));
        selectedChip.classList.add('active');
    } else {
        // Remove "Alle" if any specific category is selected
        const alleChip = document.querySelector('.filter-chip[data-category="alle"]');
        alleChip.classList.remove('active');

        // Toggle the selected category
        selectedChip.classList.toggle('active');

        // If no categories are selected, activate "Alle"
        const activeCategories = document.querySelectorAll('.filter-chip.active');
        if (activeCategories.length === 0) {
            alleChip.classList.add('active');
        }
    }

    performSearch();
}

// Perform search with current filters
function performSearch() {
    // Get search text
    const searchText = searchInput.value.trim();

    // Get selected categories
    const activeCategories = Array.from(document.querySelectorAll('.filter-chip.active'))
        .map(chip => chip.dataset.category);

    // Get location filters
    const selectedLocations = Array.from(document.querySelectorAll('input[name="location"]:checked'))
        .map(checkbox => checkbox.value);

    // Get cost filters
    const selectedCosts = Array.from(document.querySelectorAll('input[name="cost"]:checked'))
        .map(checkbox => checkbox.value);

    // Get time filter
    const timeRange = timeFilterSelect.value;
    const customStart = document.getElementById('startDate')?.value || null;
    const customEnd = document.getElementById('endDate')?.value || null;

    // Update filters
    recommendationEngine.updateFilters({
        searchText,
        categories: activeCategories.length > 0 ? activeCategories : ['alle'],
        locations: selectedLocations,
        costs: selectedCosts,
        timeRange,
        customDateStart: customStart,
        customDateEnd: customEnd
    });

    // Get and display results
    currentResults = recommendationEngine.search();
    displayResults(currentResults);
    updateResultsInfo(currentResults.length);
}

// Display search results
function displayResults(results) {
    resultsGrid.innerHTML = '';

    if (results.length === 0) {
        noResultsDiv.style.display = 'block';
        return;
    }

    noResultsDiv.style.display = 'none';

    results.forEach(offer => {
        const card = createResultCard(offer);
        resultsGrid.appendChild(card);
    });
}

// Create a result card element
function createResultCard(offer) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.dataset.type = offer.type;

    // Determine location icon
    const locationIcon = {
        'vor-ort': '📍',
        'online': '💻',
        'hybrid': '🔄'
    }[offer.location] || '📍';

    // Determine cost icon
    const costIcon = offer.cost === 'kostenlos' ? '🆓' : '💶';

    // Build card HTML
    card.innerHTML = `
        <div class="card-header">
            <span class="card-type ${offer.type}">${CATEGORIES[offer.type]?.name || offer.type}</span>
        </div>
        <h3 class="card-title">${offer.title}</h3>
        <p class="card-description">${offer.description}</p>
        <div class="card-meta">
            <span class="meta-item">
                <span class="meta-icon">📅</span>
                ${formatDate(offer.date)}
            </span>
            ${offer.city ? `
                <span class="meta-item">
                    <span class="meta-icon">${locationIcon}</span>
                    ${offer.city}
                </span>
            ` : `
                <span class="meta-item">
                    <span class="meta-icon">${locationIcon}</span>
                    ${offer.location === 'online' ? 'Online' : offer.location === 'hybrid' ? 'Hybrid' : 'Vor Ort'}
                </span>
            `}
            <span class="meta-item">
                <span class="meta-icon">${costIcon}</span>
                ${offer.cost === 'kostenlos' ? 'Kostenlos' : 'Kostenpflichtig'}
            </span>
        </div>
        ${offer.tags.length > 0 ? `
            <div class="card-tags">
                ${offer.tags.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        ` : ''}
        <div class="card-footer">
            <span class="card-source">${offer.source}</span>
            <a href="${offer.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                Mehr erfahren →
            </a>
        </div>
    `;

    // Add click event to card (except when clicking the link)
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('card-link')) {
            window.open(offer.url, '_blank', 'noopener,noreferrer');
        }
    });

    return card;
}

// Update results info display
function updateResultsInfo(count) {
    resultsCount.textContent = `${count} Ergebnis${count !== 1 ? 'se' : ''} gefunden`;

    const filtersSummary = recommendationEngine.getActiveFiltersSummary();
    if (filtersSummary) {
        activeFiltersDisplay.textContent = filtersSummary;
    } else {
        activeFiltersDisplay.textContent = '';
    }
}

// Reset all filters
function resetAllFilters() {
    // Reset persona selection
    document.querySelectorAll('.persona-card').forEach(card => {
        card.classList.remove('active');
    });

    // Reset search input
    searchInput.value = '';

    // Reset category filters
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    document.querySelector('.filter-chip[data-category="alle"]').classList.add('active');

    // Reset location checkboxes
    document.querySelectorAll('input[name="location"]').forEach(checkbox => {
        checkbox.checked = true;
    });

    // Reset cost checkboxes
    document.querySelectorAll('input[name="cost"]').forEach(checkbox => {
        checkbox.checked = true;
    });

    // Reset time filter
    timeFilterSelect.value = 'naechster-monat';
    customDateRange.style.display = 'none';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';

    // Reset engine and perform search
    recommendationEngine.resetFilters();
    performSearch();
}

// Smooth scroll to results when search is performed
function scrollToResults() {
    const resultsSection = document.getElementById('resultsSection');
    if (resultsSection && window.innerWidth > 768) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add scroll to results after search (with a small delay)
const originalPerformSearch = performSearch;
performSearch = function() {
    originalPerformSearch();
    setTimeout(scrollToResults, 100);
};
