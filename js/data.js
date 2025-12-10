// Sample data structure for media recommendations
// In production, this would be loaded from a backend API or CMS

const OFFERS_DATA = [
    // Veranstaltungen
    {
        id: 1,
        type: 'veranstaltung',
        title: 'Blauer Panther Award 2025',
        description: 'Bayerischer Fernsehpreis für herausragende Produktionen in verschiedenen Kategorien. Eine der renommiertesten Auszeichnungen für Medienschaffende in Bayern.',
        date: '2025-03-15',
        location: 'vor-ort',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Film', 'TV', 'Award', 'Networking'],
        source: 'blauerpanther.com',
        url: 'https://blauerpanther.com/award/',
        personas: ['professional', 'gruender'],
        categories: ['veranstaltung', 'netzwerk']
    },
    {
        id: 2,
        type: 'veranstaltung',
        title: 'Games Bavaria Networking Event',
        description: 'Networking-Veranstaltung für Game-Entwickler, Publisher und Investoren. Austausch über aktuelle Trends und Technologien in der Games-Branche.',
        date: '2025-02-20',
        location: 'hybrid',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Games', 'Networking', 'Innovation'],
        source: 'games-bavaria.com',
        url: 'https://www.games-bavaria.com/',
        personas: ['professional', 'gruender', 'quereinsteiger'],
        categories: ['veranstaltung', 'netzwerk']
    },
    {
        id: 3,
        type: 'veranstaltung',
        title: 'XPLR Media Event: KI in der Medienproduktion',
        description: 'Digitales Event über den Einsatz von Künstlicher Intelligenz in der Medienproduktion. Mit Praxisbeispielen und Diskussionsrunden.',
        date: '2025-01-25',
        location: 'online',
        cost: 'kostenlos',
        tags: ['KI', 'Innovation', 'Medienproduktion'],
        source: 'xplr-media.com',
        url: 'https://www.xplr-media.com/',
        personas: ['professional', 'quereinsteiger', 'einsteiger'],
        categories: ['veranstaltung', 'weiterbildung']
    },
    {
        id: 4,
        type: 'veranstaltung',
        title: 'XR Hub Bavaria: VR/AR Workshop',
        description: 'Hands-on Workshop zu Virtual und Augmented Reality. Lernen Sie die neuesten Tools und Technologien kennen.',
        date: '2025-02-10',
        location: 'vor-ort',
        city: 'Nürnberg',
        cost: 'kostenpflichtig',
        tags: ['VR', 'AR', 'XR', 'Workshop'],
        source: 'xrhub-bavaria.de',
        url: 'https://xrhub-bavaria.de/events/',
        personas: ['professional', 'quereinsteiger', 'student'],
        categories: ['veranstaltung', 'weiterbildung']
    },
    {
        id: 5,
        type: 'veranstaltung',
        title: 'Start into Media: Karrieretag 2025',
        description: 'Karrieremesse für Einsteiger und Auszubildende in der Medienbranche. Mit Bewerbungstipps und Networking-Möglichkeiten.',
        date: '2025-03-01',
        location: 'vor-ort',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Karriere', 'Ausbildung', 'Networking'],
        source: 'startintomedia.de',
        url: 'https://www.startintomedia.de/',
        personas: ['einsteiger', 'student', 'quereinsteiger'],
        categories: ['veranstaltung', 'netzwerk']
    },
    {
        id: 6,
        type: 'veranstaltung',
        title: 'Medientage München 2025 - AI Media Special',
        description: 'Spezial-Event zu KI und Medien auf den Medientagen München. Experten diskutieren die Zukunft der Branche.',
        date: '2025-10-15',
        location: 'hybrid',
        city: 'München',
        cost: 'kostenpflichtig',
        tags: ['KI', 'Innovation', 'Zukunft', 'Medien'],
        source: 'medientage.de',
        url: 'https://medientage.de/',
        personas: ['professional', 'gruender'],
        categories: ['veranstaltung', 'weiterbildung']
    },

    // Förderprogramme
    {
        id: 7,
        type: 'foerderung',
        title: 'Games Bavaria Förderung',
        description: 'Finanzielle Unterstützung für Game-Entwickler in Bayern. Förderung von Konzeptentwicklung bis zur Produktion.',
        date: '2025-12-31',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Games', 'Förderung', 'Finanzierung'],
        source: 'games-bavaria.com',
        url: 'https://www.games-bavaria.com/foerderung-games-bavaria-angebot/',
        personas: ['gruender', 'professional'],
        categories: ['foerderung']
    },
    {
        id: 8,
        type: 'foerderung',
        title: 'Mediennetzwerk Bayern Förderungen',
        description: 'Verschiedene Förderprogramme für innovative Medienprojekte. Von der Idee bis zur Markteinführung.',
        date: '2025-12-31',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Förderung', 'Innovation', 'Startups'],
        source: 'mediennetzwerk-bayern.de',
        url: 'https://mediennetzwerk-bayern.de/foerderung/',
        personas: ['gruender', 'professional', 'quereinsteiger'],
        categories: ['foerderung']
    },
    {
        id: 9,
        type: 'foerderung',
        title: 'Media Lab Bayern Stipendien',
        description: 'Stipendienprogramm für innovative Medien-Startups. Inklusive Mentoring und Netzwerk.',
        date: '2025-06-30',
        location: 'hybrid',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Stipendium', 'Startups', 'Innovation'],
        source: 'media-lab.de',
        url: 'https://www.media-lab.de/de/angebote/',
        personas: ['gruender', 'professional'],
        categories: ['foerderung', 'weiterbildung']
    },

    // Weiterbildung & Angebote
    {
        id: 10,
        type: 'weiterbildung',
        title: 'Media Lab Bayern: Workshops & Seminare',
        description: 'Umfangreiches Weiterbildungsprogramm zu digitalen Medien, Entrepreneurship und Innovation.',
        date: '2025-12-31',
        location: 'hybrid',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Weiterbildung', 'Workshops', 'Innovation'],
        source: 'media-lab.de',
        url: 'https://www.media-lab.de/de/angebote/',
        personas: ['gruender', 'professional', 'quereinsteiger', 'student'],
        categories: ['weiterbildung']
    },
    {
        id: 11,
        type: 'weiterbildung',
        title: 'KI Kompetenzzentrum Medien',
        description: 'Schulungen und Beratung zum Einsatz von Künstlicher Intelligenz in der Medienbranche.',
        date: '2025-12-31',
        location: 'online',
        cost: 'kostenlos',
        tags: ['KI', 'Weiterbildung', 'Beratung'],
        source: 'medien-bayern.de',
        url: 'https://medien-bayern.de/ki-kompetenzzentrum-medien/',
        personas: ['professional', 'quereinsteiger', 'gruender'],
        categories: ['weiterbildung']
    },
    {
        id: 12,
        type: 'weiterbildung',
        title: 'Start into Media: Ausbildungsangebote',
        description: 'Informationen zu Ausbildungsmöglichkeiten in der Medienbranche. Für Azubis und Ausbilder.',
        date: '2025-12-31',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Ausbildung', 'Karriere', 'Einstieg'],
        source: 'startintomedia.de',
        url: 'https://www.startintomedia.de/fuer-ausbilder-innen',
        personas: ['einsteiger', 'student'],
        categories: ['weiterbildung']
    },

    // Netzwerk & ThinkTank
    {
        id: 13,
        type: 'netzwerk',
        title: 'Mediennetzwerk Bayern ThinkTank',
        description: 'Plattform für strategischen Austausch und Zusammenarbeit zwischen Medienschaffenden.',
        date: '2025-12-31',
        location: 'hybrid',
        cost: 'kostenlos',
        tags: ['Netzwerk', 'ThinkTank', 'Zusammenarbeit'],
        source: 'mediennetzwerk-bayern.de',
        url: 'https://mediennetzwerk-bayern.de/thinktank/',
        personas: ['professional', 'gruender'],
        categories: ['netzwerk']
    },
    {
        id: 14,
        type: 'veranstaltung',
        title: 'Mediennetzwerk Bayern: Quartalsmeeting',
        description: 'Regelmäßiges Networking-Event für Mitglieder des Mediennetzwerks Bayern.',
        date: '2025-03-28',
        location: 'vor-ort',
        city: 'München',
        cost: 'kostenlos',
        tags: ['Networking', 'Austausch', 'Mitglieder'],
        source: 'mediennetzwerk-bayern.de',
        url: 'https://mediennetzwerk-bayern.de/events/',
        personas: ['professional', 'gruender', 'quereinsteiger'],
        categories: ['veranstaltung', 'netzwerk']
    },

    // Weitere Events
    {
        id: 15,
        type: 'veranstaltung',
        title: 'Film & Pitch: Finanzierung für Filmprojekte',
        description: 'Workshop zu Finanzierungsmodellen für Film- und Videoproduktionen. Mit Pitch-Training.',
        date: '2025-02-15',
        location: 'vor-ort',
        city: 'München',
        cost: 'kostenpflichtig',
        tags: ['Film', 'Finanzierung', 'Pitch'],
        source: 'mediennetzwerk-bayern.de',
        url: 'https://mediennetzwerk-bayern.de/events/',
        personas: ['gruender', 'professional'],
        categories: ['veranstaltung', 'weiterbildung']
    },
    {
        id: 16,
        type: 'veranstaltung',
        title: 'Podcast Production Bootcamp',
        description: 'Intensivworkshop zur Podcast-Produktion: Von der Konzeption bis zur Veröffentlichung.',
        date: '2025-04-05',
        location: 'hybrid',
        city: 'Nürnberg',
        cost: 'kostenpflichtig',
        tags: ['Podcast', 'Audio', 'Produktion'],
        source: 'media-lab.de',
        url: 'https://www.media-lab.de/de/',
        personas: ['einsteiger', 'quereinsteiger', 'professional'],
        categories: ['veranstaltung', 'weiterbildung']
    },
    {
        id: 17,
        type: 'veranstaltung',
        title: 'Social Media Strategy für Medienprofis',
        description: 'Seminar zu Social-Media-Strategien speziell für die Medienbranche.',
        date: '2025-01-30',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Social Media', 'Marketing', 'Strategie'],
        source: 'medien-bayern.de',
        url: 'https://medien-bayern.de/',
        personas: ['professional', 'quereinsteiger', 'gruender'],
        categories: ['veranstaltung', 'weiterbildung']
    },
    {
        id: 18,
        type: 'weiterbildung',
        title: 'Streaming-Technologien Masterclass',
        description: 'Vertiefender Kurs zu modernen Streaming-Technologien und Live-Produktion.',
        date: '2025-05-12',
        location: 'vor-ort',
        city: 'München',
        cost: 'kostenpflichtig',
        tags: ['Streaming', 'Technologie', 'Live-Produktion'],
        source: 'xplr-media.com',
        url: 'https://www.xplr-media.com/',
        personas: ['professional', 'quereinsteiger'],
        categories: ['weiterbildung']
    },
    {
        id: 19,
        type: 'veranstaltung',
        title: 'Games Jam Weekend',
        description: '48-Stunden Game-Development-Marathon. Für alle Skill-Level geeignet.',
        date: '2025-03-21',
        location: 'vor-ort',
        city: 'Regensburg',
        cost: 'kostenlos',
        tags: ['Games', 'Hackathon', 'Entwicklung'],
        source: 'games-bavaria.com',
        url: 'https://www.games-bavaria.com/',
        personas: ['einsteiger', 'professional', 'student'],
        categories: ['veranstaltung']
    },
    {
        id: 20,
        type: 'publikation',
        title: 'Mediennetzwerk Bayern: Branchenstudie 2025',
        description: 'Aktuelle Studie zur Medienlandschaft in Bayern mit Trends und Entwicklungen.',
        date: '2025-01-15',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Studie', 'Trends', 'Branche'],
        source: 'mediennetzwerk-bayern.de',
        url: 'https://mediennetzwerk-bayern.de/',
        personas: ['professional', 'gruender', 'quereinsteiger'],
        categories: ['publikation']
    }
];

// Persona definitions with their characteristics
const PERSONAS = {
    einsteiger: {
        name: 'Einsteiger',
        description: 'Neu in der Medienbranche',
        interests: ['Ausbildung', 'Karriere', 'Grundlagen', 'Networking', 'Einstieg'],
        preferredTypes: ['weiterbildung', 'veranstaltung']
    },
    quereinsteiger: {
        name: 'Quereinsteiger',
        description: 'Aus einer anderen Branche',
        interests: ['Weiterbildung', 'Umschulung', 'Networking', 'Trends', 'Innovation'],
        preferredTypes: ['weiterbildung', 'veranstaltung', 'netzwerk']
    },
    professional: {
        name: 'Professional',
        description: 'Erfahrener Medienschaffender',
        interests: ['Innovation', 'Technologie', 'Networking', 'Trends', 'Weiterbildung'],
        preferredTypes: ['veranstaltung', 'weiterbildung', 'publikation', 'netzwerk']
    },
    gruender: {
        name: 'Gründer',
        description: 'Unternehmer im Medienbereich',
        interests: ['Förderung', 'Finanzierung', 'Startups', 'Innovation', 'Networking', 'Pitch'],
        preferredTypes: ['foerderung', 'veranstaltung', 'netzwerk']
    },
    student: {
        name: 'Student',
        description: 'In Ausbildung oder Studium',
        interests: ['Ausbildung', 'Karriere', 'Praktikum', 'Workshop', 'Stipendium'],
        preferredTypes: ['weiterbildung', 'veranstaltung', 'foerderung']
    }
};

// Category definitions
const CATEGORIES = {
    alle: { name: 'Alle', color: '#6C757D' },
    veranstaltung: { name: 'Veranstaltungen', color: '#FF6B00' },
    foerderung: { name: 'Förderprogramme', color: '#28A745' },
    publikation: { name: 'Publikationen', color: '#00A0DC' },
    weiterbildung: { name: 'Weiterbildung', color: '#FFC107' },
    netzwerk: { name: 'Netzwerk', color: '#0066B3' }
};
