import createApp, { Application } from '../createApp';

let app: Application;

beforeEach(() => {
  // FIXME: Empty terminals display on windows.
  // https://github.com/electron/spectron/issues/60
  app = createApp();
  return app.start();
});

afterEach(() => {
  return app.stop();
});

describe('#Application', () => {
  describe('Launch', () => {
    it('shows an initial window.', async () => {
      const count = await app.client.getWindowCount();
      expect(count).toEqual(2);
    });

    it('window is visible.', async () => {
      const isVisible = await app.browserWindow.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });
});
