# Integrations-Anleitung für das Medien Bayern Empfehlungssystem

Diese Anleitung beschreibt detailliert, wie Sie das Empfehlungssystem in Ihre bestehende Website integrieren können.

## 📋 Inhaltsverzeichnis

1. [Vorbereitung](#vorbereitung)
2. [Integrationsmethoden](#integrationsmethoden)
3. [WordPress Integration](#wordpress-integration)
4. [JavaScript Framework Integration](#javascript-framework-integration)
5. [Styling anpassen](#styling-anpassen)
6. [Backend-Integration](#backend-integration)
7. [Troubleshooting](#troubleshooting)

## Vorbereitung

### Systemanforderungen

- Moderner Webserver (Apache, Nginx, IIS)
- Unterstützung für statische Dateien (HTML, CSS, JS)
- Optional: Backend für dynamische Daten (PHP, Node.js, Python)

### Dateien vorbereiten

1. Laden Sie alle Projektdateien auf Ihren Server
2. Stellen Sie sicher, dass die Pfadstruktur erhalten bleibt:
   ```
   /empfehlungssystem/
   ├── index.html
   ├── css/styles.css
   ├── js/app.js
   ├── js/search.js
   └── js/data.js
   ```

## Integrationsmethoden

### Methode 1: Standalone-Seite (Einfachste Methode)

**Geeignet für:** Schnelle Implementierung, separate Unterseite

1. Laden Sie alle Dateien in einen Ordner auf Ihrem Server
2. Verlinken Sie auf die `index.html` von Ihrer Hauptseite

```html
<a href="/empfehlungssystem/index.html">Zum Empfehlungssystem</a>
```

**Vorteile:**
- ✅ Schnellste Implementierung
- ✅ Keine Anpassungen nötig
- ✅ Vollständige Funktionalität

**Nachteile:**
- ❌ Separate Seite
- ❌ Kein einheitliches Layout mit Hauptseite

---

### Methode 2: iFrame-Integration (Einfach)

**Geeignet für:** Schnelle Integration, wenn Design-Anpassungen nicht kritisch sind

```html
<!-- In Ihrer Seite -->
<div class="recommendation-container">
    <iframe
        src="/empfehlungssystem/index.html"
        width="100%"
        height="1400px"
        frameborder="0"
        scrolling="auto"
        title="Empfehlungssystem für Medienschaffende"
        loading="lazy">
    </iframe>
</div>

<style>
.recommendation-container {
    max-width: 1200px;
    margin: 0 auto;
}

.recommendation-container iframe {
    display: block;
    border: none;
}
</style>
```

**Responsive iFrame:**

```html
<div class="recommendation-iframe-wrapper">
    <iframe src="/empfehlungssystem/index.html"></iframe>
</div>

<style>
.recommendation-iframe-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 120%; /* Höhe anpassen */
}

.recommendation-iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
```

**Vorteile:**
- ✅ Einfache Integration
- ✅ Isoliertes Styling
- ✅ Schnelle Implementierung

**Nachteile:**
- ❌ SEO-Einschränkungen
- ❌ Höhe muss manuell angepasst werden
- ❌ Eingeschränkte Kommunikation mit Hauptseite

---

### Methode 3: Direkte Integration (Empfohlen)

**Geeignet für:** Vollständige Kontrolle, bestes Nutzererlebnis

#### Schritt 1: CSS einbinden

Fügen Sie im `<head>` Ihrer Seite hinzu:

```html
<link rel="stylesheet" href="/empfehlungssystem/css/styles.css">
```

#### Schritt 2: HTML-Struktur einfügen

Kopieren Sie den Inhalt aus `index.html` (ohne `<head>` und `<body>` Tags):

```html
<!-- In Ihrer Seite, wo das System erscheinen soll -->
<div id="recommendation-system-container">
    <section class="persona-section">
        <!-- Persona-Auswahl -->
        <!-- ... HTML aus index.html ... -->
    </section>

    <section class="search-section">
        <!-- Suche -->
        <!-- ... HTML aus index.html ... -->
    </section>

    <!-- ... weitere Sektionen ... -->
</div>
```

#### Schritt 3: JavaScript einbinden

Vor dem schließenden `</body>` Tag:

```html
<script src="/empfehlungssystem/js/data.js"></script>
<script src="/empfehlungssystem/js/search.js"></script>
<script src="/empfehlungssystem/js/app.js"></script>
```

#### Schritt 4: CSS-Namensraum (Optional)

Um Konflikte mit bestehendem CSS zu vermeiden:

```css
/* In Ihrer CSS-Datei */
#recommendation-system-container {
    /* Isolieren Sie das Styling */
    all: initial;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#recommendation-system-container * {
    box-sizing: border-box;
}
```

**Vorteile:**
- ✅ Vollständige Kontrolle
- ✅ Beste Performance
- ✅ SEO-freundlich
- ✅ Anpassbar

**Nachteile:**
- ❌ Mehr Aufwand
- ❌ Mögliche CSS-Konflikte

---

### Methode 4: Widget-Integration (Für Fortgeschrittene)

Erstellen Sie ein initialisierendes Widget-Script:

```javascript
// widget.js
(function() {
    const MediaRecommendations = {
        init: function(config) {
            const defaults = {
                container: '#media-recommendations',
                defaultPersona: null,
                maxResults: 20,
                showHeader: true
            };

            const settings = { ...defaults, ...config };

            // Lade CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = '/empfehlungssystem/css/styles.css';
            document.head.appendChild(cssLink);

            // Lade Scripts
            const scripts = [
                '/empfehlungssystem/js/data.js',
                '/empfehlungssystem/js/search.js',
                '/empfehlungssystem/js/app.js'
            ];

            scripts.forEach((src, index) => {
                const script = document.createElement('script');
                script.src = src;
                if (index === scripts.length - 1) {
                    script.onload = () => this.render(settings);
                }
                document.body.appendChild(script);
            });
        },

        render: function(settings) {
            const container = document.querySelector(settings.container);
            // Rendere UI...
        }
    };

    window.MediaRecommendations = MediaRecommendations;
})();
```

**Verwendung:**

```html
<div id="media-recommendations"></div>
<script src="/empfehlungssystem/widget.js"></script>
<script>
    MediaRecommendations.init({
        container: '#media-recommendations',
        defaultPersona: 'professional'
    });
</script>
```

---

## WordPress Integration

### Option 1: Als Seiten-Template

1. Erstellen Sie ein neues Template in Ihrem Theme:

```php
<?php
/**
 * Template Name: Empfehlungssystem
 */

get_header(); ?>

<div class="content-area">
    <main id="main" class="site-main">
        <?php while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                </header>

                <div class="entry-content">
                    <?php the_content(); ?>

                    <!-- Empfehlungssystem -->
                    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/css/styles.css">

                    <div id="recommendation-system">
                        <!-- HTML hier einfügen -->
                    </div>

                    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/data.js"></script>
                    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/search.js"></script>
                    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/app.js"></script>
                </div>
            </article>
        <?php endwhile; ?>
    </main>
</div>

<?php get_footer(); ?>
```

2. Erstellen Sie eine neue Seite und wählen Sie das Template "Empfehlungssystem"

### Option 2: Als Shortcode

```php
// In functions.php

function medien_recommendation_system_shortcode() {
    ob_start();
    ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/css/styles.css">

    <div id="recommendation-system">
        <!-- HTML hier -->
    </div>

    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/data.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/search.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/empfehlungssystem/js/app.js"></script>
    <?php
    return ob_get_clean();
}
add_shortcode('medien_recommendations', 'medien_recommendation_system_shortcode');
```

**Verwendung:**
```
[medien_recommendations]
```

### Option 3: Als Gutenberg Block

```javascript
// In einem Custom Plugin oder Theme
wp.blocks.registerBlockType('medien-bayern/recommendations', {
    title: 'Empfehlungssystem',
    icon: 'search',
    category: 'widgets',
    edit: () => {
        return wp.element.createElement('div', {}, 'Empfehlungssystem (Vorschau)');
    },
    save: () => {
        return wp.element.createElement('div', {
            className: 'medien-recommendations-block'
        });
    }
});
```

---

## JavaScript Framework Integration

### React Integration

```jsx
import React, { useEffect } from 'react';
import '/pfad/zu/css/styles.css';

function RecommendationSystem() {
    useEffect(() => {
        // Lade Scripts dynamisch
        const scripts = [
            '/pfad/zu/js/data.js',
            '/pfad/zu/js/search.js',
            '/pfad/zu/js/app.js'
        ];

        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });

        return () => {
            // Cleanup
            scripts.forEach(src => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) script.remove();
            });
        };
    }, []);

    return (
        <div id="recommendation-system">
            {/* HTML hier einfügen */}
        </div>
    );
}

export default RecommendationSystem;
```

### Vue.js Integration

```vue
<template>
    <div id="recommendation-system">
        <!-- HTML hier -->
    </div>
</template>

<script>
export default {
    name: 'RecommendationSystem',
    mounted() {
        // CSS laden
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/pfad/zu/css/styles.css';
        document.head.appendChild(link);

        // Scripts laden
        const scripts = [
            '/pfad/zu/js/data.js',
            '/pfad/zu/js/search.js',
            '/pfad/zu/js/app.js'
        ];

        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
        });
    }
};
</script>
```

---

## Styling anpassen

### Farben an Ihre Website anpassen

```css
/* Überschreiben Sie CSS-Variablen */
#recommendation-system-container {
    --primary-color: #IHR-FARBCODE;
    --secondary-color: #IHR-FARBCODE;
    --accent-color: #IHR-FARBCODE;
}
```

### Typography anpassen

```css
#recommendation-system-container {
    font-family: 'Ihre-Schriftart', sans-serif;
}
```

### Layout anpassen

```css
/* Maximale Breite ändern */
.container {
    max-width: 1400px; /* statt 1200px */
}

/* Abstände anpassen */
section {
    padding: 40px; /* statt 30px */
    margin-bottom: 40px; /* statt 30px */
}
```

---

## Backend-Integration

### API-Endpunkt erstellen

**PHP Beispiel:**

```php
<?php
// api/recommendations.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Datenbank-Verbindung
$pdo = new PDO('mysql:host=localhost;dbname=medien', 'user', 'pass');

// Query
$stmt = $pdo->prepare("
    SELECT * FROM offers
    WHERE date >= CURDATE()
    ORDER BY date ASC
");
$stmt->execute();
$offers = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($offers);
?>
```

### JavaScript anpassen für API

```javascript
// In js/app.js

// Ersetzen Sie die statische OFFERS_DATA durch API-Call
async function loadOffers() {
    try {
        const response = await fetch('/api/recommendations.php');
        const data = await response.json();

        recommendationEngine = new RecommendationEngine(data);
        performSearch();
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        // Fallback auf statische Daten
        recommendationEngine = new RecommendationEngine(OFFERS_DATA);
        performSearch();
    }
}

// Beim DOM-Load aufrufen
document.addEventListener('DOMContentLoaded', loadOffers);
```

---

## Troubleshooting

### Problem: CSS wird nicht geladen

**Lösung:**
- Überprüfen Sie die Pfade in den `<link>` Tags
- Stellen Sie sicher, dass der Server CSS-Dateien ausliefert
- Prüfen Sie Browser-Console auf Fehler

### Problem: JavaScript-Fehler

**Lösung:**
- Stellen Sie sicher, dass Scripts in der richtigen Reihenfolge geladen werden
- `data.js` → `search.js` → `app.js`
- Überprüfen Sie Browser-Console auf Fehlermeldungen

### Problem: Styling-Konflikte

**Lösung:**
- Verwenden Sie CSS-Namensraum (siehe Methode 3)
- Erhöhen Sie CSS-Spezifität:
  ```css
  #recommendation-system-container .persona-card { /* ... */ }
  ```
- Verwenden Sie `!important` nur als letztes Mittel

### Problem: Mobile Ansicht funktioniert nicht

**Lösung:**
- Stellen Sie sicher, dass das Viewport-Meta-Tag vorhanden ist:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

### Problem: Suchergebnisse werden nicht angezeigt

**Lösung:**
- Prüfen Sie Browser-Console auf Fehler
- Überprüfen Sie, ob `OFFERS_DATA` korrekt geladen wurde
- Testen Sie mit `console.log(OFFERS_DATA)` in der Console

---

## Performance-Optimierung

### 1. Lazy Loading

```javascript
// Lade Scripts erst, wenn nötig
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadRecommendationSystem();
            observer.disconnect();
        }
    });
});

observer.observe(document.querySelector('#recommendation-system'));
```

### 2. Code Minification

Verwenden Sie Tools wie:
- [Terser](https://terser.org/) für JavaScript
- [cssnano](https://cssnano.co/) für CSS

### 3. Caching

```php
// PHP Beispiel mit Caching
$cacheFile = 'cache/recommendations.json';
$cacheTime = 3600; // 1 Stunde

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTime) {
    echo file_get_contents($cacheFile);
} else {
    // Daten aus DB holen
    $data = getRecommendations();
    file_put_contents($cacheFile, json_encode($data));
    echo json_encode($data);
}
```

---

## Support

Bei Fragen zur Integration:
- Erstellen Sie ein Issue im Repository
- Kontaktieren Sie das Entwicklerteam

---

**Weitere Dokumentation:**
- [README.md](README.md) - Projekt-Übersicht
- [API.md](API.md) - API-Dokumentation
