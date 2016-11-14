import { MarsPage } from './app.po';

describe('mars App', function() {
  let page: MarsPage;

  beforeEach(() => {
    page = new MarsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
