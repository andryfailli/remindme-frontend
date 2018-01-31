import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.ignoreSynchronization = true;
    return browser.get('/');
  }

  getMainToolbar() {
    return element(by.css('app-main-toolbar'));
  }

  getMainToolbarText() {
    return element(by.css('app-main-toolbar .app-title')).getText();
  }

  getLoginButton() {
    return element(by.css('.login-btn'));
  }

  getLoginEmailField() {
    return element(by.css('app-login-form [type=email]'));
  }

  getLoginPasswordField() {
    return element(by.css('app-login-form [type=password]'));
  }

  getLoginSignInButton() {
    return element(by.css('app-login-form [type=submit]'));
  }
}
