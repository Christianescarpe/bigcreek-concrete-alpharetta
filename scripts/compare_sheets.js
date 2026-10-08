const xlsx = require('xlsx');
const wbOld = xlsx.readFile('sheet.xlsx');
const wbNew = xlsx.readFile('sheet_new.xlsx');

console.log('Old Sheet Names:', wbOld.SheetNames);
console.log('New Sheet Names:', wbNew.SheetNames);

for (const name of wbNew.SheetNames) {
  const oldSheet = wbOld.Sheets[name];
  const newSheet = wbNew.Sheets[name];
  const oldRows = oldSheet ? xlsx.utils.sheet_to_json(oldSheet) : [];
  const newRows = xlsx.utils.sheet_to_json(newSheet);
  console.log(`Sheet "${name}": Old rows = ${oldRows.length}, New rows = ${newRows.length}`);

  if (newRows.length !== oldRows.length) {
    console.log(`DIFFERENCE IN ROWS FOR ${name}!`);
  }

  // Print all titles and slugs in newSheet
  newRows.forEach((r, idx) => {
    console.log(`[${idx + 1}] Title: "${r['Page Title']}" | Slug: "${r['URL Slug']}"`);
  });
}
