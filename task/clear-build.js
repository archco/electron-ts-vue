const fs = require('fs-extra');

(async () => {
  await fs.emptyDir('build');
  fs.ensureFileSync('build/.gitkeep');
  console.log('clear build/');
})();
