import { ZeussProfesorPage } from './app.po';

describe('zeuss-profesor App', () => {
  let page: ZeussProfesorPage;

  beforeEach(() => {
    page = new ZeussProfesorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
