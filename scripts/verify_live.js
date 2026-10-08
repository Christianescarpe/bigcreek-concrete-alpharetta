const https = require('https');

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, headers: res.headers, len: data.length, body: data });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

async function main() {
  console.log('=== VERIFYING LIVE PRODUCTION DEPLOYMENT ===\n');

  const r = await check('https://www.concretecontractoralpharetta.site/robots.txt');
  console.log('1. ROBOTS.TXT:');
  console.log('   Status:', r.status);
  console.log('   Content-Type:', r.headers['content-type']);
  console.log('   Body:\n' + r.body.trim());

  const s = await check('https://www.concretecontractoralpharetta.site/sitemap.xml');
  const locCount = (s.body.match(/<loc>/g) || []).length;
  console.log('\n2. SITEMAP.XML:');
  console.log('   Status:', s.status);
  console.log('   Content-Type:', s.headers['content-type']);
  console.log('   Canonical URLs count:', locCount);

  const h = await check('https://www.concretecontractoralpharetta.site/');
  console.log('\n3. HOMEPAGE:');
  console.log('   Status:', h.status);
  console.log('   Has Canonical:', h.body.includes('rel="canonical"'));
  console.log('   Canonical URL:', (h.body.match(/<link rel="canonical"[^>]*href="([^"]+)"/) || [])[1]);
  console.log('   Has LocalBusiness Schema:', h.body.includes('LocalBusiness'));
  console.log('   Has WebSite Schema:', h.body.includes('WebSite'));

  const svc = await check('https://www.concretecontractoralpharetta.site/concrete-driveways/');
  console.log('\n4. SERVICE PAGE (/concrete-driveways/):');
  console.log('   Status:', svc.status);
  console.log('   Has Canonical:', svc.body.includes('rel="canonical"'));
  console.log('   Canonical URL:', (svc.body.match(/<link rel="canonical"[^>]*href="([^"]+)"/) || [])[1]);
  console.log('   Has Service Schema:', svc.body.includes('Service'));
  console.log('   Has BreadcrumbList Schema:', svc.body.includes('BreadcrumbList'));

  const loc = await check('https://www.concretecontractoralpharetta.site/service-areas/alpharetta-ga/');
  console.log('\n5. LOCATION PAGE (/service-areas/alpharetta-ga/):');
  console.log('   Status:', loc.status);
  console.log('   Has Canonical:', loc.body.includes('rel="canonical"'));
  console.log('   Canonical URL:', (loc.body.match(/<link rel="canonical"[^>]*href="([^"]+)"/) || [])[1]);
  console.log('   Has BreadcrumbList Schema:', loc.body.includes('BreadcrumbList'));

  console.log('\n=== LIVE VERIFICATION FINISHED SUCCESSFULLY ===');
}

main();
