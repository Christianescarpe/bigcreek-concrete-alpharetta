const fs = require('fs');
const path = require('path');
const pages = require('../data/pages.json');

const domain = 'https://www.concretecontractoralpharetta.site';
const today = new Date().toISOString().split('T')[0];

const urls = [];

// Homepage
urls.push({
  loc: `${domain}/`,
  lastmod: today,
  changefreq: 'weekly',
  priority: '1.0'
});

// All pages from pages.json except home
for (const p of pages) {
  if (p.slug === '/') continue;
  let priority = '0.80';
  let changefreq = 'monthly';
  if (p.slug === '/concrete-services/' || p.slug === '/service-areas/') {
    priority = '0.90';
    changefreq = 'weekly';
  } else if (p.category === 'service' || p.category === 'location') {
    priority = '0.85';
    changefreq = 'monthly';
  } else if (p.category === 'blog') {
    priority = '0.75';
    changefreq = 'monthly';
  }

  // Ensure trailing slash
  const slug = p.slug.endsWith('/') ? p.slug : `${p.slug}/`;
  urls.push({
    loc: `${domain}${slug}`,
    lastmod: today,
    changefreq,
    priority
  });
}

// Blog hub (/blog/)
if (!urls.some(u => u.loc === `${domain}/blog/`)) {
  urls.push({
    loc: `${domain}/blog/`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80'
  });
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of urls) {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const targetPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf8');
console.log(`Successfully generated ${targetPath} with ${urls.length} canonical URLs.`);
