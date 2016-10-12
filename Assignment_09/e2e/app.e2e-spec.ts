import { Assignment09aPage } from './app.po';

describe('assignment-09a App', function() {
  let page: Assignment09aPage;

  beforeEach(() => {
    page = new Assignment09aPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
