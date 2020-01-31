import createApp, { Application } from '../createApp';

let app: Application;

beforeEach(async () => {
  app = createApp();
  await app.start();
}, 20e3);

afterEach(async () => {
  if (app && app.isRunning()) {
    await app.stop();
  }
}, 20e3);

describe('#Application', () => {
  describe('Launch', () => {
    it('shows an initial window.', async () => {
      const count = await app.client.getWindowCount();
      expect(count).toEqual(1);
    });

    it('window is visible.', async () => {
      const isVisible = await app.browserWindow.isVisible();
      expect(isVisible).toBeTruthy();
      const title = await app.client.getTitle();
      expect(title).toBe('electron-ts-vue');
    });
  });
});
