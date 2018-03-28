import createApp, { Application } from '../createApp';

let app: Application;

beforeEach(() => {
  app = createApp();
  return app.start();
}, 10e3);

afterEach(() => {
  return app.stop();
});

describe('#Application', () => {
  describe('Launch', () => {
    it('shows an initial window.', async () => {
      const count = await app.client.getWindowCount();
      expect(count).toEqual(1);
    });

    it('window is visible.', async () => {
      const isVisible = await app.browserWindow.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});
