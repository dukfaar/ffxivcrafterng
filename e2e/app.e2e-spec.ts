import { FfxivcrafterngPage } from './app.po';

describe('ffxivcrafterng App', () => {
  let page: FfxivcrafterngPage;

  beforeEach(() => {
    page = new FfxivcrafterngPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
