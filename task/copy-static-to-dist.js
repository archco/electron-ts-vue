const globOrigin = require('glob');
const fs = require('fs-extra');
const path = require('path');

/**
 * Glob promise.
 * 
 * @param {string} pattern 
 * @param {any} options 
 * @returns {Promise.<string[], Error>}
 */
function glob(pattern, options) {
  return new Promise((resolve, reject) => {
    globOrigin(pattern, options, (err, files) => {
      err === null ? resolve(files) : reject(err);
    });
  });
}

(async function () {
  // remove old html files.
  const oldFiles = await glob('dist/*.html');
  for (const file of oldFiles) {
    await fs.remove(file);
  }

  // copy static files.
  const files = await glob('src/renderer/*.*');
  for (const file of files) {
    const dest = `dist/${path.parse(file).base}`;
    await fs.copy(file, dest);
    console.log(`Copy ${file} to ${dest}.`);
  }
})();
