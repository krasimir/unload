const fs = require('fs');

const manifestJSON = require(__dirname + '/../dist/manifest.json');
const packageJSON = require(__dirname + '/../package.json');
const parts = packageJSON.version.split('.').map(n => Number(n));

parts[parts.length - 1] += 1;
manifestJSON.version = packageJSON.version = parts.join('.');

fs.writeFileSync(__dirname + '/../dist/manifest.json', JSON.stringify(manifestJSON, null, 2));
fs.writeFileSync(__dirname + '/../package.json', JSON.stringify(packageJSON, null, 2));

console.log('manifest.json and package.json files updated.');
