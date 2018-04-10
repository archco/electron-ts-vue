const fs = require('fs-extra');

fs.emptyDir('dist')
  .then(() => {
    fs.ensureFileSync('dist/.gitkeep');
    console.log('Clear dist/');
  })
  .catch(err => console.error(err));
