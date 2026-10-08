const pages = require('../data/pages.json');

console.log('Total pages to check:', pages.length);
let issues = 0;

pages.forEach((p, idx) => {
  const h1Match = p.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Matches = (p.html.match(/<h2[^>]*>/gi) || []);
  if (!h1Match) {
    console.error(`Page ${idx} (${p.slug}) has NO H1`);
    issues++;
  }
  if (h2Matches.length === 0) {
    console.error(`Page ${idx} (${p.slug}) has NO H2s`);
    issues++;
  }
});

console.log(`Validation finished. Issues found: ${issues}`);
