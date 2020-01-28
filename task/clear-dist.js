const fs = require('fs-extra');

(async () => {
  await fs.emptyDir('dist');
  fs.ensureFileSync('dist/.gitkeep');
  console.log('clear dist/');
})();
