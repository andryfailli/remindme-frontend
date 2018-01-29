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
}
