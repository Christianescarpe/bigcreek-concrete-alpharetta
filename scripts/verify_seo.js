const http = require('http');
const fs = require('fs');
const pages = require('../data/pages.json');

const CANONICAL_BASE = 'https://www.concretecontractoralpharetta.site';
const PORT = 3000;

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('=== STARTING TECHNICAL SEO & INDEXING AUDIT ===\n');
  let errors = 0;

  // 1. Robots.txt
  console.log('[1/4] Auditing /robots.txt...');
  const robots = await fetchUrl('/robots.txt');
  if (robots.statusCode !== 200) {
    console.error(`❌ /robots.txt returned status ${robots.statusCode}`);
    errors++;
  } else {
    console.log(`✓ /robots.txt status 200`);
    if (!robots.body.includes('Allow: /')) {
      console.error(`❌ /robots.txt missing Allow: /`);
      errors++;
    } else {
      console.log(`✓ /robots.txt allows Googlebot`);
    }
    if (!robots.body.includes(`Sitemap: ${CANONICAL_BASE}/sitemap.xml`)) {
      console.error(`❌ /robots.txt missing correct Sitemap URL`);
      errors++;
    } else {
      console.log(`✓ /robots.txt includes canonical Sitemap URL`);
    }
  }

  // 2. Sitemap.xml
  console.log('\n[2/4] Auditing /sitemap.xml...');
  const sitemap = await fetchUrl('/sitemap.xml');
  if (sitemap.statusCode !== 200) {
    console.error(`❌ /sitemap.xml returned status ${sitemap.statusCode}`);
    errors++;
  } else {
    console.log(`✓ /sitemap.xml status 200`);
    const locMatches = sitemap.body.match(/<loc>(.*?)<\/loc>/g) || [];
    console.log(`✓ /sitemap.xml contains ${locMatches.length} URLs`);
    
    // Check all URLs start with CANONICAL_BASE
    let invalidUrls = 0;
    for (const m of locMatches) {
      const url = m.replace(/<\/?loc>/g, '');
      if (!url.startsWith(CANONICAL_BASE)) {
        console.error(`❌ Sitemap URL not matching canonical: ${url}`);
        invalidUrls++;
        errors++;
      }
    }
    if (invalidUrls === 0) {
      console.log(`✓ All ${locMatches.length} URLs use exact canonical domain: ${CANONICAL_BASE}`);
    }
  }

  // 3. Page Audit
  console.log('\n[3/4] Auditing Pages (Canonical, Titles, Meta, H1, Schema, OG)...');
  const testPaths = [
    '/',
    '/about/',
    '/contact/',
    '/gallery/',
    '/concrete-services/',
    '/service-areas/',
    '/blog/'
  ];

  // Add all services
  for (const p of pages) {
    if (!testPaths.includes(p.slug)) {
      testPaths.push(p.slug.endsWith('/') ? p.slug : `${p.slug}/`);
    }
  }

  console.log(`Auditing ${testPaths.length} pages...`);

  let auditedCount = 0;
  for (const p of testPaths) {
    const res = await fetchUrl(p);
    if (res.statusCode !== 200) {
      console.error(`❌ ${p} returned ${res.statusCode}`);
      errors++;
      continue;
    }

    const html = res.body;

    // Check canonical
    const expectedCanonical = `${CANONICAL_BASE}${p}`;
    const hasCanonical = html.includes(`rel="canonical"`) && html.includes(expectedCanonical);
    if (!hasCanonical) {
      console.error(`❌ ${p} missing or incorrect canonical link! Expected: ${expectedCanonical}`);
      errors++;
    }

    // Check Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      console.error(`❌ ${p} missing title tag`);
      errors++;
    }

    // Check Meta Description
    const hasMetaDesc = /<meta[^>]*name=["']description["'][^>]*content=["'][^"']+["']/i.test(html);
    if (!hasMetaDesc) {
      console.error(`❌ ${p} missing meta description`);
      errors++;
    }

    // Check H1 (exactly 1)
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    if (h1Matches.length !== 1) {
      console.error(`❌ ${p} has ${h1Matches.length} H1 tags (expected 1)`);
      errors++;
    }

    // Check Schema (ld+json)
    const hasSchema = html.includes('application/ld+json');
    if (!hasSchema) {
      console.error(`❌ ${p} missing application/ld+json schema`);
      errors++;
    }

    // Check Robots
    const hasRobots = html.includes('name="robots"');
    if (!hasRobots) {
      console.error(`❌ ${p} missing robots meta tag`);
      errors++;
    }

    // Check Open Graph
    const hasOg = html.includes('property="og:title"');
    if (!hasOg) {
      console.error(`❌ ${p} missing og:title`);
      errors++;
    }

    auditedCount++;
  }

  console.log(`✓ Audited ${auditedCount} / ${testPaths.length} pages successfully!`);

  // 4. Broken Link Checker
  console.log('\n[4/4] Checking Internal Links across site...');
  const homeRes = await fetchUrl('/');
  const hrefMatches = homeRes.body.match(/href=["'](\/[^"']*)["']/g) || [];
  const internalHrefs = new Set(hrefMatches.map(h => h.replace(/^href=["']|["']$/g, '')));
  console.log(`Found ${internalHrefs.size} unique internal links on homepage navigation and footer.`);
  
  let brokenLinks = 0;
  for (const href of internalHrefs) {
    if (href.startsWith('/_next') || href.startsWith('/images')) continue;
    const check = await fetchUrl(href);
    if (check.statusCode !== 200) {
      console.error(`❌ Broken link: ${href} returned ${check.statusCode}`);
      brokenLinks++;
      errors++;
    }
  }
  if (brokenLinks === 0) {
    console.log(`✓ All internal links return HTTP 200 OK!`);
  }

  console.log(`\n=== AUDIT COMPLETE: ${errors === 0 ? 'ALL CHECKS PASSED (0 ERRORS)' : `${errors} ERRORS DETECTED`} ===`);
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
