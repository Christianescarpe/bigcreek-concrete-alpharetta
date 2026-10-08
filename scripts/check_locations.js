const pages = require('../data/pages.json');

const allHrefs = new Set();
pages.forEach(p => {
  const matches = [...p.html.matchAll(/href=["']([^"']+)["']/gi)];
  matches.forEach(m => allHrefs.add(m[1]));
});

console.log('Total unique hrefs found in all HTML content:', allHrefs.size);
const internalHrefs = [...allHrefs].filter(h => h.startsWith('/'));
console.log('Internal hrefs count:', internalHrefs.length);

const pageSlugs = new Set(pages.map(p => p.slug));
let missingInternal = [];
internalHrefs.forEach(h => {
  const norm = h.endsWith('/') ? h : h + '/';
  if (!pageSlugs.has(h) && !pageSlugs.has(norm)) {
    missingInternal.push(h);
  }
});

console.log('Missing internal pages referenced in HTML:', missingInternal);

// Let's inspect all location pages in data/pages.json
const locationPages = pages.filter(p => p.category === 'location' || p.slug.startsWith('/service-areas/'));
console.log('\n--- ALL LOCATION PAGES IN SHEET (Website Content) ---');
console.log(`Total location pages: ${locationPages.length}`);
locationPages.forEach(lp => {
  console.log(`- ${lp.pageTitle} | Slug: ${lp.slug}`);
});

// Let's check mentions of other North Atlanta / Fulton cities in the text
const commonCities = [
  'Milton', 'Cumming', 'Duluth', 'Suwanee', 'Dunwoody', 'Marietta',
  'Woodstock', 'Alpharetta', 'Sandy Springs', 'Brookhaven', 'Chamblee',
  'Doraville', 'Peachtree Corners', 'Norcross', 'Roswell', 'Johns Creek'
];

console.log('\n--- CITIES MENTIONED IN CONTENT ---');
commonCities.forEach(city => {
  let mentions = 0;
  pages.forEach(p => {
    const count = (p.html.match(new RegExp(`\\b${city}\\b`, 'gi')) || []).length;
    mentions += count;
  });
  const hasPage = locationPages.some(lp => lp.pageTitle.toLowerCase().includes(city.toLowerCase()));
  console.log(`${city}: ${mentions} mentions | Has dedicated sheet page? ${hasPage ? 'YES' : 'NO'}`);
});
