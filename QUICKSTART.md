# Quick Start Guide

## In 5 Minuten zum laufenden System

### Schritt 1: Dateien hochladen

Laden Sie alle Dateien auf Ihren Webserver:

```
/ihr-webverzeichnis/empfehlungssystem/
├── index.html
├── css/styles.css
├── js/app.js
├── js/search.js
└── js/data.js
```

### Schritt 2: Testen

Öffnen Sie in Ihrem Browser:
```
https://ihre-domain.de/empfehlungssystem/index.html
```

### Schritt 3: Auf Ihrer Website einbinden

Fügen Sie auf Ihrer Zielseite ein:

```html
<iframe
    src="/empfehlungssystem/index.html"
    width="100%"
    height="1400px"
    frameborder="0">
</iframe>
```

**Fertig!** 🎉

## Anpassungen

### Daten aktualisieren

Bearbeiten Sie `js/data.js` und fügen Sie neue Angebote hinzu:

```javascript
const OFFERS_DATA = [
    {
        id: 21,
        type: 'veranstaltung',
        title: 'Ihr Event',
        description: 'Beschreibung...',
        date: '2025-03-15',
        location: 'online',
        cost: 'kostenlos',
        tags: ['Tag1', 'Tag2'],
        source: 'ihre-website.de',
        url: 'https://ihre-website.de/event',
        personas: ['professional'],
        categories: ['veranstaltung']
    }
];
```

### Farben anpassen

Bearbeiten Sie in `css/styles.css`:

```css
:root {
    --primary-color: #IHR-FARBCODE;
    --secondary-color: #IHR-FARBCODE;
}
```

### Logo hinzufügen

In `index.html` im Header:

```html
<header class="header">
    <div class="header-content">
        <img src="/pfad/zu/logo.png" alt="Logo" style="height: 50px;">
        <h1>Empfehlungssystem für Medienschaffende</h1>
    </div>
</header>
```

## Erweiterte Integration

Für detaillierte Integrations-Optionen siehe:
- [INTEGRATION.md](INTEGRATION.md) - Vollständige Integrations-Anleitung
- [README.md](README.md) - Projekt-Dokumentation

## Support

- GitHub Issues: [Repository-Link]
- E-Mail: support@medien-bayern.de

## Checkliste

- [ ] Dateien auf Server hochgeladen
- [ ] System im Browser getestet
- [ ] Daten angepasst (optional)
- [ ] Farben angepasst (optional)
- [ ] Auf Website integriert
- [ ] Mobile Ansicht getestet

**Fertig!** Ihr Empfehlungssystem ist jetzt einsatzbereit.
