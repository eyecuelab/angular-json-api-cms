import { CMSPage } from './app.po';

describe('CMS App', () => {
  let page: CMSPage;

  beforeEach(() => {
    page = new CMSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
