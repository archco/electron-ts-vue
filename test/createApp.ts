import { resolve } from 'path';
import { Application } from 'spectron';

const rootDir = resolve(__dirname, '..');
let electronPath = `${rootDir}/node_modules/.bin/electron`;
if (process.platform === 'win32') {
  electronPath += '.cmd';
}

export { Application };

export default function createApp() {
  return new Application({
    path: electronPath,
    args: [rootDir],
    env: { NODE_ENV: 'test' },
    waitTimeout: 10e3,
  });
}
