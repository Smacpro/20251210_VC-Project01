import Papa from 'papaparse';

/**
 * Parse the actual CSV file structure from Medien Bayern
 */
export async function parseMediaBayernCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: 'UTF-8',
      complete: (results) => {
        try {
          const offers = results.data
            .map((row, index) => {
              const initiative = row.Initiative || '';
              const categories = parseKategorie(row['Interesse/ Kategorie'] || '');
              const type = determineType(categories);

              return {
                id: index + 1,
                type: type,
                title: row['Name Angebot'] || '',
                description: cleanDescription(row['Um was geht´s?'] || ''),
                date: determineDateFromType(type),
                location: determineLocation(row['Um was geht´s?'] || '', categories),
                city: extractCity(row['Um was geht´s?'] || ''),
                cost: determineCost(row['Um was geht´s?'] || ''),
                tags: extractTags(row),
                source: mapInitiativeToSource(initiative),
                url: extractURL(row['Merchartikel, Infoblatt, Websitelink?'] || ''),
                personas: determinePersonas(row['Branche'] || '', categories),
                categories: [type, ...categories.slice(0, 2)].filter((c, i, a) => a.indexOf(c) === i),
              };
            })
            .filter((offer) => offer.title && offer.url !== '#');

          resolve(offers);
        } catch (error) {
          reject(error);
        }
      },
      error: reject,
    });
  });
}

/**
 * Load CSV from public folder - tries multiple paths
 */
export async function loadCSVFromRepo() {
  // Try multiple paths for robustness
  const paths = [
    './offers.csv',
    'offers.csv',
    '/offers.csv',
    '/20251210_VC-Project01/offers.csv',
    import.meta.env.BASE_URL + 'offers.csv',
  ];

  for (const path of paths) {
    try {
      console.log(`[CSV Loader] Trying path: ${path}`);
      const response = await fetch(path);

      if (!response.ok) {
        console.log(`[CSV Loader] Path ${path} returned ${response.status}`);
        continue;
      }

      const text = await response.text();
      console.log(`[CSV Loader] ✓ Successfully loaded CSV from: ${path} (${text.length} bytes)`);

      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          encoding: 'UTF-8',
          complete: (results) => {
            try {
              const allOffers = results.data.map((row, index) => {
                const initiative = row.Initiative || '';
                const categories = parseKategorie(row['Interesse/ Kategorie'] || '');
                const type = determineType(categories);

                return {
                  id: index + 1,
                  type: type,
                  title: row['Name Angebot'] || '',
                  description: cleanDescription(row['Um was geht´s?'] || ''),
                  date: determineDateFromType(type),
                  location: determineLocation(row['Um was geht´s?'] || '', categories),
                  city: extractCity(row['Um was geht´s?'] || ''),
                  cost: determineCost(row['Um was geht´s?'] || ''),
                  tags: extractTags(row),
                  source: mapInitiativeToSource(initiative),
                  url: extractURL(row['Merchartikel, Infoblatt, Websitelink?'] || ''),
                  personas: determinePersonas(row['Branche'] || '', categories),
                  categories: [type, ...categories.slice(0, 2)].filter((c, i, a) => a.indexOf(c) === i),
                };
              });

              // Only filter out offers without titles (keep offers without URLs)
              const offers = allOffers.filter((offer) => offer.title && offer.title.trim().length > 0);

              console.log(`[CSV Loader] ✓ Parsed ${offers.length} offers from ${results.data.length} rows`);
              console.log(`[CSV Loader] Offers with URLs: ${offers.filter(o => o.url !== '#').length}`);
              console.log(`[CSV Loader] Offers without URLs: ${offers.filter(o => o.url === '#').length}`);
              resolve(offers);
            } catch (error) {
              console.error('[CSV Loader] Parse error:', error);
              reject(error);
            }
          },
          error: (error) => {
            console.error('[CSV Loader] PapaParse error:', error);
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error(`[CSV Loader] Failed to load from ${path}:`, error.message);
      continue;
    }
  }

  // If all paths failed
  console.error('[CSV Loader] ✗ Failed to load CSV from all attempted paths');
  console.log('[CSV Loader] Attempted paths:', paths);
  return [];
}

// Helper functions
function cleanDescription(text) {
  if (!text) return '';
  return text.replace(/\n{3,}/g, '\n\n').replace(/•\s*/g, '• ').trim().slice(0, 250);
}

function parseKategorie(kategorie) {
  const categories = [];
  const lower = kategorie.toLowerCase();

  if (lower.includes('veranstaltung') || lower.includes('event')) categories.push('veranstaltung');
  if (lower.includes('förderung') || lower.includes('förderprogramm')) categories.push('foerderung');
  if (lower.includes('aus- und weiterbildung') || lower.includes('coaching')) categories.push('weiterbildung');
  if (lower.includes('kontakte') || lower.includes('pr')) categories.push('netzwerk');
  if (lower.includes('trends') || lower.includes('studien')) categories.push('publikation');

  return categories.length ? categories : ['veranstaltung'];
}

function determineType(categories) {
  return categories[0] || 'veranstaltung';
}

function determineLocation(description, categories) {
  const lower = description.toLowerCase();

  if (lower.includes('hybrid')) return 'hybrid';
  if (lower.includes('online') || lower.includes('digital')) return 'online';
  if (lower.includes('münchen') || lower.includes('ansbach') || lower.includes('vor ort')) return 'vor-ort';

  if (categories.includes('foerderung') || categories.includes('publikation')) return 'online';

  return 'hybrid';
}

function extractCity(text) {
  const cities = ['München', 'Ansbach', 'Nürnberg', 'Augsburg', 'Regensburg'];
  for (const city of cities) {
    if (text.includes(city)) return city;
  }
  return '';
}

function determineCost(description) {
  const lower = description.toLowerCase();
  if (lower.includes('kostenlos') || lower.includes('kostenfrei') || lower.includes('förderung')) return 'kostenlos';
  if (lower.includes('kostenpflichtig') || lower.includes('gebühr')) return 'kostenpflichtig';
  return 'kostenlos';
}

function extractTags(row) {
  const tags = new Set();

  if (row['Branche']) {
    row['Branche'].split(',').forEach(b => {
      const clean = b.trim();
      if (clean && clean.length < 30) tags.add(clean);
    });
  }

  if (row['Initiative']) tags.add(row['Initiative']);

  return Array.from(tags).slice(0, 4);
}

function mapInitiativeToSource(init) {
  const map = {
    'MNB': 'mediennetzwerk-bayern.de',
    'MLB': 'media-lab.de',
    'SIM': 'startintomedia.de',
    'XPLR': 'xplr-media.com',
  };
  return map[init] || 'medien-bayern.de';
}

function extractURL(text) {
  if (!text) return '#';
  const match = text.match(/https?:\/\/[^\s,]+/);
  return match ? match[0].trim() : '#';
}

function determinePersonas(branches, categories) {
  const personas = new Set();
  const lower = (branches + ' ' + categories.join(' ')).toLowerCase();

  if (lower.includes('student') || lower.includes('ausbildung')) {
    personas.add('student');
    personas.add('einsteiger');
  }
  if (lower.includes('hr') || lower.includes('recruiting')) personas.add('quereinsteiger');
  if (lower.includes('journalismus') || lower.includes('audio')) personas.add('professional');
  if (lower.includes('start-up') || lower.includes('förderung')) personas.add('gruender');

  return personas.size ? Array.from(personas) : ['professional'];
}

function determineDateFromType(type) {
  const now = new Date();
  const months = type === 'foerderung' ? 12 : Math.floor(Math.random() * 4) + 1;
  const date = new Date(now);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split('T')[0];
}

// Keep old function for compatibility with CSV upload
export const parseCSV = parseMediaBayernCSV;

export function downloadCSVTemplate() {
  const template = `Name Angebot,Initiative,Interesse/ Kategorie,Branche,Um was geht´s?,Merchartikel...
"Beispiel Event",MNB,"Veranstaltung & Event","Audio, Games & XR","Beschreibung des Events",https://example.com`;

  const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'medien-bayern-template.csv';
  link.click();
}
