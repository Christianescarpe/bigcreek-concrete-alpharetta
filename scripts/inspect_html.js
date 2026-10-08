const fs = require('fs');
const pages = require('../data/pages.json');

const home = pages.find(p => p.slug === '/');
console.log('--- Home Page HTML breakdown ---');

// Let's parse HTML using a regex or DOM parser
function parsePageSections(html) {
  // Extract H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].trim() : '';

  // Get content after H1 up to first H2
  const afterH1 = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '').trim();
  const firstH2Index = afterH1.search(/<h2[^>]*>/i);
  
  let heroBody = '';
  let rest = afterH1;
  if (firstH2Index !== -1) {
    heroBody = afterH1.substring(0, firstH2Index).trim();
    rest = afterH1.substring(firstH2Index).trim();
  } else {
    heroBody = afterH1;
    rest = '';
  }

  // Now split rest by H2
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const sections = [];
  let match;
  let lastIndex = 0;
  let lastH2 = '';

  const h2Matches = [];
  while ((match = h2Regex.exec(rest)) !== null) {
    h2Matches.push({
      h2: match[1].trim(),
      index: match.index,
      length: match[0].length
    });
  }

  for (let i = 0; i < h2Matches.length; i++) {
    const cur = h2Matches[i];
    const next = h2Matches[i + 1];
    const startIndex = cur.index + cur.length;
    const endIndex = next ? next.index : rest.length;
    const body = rest.substring(startIndex, endIndex).trim();
    sections.push({
      h2: cur.h2,
      body: body
    });
  }

  return { h1, heroBody, sections };
}

const parsedHome = parsePageSections(home.html);
console.log('H1:', parsedHome.h1);
console.log('Hero body length:', parsedHome.heroBody.length);
console.log('Hero body snippet:', parsedHome.heroBody.substring(0, 200));
console.log('Total H2 sections:', parsedHome.sections.length);
parsedHome.sections.forEach((s, idx) => {
  console.log(`Section ${idx + 1}: H2 = "${s.h2}" (body length: ${s.body.length})`);
});
