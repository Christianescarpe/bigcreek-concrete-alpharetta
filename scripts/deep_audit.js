const http = require('http');
const https = require('https');
const urlModule = require('url');

function fetchStatus(targetUrl) {
  return new Promise((resolve) => {
    const isHttps = targetUrl.startsWith('https:');
    const client = isHttps ? https : http;
    const req = client.get(targetUrl, { timeout: 10000 }, (res) => {
      resolve({
        url: targetUrl,
        statusCode: res.statusCode,
        location: res.headers.location || null,
        headers: res.headers
      });
    });
    req.on('error', (err) => resolve({ url: targetUrl, error: err.message }));
  });
}

function fetchBody(targetUrl) {
  return new Promise((resolve) => {
    https.get(targetUrl, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => resolve({ url: targetUrl, error: err.message }));
  });
}

async function runDeepAudit() {
  console.log('=== STEP 1 & 8: DEEP LIVE WEBSITE AUDIT ===\n');

  // 1. Hostname and Protocol Resolution
  console.log('--- 1. Testing Domain & Redirect Consistency ---');
  const domainsToTest = [
    'http://concretecontractoralpharetta.site/',
    'http://www.concretecontractoralpharetta.site/',
    'https://concretecontractoralpharetta.site/',
    'https://www.concretecontractoralpharetta.site/'
  ];

  for (const d of domainsToTest) {
    const res = await fetchStatus(d);
    console.log(`${d} -> Status: ${res.statusCode} ${res.location ? `(Redirect to: ${res.location})` : '(Destination)'}`);
  }

  // 2. Robots.txt and Sitemap.xml
  console.log('\n--- 2. Checking Robots.txt and Sitemap.xml ---');
  const robotsRes = await fetchBody('https://www.concretecontractoralpharetta.site/robots.txt');
  console.log(`robots.txt Status: ${robotsRes.statusCode}, Content-Type: ${robotsRes.headers['content-type']}`);
  console.log(`robots.txt has 'Allow: /': ${robotsRes.body.includes('Allow: /')}`);
  console.log(`robots.txt has Sitemap: ${robotsRes.body.includes('Sitemap: https://www.concretecontractoralpharetta.site/sitemap.xml')}`);

  const sitemapRes = await fetchBody('https://www.concretecontractoralpharetta.site/sitemap.xml');
  console.log(`sitemap.xml Status: ${sitemapRes.statusCode}, Content-Type: ${sitemapRes.headers['content-type']}`);
  const sitemapUrls = (sitemapRes.body.match(/<loc>(.*?)<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
  console.log(`sitemap.xml Total URL Count: ${sitemapUrls.length}`);

  // 3. Page by Page Live Audit
  console.log(`\n--- 3. Auditing all ${sitemapUrls.length} Live Pages from Sitemap ---`);
  let issues = 0;
  const titles = new Set();
  const descriptions = new Set();

  for (const pageUrl of sitemapUrls) {
    const res = await fetchBody(pageUrl);
    if (res.statusCode !== 200) {
      console.error(`❌ ${pageUrl} returned status ${res.statusCode}`);
      issues++;
      continue;
    }

    const html = res.body;

    // Check noindex
    const hasNoIndex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html) ||
                       (res.headers['x-robots-tag'] && res.headers['x-robots-tag'].includes('noindex'));
    if (hasNoIndex) {
      console.error(`❌ Accidental noindex found on: ${pageUrl}`);
      issues++;
    }

    // Check canonical
    const canonicalMatch = html.match(/<link rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const canonicalHref = canonicalMatch ? canonicalMatch[1] : null;
    if (canonicalHref !== pageUrl) {
      console.error(`❌ Canonical mismatch on ${pageUrl}: found '${canonicalHref}'`);
      issues++;
    }

    // Check single H1
    const h1Count = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || []).length;
    if (h1Count !== 1) {
      console.error(`❌ ${pageUrl} has ${h1Count} H1 tags (expected 1)`);
      issues++;
    }

    // Check Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const titleText = titleMatch ? titleMatch[1].trim() : '';
    if (!titleText) {
      console.error(`❌ Missing title tag on ${pageUrl}`);
      issues++;
    } else {
      if (titles.has(titleText)) {
        console.warn(`⚠️ Duplicate title tag '${titleText}' on ${pageUrl}`);
      }
      titles.add(titleText);
    }

    // Check Meta Description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const descText = descMatch ? descMatch[1].trim() : '';
    if (!descText) {
      console.error(`❌ Missing meta description on ${pageUrl}`);
      issues++;
    } else {
      if (descriptions.has(descText)) {
        console.warn(`⚠️ Duplicate meta description on ${pageUrl}`);
      }
      descriptions.add(descText);
    }

    // Check Schema
    const hasSchema = html.includes('application/ld+json');
    if (!hasSchema) {
      console.error(`❌ Missing JSON-LD Schema on ${pageUrl}`);
      issues++;
    }
  }

  console.log(`\nAudit completed: ${issues === 0 ? '0 CRITICAL ISSUES FOUND' : `${issues} ISSUES FOUND`}`);
  console.log(`Unique Title Count: ${titles.size} / ${sitemapUrls.length}`);
  console.log(`Unique Description Count: ${descriptions.size} / ${sitemapUrls.length}`);
}

runDeepAudit();
