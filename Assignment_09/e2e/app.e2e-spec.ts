import { Assignment09Page } from './app.po';

describe('assignment-09 App', function() {
  let page: Assignment09Page;

  beforeEach(() => {
    page = new Assignment09Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
