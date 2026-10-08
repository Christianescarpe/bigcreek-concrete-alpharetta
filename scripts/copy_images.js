const fs = require('fs');
const path = require('path');

const srcDir = 'D:/images/construction images';
const destDir = path.join(__dirname, '../public/images');

fs.mkdirSync(destDir, { recursive: true });

// Map key topics to the best available images in the directory
const imageMapping = {
  // Hero & General
  'hero.webp': 'attractive-home-with-garage-lawn-and-concrete-dri-2026-01-07-23-06-43-utc.webp',
  'about-hero.webp': 'building-workers-working-at-construction-site-bui-2026-03-17-14-43-37-utc.webp',
  'services-hero.webp': 'worker-smoothing-fresh-concrete-on-construction.webp',
  'commercial-hero.webp': 'concrete-pouring-at-a-construction-site-2026-01-07-06-34-15-utc.webp',

  // Services
  'driveway.webp': 'they-are-making-a-new-concrete-driveway.webp',
  'driveway-replacement.webp': 'two-construction-workers-patching-bump-in-the-road-2026-01-08-02-16-26-utc.webp',
  'patio.webp': 'concrete-pavers-installation-in-a-backyard-patio-p-2026-03-25-03-23-37-utc.webp',
  'stamped-concrete.webp': 'the-master-lays-paving-stones-in-layers-garden-b-2026-03-16-02-39-11-utc.webp',
  'decorative-concrete.webp': 'young-man-laying-grey-concrete-paving-slabs-in-hou-2026-03-17-19-18-51-utc.webp',
  'walkway.webp': 'concrete-pouring-for-a-sidewalk-construction-proje-2026-01-09-10-43-44-utc.webp',
  'steps.webp': 'worker-carefully-installs-pavers-on-new-outdoor-su-2026-03-19-02-08-33-utc.webp',
  'slabs.webp': 'worker-smoothing-wet-concrete-with-trowel-outdoors-2026-04-13-02-28-05-utc.webp',
  'foundations.webp': 'concrete-pouring-into-foundation-form-on-construct-2026-01-08-07-53-41-utc.webp',
  'retaining-walls.webp': 'rustic-brick-and-concrete-wall-with-cracked-textur-2026-01-08-00-05-32-utc.webp',
  'pool-decks.webp': 'worker-laying-concrete-pavers-for-residential-pati-2026-01-07-00-44-04-utc.webp',
  'concrete-repair.webp': 'worker-repairing-pavers-on-urban-sidewalk-2026-03-17-08-59-42-utc.webp',
  'resurfacing.webp': 'workers-applying-leveling-compound-with-spiked-sho-2026-03-18-08-00-18-utc.webp',
  'commercial.webp': 'warehouse-construction-site-building-a-new-indust-2026-03-24-15-20-19-utc.webp',

  // Process Steps
  'process-consultation.webp': 'top-view-of-architectural-helmet-pencil.webp',
  'process-specs.webp': 'surveyor-using-theodolite-in-a-rural-landscape-2026-03-19-01-56-13-utc.webp',
  'process-prep.webp': 'worker-using-plate-compactor-on-gravel-pad-2026-03-25-00-37-56-utc.webp',
  'process-pour.webp': 'workers-pouring-concrete-for-a-construction-projec-2026-01-05-01-11-28-utc.webp',
  'process-cure.webp': 'skilled-adult-smoothing-concrete-surface-on-constr-2026-03-09-03-25-47-utc.webp',

  // Core capabilities / values
  'cap-safety.webp': 'safety-helmet-and-construction-tools-on-wooden-tab-2026-03-16-01-24-07-utc.webp',
  'cap-quality.webp': 'workman-smoothing-fresh-cement-on-construction-pro-2026-03-09-03-26-04-utc.webp',
  'cap-soil.webp': 'worker-rams-the-ground-with-a-vibrating-machine-t-2026-01-11-09-29-54-utc.webp',
  'cap-equipment.webp': 'cement-mixer-delivering-to-construction-site-on-su-2026-03-25-01-35-26-utc.webp',

  // Team
  'team-member-1.png': 'smiling-man-in-hard-hat-holding-work-gloves-2026-01-11-11-10-47-utc (1).png',
  'team-member-2.png': 'smiling-man-wearing-a-yellow-hard-hat-2026-01-09-00-02-46-utc.png',

  // Gallery
  'gallery-1.webp': 'attractive-home-with-garage-lawn-and-concrete-dri-2026-01-07-23-06-43-utc.webp',
  'gallery-2.webp': 'concrete-pavers-installation-in-a-backyard-patio-p-2026-03-25-03-23-37-utc.webp',
  'gallery-3.webp': 'they-are-making-a-new-concrete-driveway.webp',
  'gallery-4.webp': 'concrete-pouring-at-a-construction-site-2026-01-07-06-34-15-utc.webp',
  'gallery-5.webp': 'worker-smoothing-fresh-concrete-on-construction.webp',
  'gallery-6.webp': 'young-man-laying-grey-concrete-paving-slabs-in-hou-2026-03-17-19-18-51-utc.webp',
  'gallery-7.webp': 'the-master-lays-paving-stones-in-layers-garden-b-2026-03-16-02-39-11-utc.webp',
  'gallery-8.webp': 'worker-laying-concrete-pavers-for-residential-pati-2026-01-07-00-44-04-utc.webp',
  'gallery-9.webp': 'workers-pouring-cement-at-construction-site-2026-01-09-08-20-54-utc.webp',
  'gallery-10.webp': 'worker-smoothing-wet-concrete-with-trowel-outdoors-2026-04-13-02-28-05-utc.webp',
  'gallery-11.webp': 'building-house-construction-project-foundation-an-2026-04-14-04-08-26-utc.webp',
  'gallery-12.webp': 'warehouse-construction-site-building-a-new-indust-2026-03-24-15-20-19-utc.webp',

  // Blog post images
  'blog-cost.webp': 'they-are-making-a-new-concrete-driveway.webp',
  'blog-replace-repair.webp': 'two-construction-workers-patching-bump-in-the-road-2026-01-08-02-16-26-utc.webp',
  'blog-stamped-pavers.webp': 'the-master-lays-paving-stones-in-layers-garden-b-2026-03-16-06-18-01-utc.webp',
  'blog-patio-cost.webp': 'concrete-pavers-installation-in-a-backyard-patio-p-2026-03-25-03-23-37-utc.webp',
  'blog-cure.webp': 'skilled-adult-smoothing-concrete-surface-on-constr-2026-03-09-03-25-47-utc.webp',
  'blog-thickness.webp': 'worker-smoothing-wet-concrete-with-trowel-outdoors-2026-04-13-02-28-05-utc.webp',
  'blog-cracks.webp': 'worker-drilling-into-concrete-with-power-drill-2026-03-16-02-31-05-utc.webp'
};

let copied = 0;
for (const [targetName, srcName] of Object.entries(imageMapping)) {
  const fullSrc = path.join(srcDir, srcName);
  const fullDest = path.join(destDir, targetName);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, fullDest);
    copied++;
  } else {
    console.warn(`File not found: ${srcName}`);
  }
}

console.log(`Successfully copied ${copied} images to public/images/`);
