var zipFolder = require('zip-folder');
var manifest = require(__dirname + '/../dist/manifest.json');

zipFolder(__dirname + '/../dist', __dirname + '/../packages/unload_' + manifest.version + '.zip', function (err) {
  if (err) {
    console.log('Zipping extension failed.', err);
  } else {
    console.log('Zipping extension successful.');
  }
});
