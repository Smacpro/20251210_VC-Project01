# Deployment Guide

## GitHub Pages Deployment

Dieses Projekt ist für automatisches Deployment auf GitHub Pages konfiguriert.

### Automatisches Deployment

Das Projekt verwendet GitHub Actions für automatisches Deployment. Bei jedem Push auf den Branch `claude/media-recommendation-system-01X61uRWDeKtavDrejW1db24` wird automatisch auf GitHub Pages deployt.

### Setup-Schritte

#### 1. GitHub Pages aktivieren

1. Gehen Sie zu Ihrem GitHub Repository
2. Klicken Sie auf **Settings** (Einstellungen)
3. Navigieren Sie zu **Pages** im linken Menü
4. Unter **Source** wählen Sie:
   - Source: **GitHub Actions**

#### 2. Workflow ausführen

Der Workflow wird automatisch ausgeführt bei:
- Push auf den Branch `claude/media-recommendation-system-01X61uRWDeKtavDrejW1db24`
- Manueller Trigger über GitHub Actions Tab

Um manuell zu deployen:
1. Gehen Sie zum **Actions** Tab in GitHub
2. Wählen Sie **Deploy to GitHub Pages**
3. Klicken Sie auf **Run workflow**

#### 3. Ihre Seite ist live!

Nach erfolgreichem Deployment ist Ihre Seite erreichbar unter:

```
https://<username>.github.io/20251210_VC-Project01/
```

Beispiel für Smacpro:
```
https://smacpro.github.io/20251210_VC-Project01/
```

### Workflow-Datei

Die Deployment-Konfiguration befindet sich in:
```
.github/workflows/deploy.yml
```

### Wichtige Dateien

- **`.nojekyll`** - Verhindert Jekyll-Verarbeitung durch GitHub
- **`.github/workflows/deploy.yml`** - GitHub Actions Workflow

### Troubleshooting

#### Problem: 404 Error nach Deployment

**Lösung:**
- Stellen Sie sicher, dass GitHub Pages in den Repository-Settings aktiviert ist
- Warten Sie 2-3 Minuten nach dem ersten Deployment
- Überprüfen Sie den Actions Tab auf Fehler

#### Problem: Workflow schlägt fehl

**Lösung:**
1. Prüfen Sie die Logs im Actions Tab
2. Stellen Sie sicher, dass Pages-Permissions aktiviert sind:
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

#### Problem: CSS/JS werden nicht geladen

**Lösung:**
- Die `.nojekyll` Datei muss im Root-Verzeichnis existieren
- Überprüfen Sie die Pfade in HTML-Dateien (sollten relativ sein)

### Custom Domain (Optional)

Um eine eigene Domain zu verwenden:

1. Erstellen Sie eine `CNAME` Datei im Root:
   ```
   ihre-domain.de
   ```

2. Konfigurieren Sie Ihre DNS-Einstellungen:
   ```
   Type: CNAME
   Name: www (oder @)
   Value: <username>.github.io
   ```

3. Aktivieren Sie in GitHub Settings → Pages die Custom Domain

### Lokales Testen vor Deployment

```bash
# Mit Python
python -m http.server 8000

# Mit Node.js
npx http-server

# Mit PHP
php -S localhost:8000
```

Dann öffnen Sie: `http://localhost:8000`

### Deployment-Status prüfen

Nach dem Push:

1. Gehen Sie zum **Actions** Tab
2. Sehen Sie den laufenden Workflow
3. Klicken Sie darauf für Details
4. Warten Sie auf ✅ Success

Deployment dauert typischerweise 1-2 Minuten.

### Alternative Deployment-Methoden

#### Manueller gh-pages Branch

```bash
# Erstellen und wechseln zum gh-pages Branch
git checkout --orphan gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# In GitHub Settings → Pages
# Source: Deploy from a branch
# Branch: gh-pages / (root)
```

#### Netlify Deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Klicken Sie auf "Deploy to Netlify"
2. Verbinden Sie Ihr GitHub Repository
3. Build Command: (leer lassen)
4. Publish Directory: `.`

#### Vercel Deployment

```bash
# Installieren Sie Vercel CLI
npm i -g vercel

# Deployen
vercel
```

### CI/CD Pipeline

Der aktuelle Workflow:

```
Push → GitHub Actions → Build → Deploy → Live
```

**Workflow-Schritte:**
1. ✅ Checkout Code
2. ✅ Setup Pages
3. ✅ Upload Artifact
4. ✅ Deploy to Pages

### Monitoring

Nach dem Deployment überwachen Sie:

- **Build-Zeit**: ~1-2 Minuten
- **Deployment-Status**: Actions Tab
- **Live-URL**: Settings → Pages

### Support

Bei Problemen:
- Überprüfen Sie GitHub Actions Logs
- Lesen Sie [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
- Erstellen Sie ein Issue im Repository

---

**Status:** ✅ Deployment konfiguriert und bereit

**Live-URL:** Nach Aktivierung verfügbar unter `https://<username>.github.io/20251210_VC-Project01/`

**Letzte Aktualisierung:** 2024-12-10
