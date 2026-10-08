const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const wb = xlsx.readFile('sheet.xlsx');
const rows = xlsx.utils.sheet_to_json(wb.Sheets['Website Content']);

function ensureLink(html, anchorText, anchorUrl) {
  if (!anchorText || !anchorUrl) return html;
  if (html.includes(anchorUrl)) return html;

  // Find the anchorText where it is NOT already inside an <a> tag
  // Simple case-insensitive search and replace first occurrence
  const regex = new RegExp(`(?<!<a[^>]*>)\\b(${anchorText.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})\\b(?![^<]*<\\/a>)`, 'i');
  if (regex.test(html)) {
    return html.replace(regex, `<a href="${anchorUrl}">$1</a>`);
  } else {
    // If exact word boundary fails, try simple replace
    const simpleIndex = html.toLowerCase().indexOf(anchorText.toLowerCase());
    if (simpleIndex !== -1) {
      const matchText = html.substr(simpleIndex, anchorText.length);
      return html.slice(0, simpleIndex) + `<a href="${anchorUrl}">${matchText}</a>` + html.slice(simpleIndex + anchorText.length);
    }
  }
  return html;
}

const pages = rows.map((r, i) => {
  let html = r['Page Content (HTML)'] || '';
  const anchors = [
    { type: 'internal', text: r['Internal Anchor 1 Text'], url: r['Internal Anchor 1 URL'] },
    { type: 'internal', text: r['Internal Anchor 2 Text'], url: r['Internal Anchor 2 URL'] },
    { type: 'internal', text: r['Internal Anchor 3 Text'], url: r['Internal Anchor 3 URL'] },
    { type: 'external', text: r['External Anchor Text'], url: r['External Anchor URL'] }
  ].filter(a => Boolean(a.text && a.url));

  // Ensure every anchor is linked
  anchors.forEach(a => {
    html = ensureLink(html, a.text, a.url);
  });

  // Verify
  let missing = [];
  anchors.forEach(a => {
    if (!html.includes(a.url)) {
      missing.push(`${a.text} -> ${a.url}`);
    }
  });

  if (missing.length > 0) {
    console.error(`Page "${r['Page Title']}" still missing:`, missing);
  }

  // Determine page category
  const slug = r['URL Slug'] || '';
  let category = 'general';
  if (slug === '/') category = 'home';
  else if (slug.startsWith('/blog/')) category = 'blog';
  else if (slug.startsWith('/service-areas/')) category = 'location';
  else if (slug.includes('concrete') || slug.includes('driveway') || slug.includes('patios') || slug.includes('slabs') || slug.includes('steps') || slug.includes('walkways') || slug.includes('retaining') || slug.includes('repair') || slug.includes('resurfacing')) category = 'service';

  return {
    id: i + 1,
    pageTitle: r['Page Title'] || '',
    seoTitle: r['SEO Title'] || '',
    metaDesc: r['Meta Description'] || '',
    slug: slug,
    category: category,
    html: html,
    anchors: anchors
  };
});

console.log(`Parsed ${pages.length} pages. All anchors verified.`);
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/pages.json', JSON.stringify(pages, null, 2));

// Also extract a map of services, locations, and blogs for easy navigation
const services = pages.filter(p => p.category === 'service' || (p.slug.includes('concrete') && p.slug !== '/concrete-services/'));
const locations = pages.filter(p => p.category === 'location');
const blogs = pages.filter(p => p.category === 'blog');

fs.writeFileSync('data/navigation.json', JSON.stringify({
  services: services.map(s => ({ title: s.pageTitle, slug: s.slug })),
  locations: locations.map(l => ({ title: l.pageTitle, slug: l.slug })),
  blogs: blogs.map(b => ({ title: b.pageTitle, slug: b.slug }))
}, null, 2));

console.log(`Navigation data generated with ${services.length} services, ${locations.length} locations, and ${blogs.length} blogs.`);
