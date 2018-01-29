import { AppPage } from './app.po';

describe('remindme-frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display main toolbar title', () => {
    page.navigateTo();
    expect(page.getMainToolbar()).toBeTruthy();
    expect(page.getMainToolbarText()).toEqual('Remind Me!');
  });
});
