# Medien.Bayern Empfehlungssystem v2.0 (React)

Vollständig überarbeitetes Empfehlungssystem mit React, Tailwind CSS und minimalistischem Schwarz-Weiß-Design.

## 🚀 Neue Features

### Design & UX
- **Minimalistisches Design**: Schwarz-Weiß-Ästhetik im "Designagentur-Style"
- **Key Visual**: Horizontale schwarze Balken als wiederkehrendes Design-Element
- **Responsive**: Mobile-First-Ansatz mit perfekter Tablet/Desktop-Optimierung
- **Moderne Typografie**: Inter-Schriftfamilie mit klarer Hierarchie

### Technologie-Stack
- ⚛️ **React 18**: Moderne Komponentenarchitektur
- 🎨 **Tailwind CSS**: Utility-First-Styling
- ⚡ **Vite**: Ultra-schneller Build-Tool
- 📊 **PapaParse**: CSV-Datenverarbeitung

### Funktionen
- ✅ **CSV-Upload**: Eigene Daten hochladen und verarbeiten
- ✅ **5 Personas**: Einsteiger, Quereinsteiger, Professional, Gründer, Student
- ✅ **Intelligente Filter**: Kategorien, Ort, Kosten, Zeitraum
- ✅ **Echtzeit-Suche**: Sofortige Ergebnis-Filterung
- ✅ **Optimierte Darstellung**: Angepasst an verschiedene Angebotstypen

## 📦 Installation & Entwicklung

### Voraussetzungen
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Lokale Entwicklung

1. **Dependencies installieren**
```bash
npm install
```

2. **Development Server starten**
```bash
npm run dev
```
Öffne [http://localhost:5173](http://localhost:5173)

3. **Build für Produktion**
```bash
npm run build
```

4. **Produktions-Build testen**
```bash
npm run preview
```

## 📁 Projektstruktur

```
src/
├── components/           # React-Komponenten
│   ├── Header.jsx       # Navigation
│   ├── Hero.jsx         # Hero-Section
│   ├── PersonaSelector.jsx  # Persona-Auswahl
│   ├── SearchBar.jsx    # Suchleiste
│   ├── FilterPanel.jsx  # Filter-UI
│   ├── ResultsGrid.jsx  # Ergebnisdarstellung
│   ├── OfferCard.jsx    # Einzelnes Angebot
│   ├── CSVUpload.jsx    # CSV-Upload
│   └── Footer.jsx       # Footer
├── utils/
│   ├── filterEngine.js  # Filter-Logik
│   └── csvParser.js     # CSV-Verarbeitung
├── data/
│   └── sampleOffers.js  # Beispiel-Daten
├── App.jsx              # Haupt-App
├── main.jsx             # React Entry Point
└── index.css            # Tailwind & Custom CSS
```

## 📊 CSV-Datenformat

### Erforderliche Spalten

| Spalte | Beschreibung | Beispiel |
|--------|-------------|----------|
| `Typ` | veranstaltung, foerderung, publikation, weiterbildung, netzwerk | veranstaltung |
| `Titel` | Name des Angebots | "KI in der Medienproduktion" |
| `Beschreibung` | Kurzbeschreibung | "Workshop zu KI-Tools..." |
| `Datum` | YYYY-MM-DD Format | 2025-06-15 |
| `Ort` | vor-ort, online, hybrid | online |
| `Stadt` | Ortsname (optional) | München |
| `Kosten` | kostenlos, kostenpflichtig | kostenlos |
| `Tags` | Komma-getrennt | "KI, Innovation, Workshop" |
| `Quelle` | Website-Name | media-lab.de |
| `URL` | Vollständiger Link | https://... |
| `Zielgruppe` | Personas | "Professional, Gründer" |
| `Kategorien` | Komma-getrennt | "veranstaltung, weiterbildung" |

### CSV-Vorlage herunterladen

Die App bietet eine Download-Funktion für eine CSV-Vorlage direkt in der UI.

## 🎨 Design-Prinzipien

### Farben
```css
/* Primär */
--black: #000000
--white: #FFFFFF

/* Graustufen */
--gray-50: #F4F4F5
--gray-100: #E5E7EB
--gray-200: #D1D5DB

/* Akzentfarben (sparsam einsetzen) */
--accent-yellow: #FCD34D
--accent-blue: #3B82F6
--accent-turquoise: #14B8A6
```

### Typografie
- **Font Family**: Inter
- **Headlines**: VERSALIEN (uppercase), extra Letterspacing
- **Body**: 16-18px, line-height 1.6
- **Hierarchie**: H1 sehr groß, H2/H3 reduziert

### Layout
- **Max-Width**: 1200px (7xl Container)
- **Spacing**: Großzügig (py-20, gap-8)
- **Grid**: 2-4 Spalten je nach Breakpoint
- **Buttons**: Rounded-full, klare Hover-States

## 🔧 Anpassung

### Farben ändern

Bearbeite `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      accent: {
        yellow: '#IHR-GELB',
        blue: '#IHR-BLAU',
      }
    }
  }
}
```

### Personas anpassen

Bearbeite `src/components/PersonaSelector.jsx`:
```jsx
const personas = [
  {
    id: 'neue-persona',
    icon: '🎯',
    name: 'Neue Persona',
    description: 'Beschreibung',
  },
  // ...
];
```

### Filter-Logik anpassen

Bearbeite `src/utils/filterEngine.js` für custom Scoring-Algorithmen.

## 🚀 Deployment

### GitHub Pages (Automatisch)

1. Push auf Branch `claude/media-recommendation-system-01X61uRWDeKtavDrejW1db24`
2. GitHub Actions baut und deployt automatisch
3. Live unter: `https://smacpro.github.io/20251210_VC-Project01/`

### Netlify

```bash
npm run build
# dist/ Ordner zu Netlify hochladen
```

### Vercel

```bash
npm i -g vercel
vercel
```

## 📚 Komponenten-API

### RecommendationSystem

```jsx
<RecommendationSystem offers={offersArray} />
```

Props:
- `offers`: Array von Angebots-Objekten

### CSVUpload

```jsx
<CSVUpload onDataLoaded={(newOffers) => setOffers(newOffers)} />
```

Props:
- `onDataLoaded`: Callback mit geparsten Daten

### PersonaSelector

```jsx
<PersonaSelector
  selected={selectedPersona}
  onSelect={setSelectedPersona}
/>
```

Props:
- `selected`: Aktuell ausgewählte Persona (string|null)
- `onSelect`: Callback bei Auswahl

## 🐛 Troubleshooting

### Build-Fehler

```bash
# Cache löschen
rm -rf node_modules package-lock.json
npm install

# Neu builden
npm run build
```

### CSS wird nicht angezeigt

- Prüfe ob Tailwind-Config korrekt ist
- Stelle sicher, dass `index.css` importiert wird
- Überprüfe Browser-Console auf Fehler

### CSV-Upload funktioniert nicht

- Überprüfe Datei-Format (UTF-8, CSV)
- Kontrolliere Spaltennamen (siehe Dokumentation)
- Console-Log in `csvParser.js` aktivieren

## 🔄 Migration von v1.0

Die alte Vanilla-JS-Version ist noch vorhanden:
- `index.html` (alt)
- `js/` und `css/` Ordner (alt)

Die neue React-Version nutzt:
- `index-react.html` (neu)
- `src/` Ordner (neu)

Beide Versionen können parallel existieren.

## 📖 Weitere Dokumentation

- [INTEGRATION.md](INTEGRATION.md) - Integrations-Anleitungen
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment-Optionen
- [CHANGELOG.md](CHANGELOG.md) - Versions-Historie

## 🤝 Beitragen

1. Fork das Repository
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 Lizenz

Entwickelt für Medien.Bayern GmbH

---

**Version 2.0** - Vollständiges React-Rewrite mit minimalistischem Design

Entwickelt mit ❤️ für die bayerische Medienlandschaft
