import * as electron from 'electron';
import { Application } from 'spectron';

export { Application };

export default function createApp() {
  return new Application({
    path: '' + electron,
    args: ['dist/main.js'],
    startTimeout: 20e3,
    waitTimeout: 20e3,
  });
}
