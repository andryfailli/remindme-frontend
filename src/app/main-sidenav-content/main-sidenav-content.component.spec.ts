import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidenavContentComponent } from './main-sidenav-content.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MainSidenavContentComponent', () => {
  let component: MainSidenavContentComponent;
  let fixture: ComponentFixture<MainSidenavContentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MainSidenavContentComponent],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigate onClick', () => {
    const linkElement: DebugElement = fixture.debugElement.query(By.css('a'));
    let emitted;
    component.navigate.subscribe(() => (emitted = true));
    linkElement.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });
});
