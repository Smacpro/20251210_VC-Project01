# Empfehlungssystem für Medienschaffende Bayern

Ein intelligentes Empfehlungssystem für die Integration in die Website www.medien-bayern.de, das Medienschaffenden hilft, passende Veranstaltungen, Förderprogramme und Publikationen zu finden.

## 🚀 Live Demo

**Demo-URL:** `https://smacpro.github.io/20251210_VC-Project01/`

Das System ist auf GitHub Pages deployed und kann sofort getestet werden!

## 🎯 Projektübersicht

Dieses System wurde entwickelt, um Medienschaffende in Bayern – von Einsteigern über Quereinsteiger bis hin zu Professionals – bei der Vernetzung, Weiterbildung und Entwicklung ihrer Geschäftsideen zu unterstützen.

### Kernfunktionen

✅ **Freitextsuche** - Flexible Suche nach Begriffen, Themen und Schlagworten
✅ **Kategoriefilter** - Filterung nach Veranstaltungen, Förderung, Publikationen, etc.
✅ **Persona-System** - 5 vordefinierte Nutzerprofile für personalisierte Empfehlungen
✅ **Erweiterte Filter** - Nach Zeit, Ort (vor Ort/online/hybrid) und Kosten
✅ **Responsive Design** - Optimiert für Desktop, Tablet und Mobile
✅ **Einfache Integration** - Modularer Aufbau für nahtlose Einbindung

## 📋 Inhaltsverzeichnis

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Technologie-Stack](#-technologie-stack)
- [Installation](#-installation)
- [Verwendung](#-verwendung)
- [Integration](#-integration-in-bestehende-website)
- [Deployment](#-deployment)
- [Datenstruktur](#-datenstruktur)
- [Anpassung](#-anpassung)
- [Browser-Kompatibilität](#-browser-kompatibilität)

## ✨ Features

### 1. Persona-basierte Empfehlungen

Das System bietet 5 vordefinierte Personas:

- **🎓 Einsteiger** - Neu in der Medienbranche
- **🔄 Quereinsteiger** - Aus einer anderen Branche
- **💼 Professional** - Erfahrener Medienschaffender
- **🚀 Gründer** - Unternehmer im Medienbereich
- **📚 Student** - In Ausbildung oder Studium

Jede Persona erhält personalisierte Empfehlungen basierend auf:
- Relevanten Themengebieten
- Bevorzugten Angebotstypen
- Karrierestufe und Zielen

### 2. Intelligente Suche

- **Volltextsuche** über Titel, Beschreibungen, Tags und Quellen
- **Relevanz-Scoring** für personalisierte Ergebnisse
- **Echtzeit-Filterung** ohne Neuladen der Seite

### 3. Umfangreiche Filtermöglichkeiten

#### Kategorien
- Veranstaltungen
- Förderprogramme
- Publikationen
- Weiterbildung
- Netzwerk

#### Zeitraum
- Nächste Woche
- Nächster Monat
- Nächste 3 Monate
- Benutzerdefinierter Zeitraum

#### Veranstaltungsort
- Vor Ort
- Online
- Hybrid

#### Kosten
- Kostenlos
- Kostenpflichtig

### 4. Optimierte Ergebnisdarstellung

Jedes Suchergebnis zeigt:
- **Typ-Indikator** (farbcodiert)
- **Titel & Beschreibung**
- **Datum & Ort**
- **Kosten-Information**
- **Themen-Tags**
- **Quell-Website**
- **Direkt-Link**

## 🛠 Technologie-Stack

- **HTML5** - Semantisches Markup
- **CSS3** - Modernes, responsives Design mit CSS Grid und Flexbox
- **Vanilla JavaScript (ES6+)** - Keine Abhängigkeiten, keine Frameworks
- **JSON** - Datenstruktur für Angebote

### Warum Vanilla JavaScript?

- 🚀 **Performance** - Keine Framework-Overhead
- 📦 **Lightweight** - Minimale Dateigröße
- 🔧 **Wartbar** - Einfach zu verstehen und anzupassen
- 🔌 **Integration** - Problemlose Einbindung in bestehende Systeme

## 📥 Installation

### Lokale Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd 20251210_VC-Project01
```

2. Öffnen Sie `index.html` in einem Browser oder starten Sie einen lokalen Server:

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

3. Öffnen Sie im Browser: `http://localhost:8000`

### Projektstruktur

```
20251210_VC-Project01/
├── index.html              # Haupt-HTML-Datei
├── css/
│   └── styles.css          # Stylesheet
├── js/
│   ├── app.js              # Hauptlogik und UI-Interaktion
│   ├── search.js           # Suchlogik und Filter-Engine
│   └── data.js             # Daten und Konfiguration
├── assets/
│   └── images/             # Bilder und Assets
├── README.md               # Diese Datei
└── INTEGRATION.md          # Integrations-Anleitung
```

## 🚀 Verwendung

### Grundlegende Verwendung

1. **Persona auswählen** (optional)
   - Klicken Sie auf eine der 5 Persona-Karten
   - Erhalten Sie personalisierte Empfehlungen

2. **Freitextsuche**
   - Geben Sie Suchbegriffe ein (z.B. "KI", "Film", "Förderung")
   - Drücken Sie Enter oder klicken Sie auf "Suchen"

3. **Filter anwenden**
   - Wählen Sie Kategorien aus
   - Öffnen Sie "Erweiterte Filter" für mehr Optionen
   - Setzen Sie Zeitraum, Ort und Kostenfilter

4. **Ergebnisse durchsuchen**
   - Klicken Sie auf eine Karte für mehr Details
   - Nutzen Sie "Mehr erfahren" für die Quell-Website

## 🔌 Integration in bestehende Website

### Option 1: iFrame-Integration (Einfach)

```html
<iframe
    src="/pfad/zum/empfehlungssystem/index.html"
    width="100%"
    height="1200px"
    frameborder="0"
    title="Empfehlungssystem">
</iframe>
```

### Option 2: Direkte Integration (Empfohlen)

```html
<!-- 1. CSS einbinden -->
<link rel="stylesheet" href="/pfad/zu/css/styles.css">

<!-- 2. Container einfügen -->
<div id="recommendation-system">
    <!-- HTML-Inhalt aus index.html hier einfügen -->
</div>

<!-- 3. JavaScript einbinden -->
<script src="/pfad/zu/js/data.js"></script>
<script src="/pfad/zu/js/search.js"></script>
<script src="/pfad/zu/js/app.js"></script>
```

### Option 3: Als Widget

```html
<!-- Widget Container -->
<div id="media-recommendations"></div>

<!-- Widget Script -->
<script src="/pfad/zu/widget.js"></script>
<script>
  MediaRecommendations.init({
    container: '#media-recommendations',
    defaultPersona: 'professional',
    maxResults: 20
  });
</script>
```

Detaillierte Integrations-Anleitungen finden Sie in [INTEGRATION.md](INTEGRATION.md).

## 📊 Datenstruktur

### Angebot-Objekt

```javascript
{
    id: 1,
    type: 'veranstaltung',              // veranstaltung, foerderung, publikation, weiterbildung, netzwerk
    title: 'Titel der Veranstaltung',
    description: 'Beschreibung...',
    date: '2025-03-15',                 // YYYY-MM-DD Format
    location: 'vor-ort',                // vor-ort, online, hybrid
    city: 'München',                    // optional
    cost: 'kostenlos',                  // kostenlos, kostenpflichtig
    tags: ['Tag1', 'Tag2'],             // Schlagworte
    source: 'beispiel.de',              // Quell-Website
    url: 'https://beispiel.de',         // Link zur Quelle
    personas: ['professional', 'gruender'],  // Zielgruppen
    categories: ['veranstaltung', 'netzwerk']  // Kategorien
}
```

### Daten aktualisieren

Bearbeiten Sie die Datei `js/data.js`:

```javascript
const OFFERS_DATA = [
    // Fügen Sie neue Angebote hier hinzu
    {
        id: 21,
        type: 'veranstaltung',
        title: 'Neue Veranstaltung',
        // ... weitere Felder
    }
];
```

## 🎨 Anpassung

### Farben ändern

Bearbeiten Sie die CSS-Variablen in `css/styles.css`:

```css
:root {
    --primary-color: #0066B3;        /* Hauptfarbe */
    --secondary-color: #00A0DC;      /* Sekundärfarbe */
    --accent-color: #FF6B00;         /* Akzentfarbe */
    /* ... weitere Farben */
}
```

### Personas anpassen

Bearbeiten Sie `js/data.js`:

```javascript
const PERSONAS = {
    meine-persona: {
        name: 'Meine Persona',
        description: 'Beschreibung',
        interests: ['Interesse1', 'Interesse2'],
        preferredTypes: ['veranstaltung', 'weiterbildung']
    }
};
```

### Kategorien anpassen

```javascript
const CATEGORIES = {
    'meine-kategorie': {
        name: 'Meine Kategorie',
        color: '#FF5733'
    }
};
```

## 🌐 Browser-Kompatibilität

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)
- ⚠️ Internet Explorer (nicht unterstützt)

## 📱 Responsive Design

Das System ist vollständig responsive und optimiert für:
- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1025px+)

## 🔄 Datenquellen

Das System aggregiert Inhalte von folgenden Quellen:

- [Blauer Panther Award](https://blauerpanther.com/award/)
- [Games Bavaria](https://www.games-bavaria.com/)
- [Mediennetzwerk Bayern](https://mediennetzwerk-bayern.de/)
- [Media Lab Bayern](https://www.media-lab.de/)
- [KI Kompetenzzentrum Medien](https://medien-bayern.de/ki-kompetenzzentrum-medien/)
- [XPLR Media](https://www.xplr-media.com/)
- [XR Hub Bavaria](https://xrhub-bavaria.de/)
- [Start into Media](https://www.startintomedia.de/)
- [Medientage München](https://medientage.de/)

## 🚀 Deployment

### GitHub Pages (Automatisch)

Das Projekt ist für automatisches Deployment auf GitHub Pages konfiguriert.

**Live Demo:** `https://smacpro.github.io/20251210_VC-Project01/`

#### Setup

1. **GitHub Pages aktivieren**
   - Gehen Sie zu Repository Settings → Pages
   - Source: **GitHub Actions**

2. **Automatisches Deployment**
   - Bei jedem Push wird automatisch deployed
   - Oder manuell über den Actions Tab

3. **Ihre Seite ist live!**
   ```
   https://<username>.github.io/20251210_VC-Project01/
   ```

Detaillierte Anleitung: [DEPLOYMENT.md](DEPLOYMENT.md)

### Alternative Deployment-Optionen

- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)
- **Vercel**: `npx vercel`
- **Eigener Server**: Dateien hochladen und fertig!

## 🚧 Erweiterungsmöglichkeiten

### Backend-Integration

Für eine produktive Nutzung empfehlen wir:

1. **API-Integration**
   - Ersetzen Sie `OFFERS_DATA` durch API-Calls
   - Implementieren Sie Caching
   - Fügen Sie Fehlerbehandlung hinzu

2. **CMS-Integration**
   - WordPress/Drupal/Typo3 Plugin
   - Automatische Daten-Synchronisation
   - Admin-Interface für Datenpflege

3. **Analytics**
   - Tracking von Suchanfragen
   - Beliebtheits-Metriken
   - Nutzerverhalten analysieren

4. **Erweiterte Features**
   - E-Mail-Benachrichtigungen
   - Favoriten/Merkliste
   - Kalender-Export
   - Social Sharing

## 📝 Lizenz

Dieses Projekt wurde entwickelt für Medien Bayern.

## 🤝 Kontakt & Support

Bei Fragen oder Problemen:
- Erstellen Sie ein Issue im Repository
- Kontaktieren Sie das Entwicklerteam

## 📚 Weitere Dokumentation

- [QUICKSTART.md](QUICKSTART.md) - 5-Minuten Quick-Start Guide
- [INTEGRATION.md](INTEGRATION.md) - Detaillierte Integrations-Anleitung
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment-Anleitung (GitHub Pages, Netlify, etc.)
- [CHANGELOG.md](CHANGELOG.md) - Versions-Historie und Roadmap

---

Entwickelt mit ❤️ für die bayerische Medienlandschaft
