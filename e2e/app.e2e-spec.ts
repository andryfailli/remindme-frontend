import { browser } from 'protractor';

import { AppPage } from './app.po';

describe('remindme-frontend App', () => {
  it('should display main toolbar title', async () => {
    const app = new AppPage();
    await app.navigateTo();

    expect(app.getMainToolbar()).toBeTruthy();
    expect(app.getMainToolbarText()).toEqual('Remind Me!');
  });

  it('should login with email and password', async () => {
    const app = new AppPage();

    expect(browser.params.userEmail).toBeTruthy();
    expect(browser.params.userPassword).toBeTruthy();

    await app.navigateTo();

    await app.getLoginEmailField().sendKeys(browser.params.userEmail);
    await app.getLoginPasswordField().sendKeys(browser.params.userPassword);
    await app.getLoginSignInButton().click();

    await browser.sleep(30000); // wait firebase...

    const url = await browser.getCurrentUrl();
    expect(url.endsWith('/inbox')).toBe(true, url);
  });
});
