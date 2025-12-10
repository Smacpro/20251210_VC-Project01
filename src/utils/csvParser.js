import Papa from 'papaparse';

/**
 * Parse CSV file and convert to offer objects
 * @param {File} file - The CSV file to parse
 * @returns {Promise<Array>} Parsed offers
 */
export async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const offers = results.data.map((row, index) => ({
            id: index + 1,
            type: mapType(row.Typ || row.type || 'veranstaltung'),
            title: row.Titel || row.title || '',
            description: row.Beschreibung || row.description || '',
            date: parseDate(row.Datum || row.date || new Date().toISOString()),
            location: mapLocation(row.Ort || row.location || 'online'),
            city: row.Stadt || row.city || '',
            cost: mapCost(row.Kosten || row.cost || 'kostenlos'),
            tags: parseTags(row.Tags || row.tags || ''),
            source: row.Quelle || row.source || '',
            url: row.URL || row.url || '#',
            personas: parsePersonas(row.Zielgruppe || row.personas || ''),
            categories: parseCategories(row.Kategorien || row.categories || row.Typ || ''),
          }));

          resolve(offers.filter((offer) => offer.title));
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

function mapType(type) {
  const typeMap = {
    veranstaltung: 'veranstaltung',
    event: 'veranstaltung',
    foerderung: 'foerderung',
    förderung: 'foerderung',
    funding: 'foerderung',
    publikation: 'publikation',
    publication: 'publikation',
    weiterbildung: 'weiterbildung',
    training: 'weiterbildung',
    netzwerk: 'netzwerk',
    network: 'netzwerk',
  };

  return typeMap[type.toLowerCase()] || 'veranstaltung';
}

function mapLocation(location) {
  const locationMap = {
    'vor-ort': 'vor-ort',
    'vor ort': 'vor-ort',
    offline: 'vor-ort',
    online: 'online',
    hybrid: 'hybrid',
  };

  return locationMap[location.toLowerCase()] || 'online';
}

function mapCost(cost) {
  const costLower = cost.toLowerCase();
  if (
    costLower.includes('kostenlos') ||
    costLower.includes('free') ||
    costLower.includes('gratis') ||
    cost === '0'
  ) {
    return 'kostenlos';
  }
  return 'kostenpflichtig';
}

function parseTags(tagsString) {
  if (!tagsString) return [];
  return tagsString
    .split(/[,;|]/)
    .map((tag) => tag.trim())
    .filter((tag) => tag);
}

function parsePersonas(personasString) {
  if (!personasString) return [];

  const personas = [];
  const str = personasString.toLowerCase();

  if (str.includes('einsteiger') || str.includes('beginner')) personas.push('einsteiger');
  if (str.includes('quereinsteiger') || str.includes('career changer')) personas.push('quereinsteiger');
  if (str.includes('professional') || str.includes('expert')) personas.push('professional');
  if (str.includes('gründer') || str.includes('founder') || str.includes('startup')) personas.push('gruender');
  if (str.includes('student') || str.includes('azubi') || str.includes('trainee')) personas.push('student');

  return personas.length ? personas : ['professional'];
}

function parseCategories(categoriesString) {
  if (!categoriesString) return ['veranstaltung'];

  const categories = [];
  const str = categoriesString.toLowerCase();

  if (str.includes('veranstaltung') || str.includes('event')) categories.push('veranstaltung');
  if (str.includes('förderung') || str.includes('foerderung') || str.includes('funding')) categories.push('foerderung');
  if (str.includes('publikation') || str.includes('publication')) categories.push('publikation');
  if (str.includes('weiterbildung') || str.includes('training')) categories.push('weiterbildung');
  if (str.includes('netzwerk') || str.includes('network')) categories.push('netzwerk');

  return categories.length ? categories : ['veranstaltung'];
}

function parseDate(dateString) {
  // Try to parse various date formats
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }

  // Default to 3 months from now
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3);
  return futureDate.toISOString().split('T')[0];
}

/**
 * Download sample CSV template
 */
export function downloadCSVTemplate() {
  const template = `Typ,Titel,Beschreibung,Datum,Ort,Stadt,Kosten,Tags,Quelle,URL,Zielgruppe,Kategorien
veranstaltung,"Beispiel Event","Beschreibung des Events",2025-06-15,online,,kostenlos,"KI,Medien,Innovation",beispiel.de,https://beispiel.de,"Professional,Gründer",veranstaltung
foerderung,"Beispiel Förderung","Beschreibung der Förderung",2025-12-31,online,,kostenlos,"Förderung,Startup",foerderung.de,https://foerderung.de,"Gründer","foerderung"`;

  const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'medien-bayern-template.csv';
  link.click();
}
