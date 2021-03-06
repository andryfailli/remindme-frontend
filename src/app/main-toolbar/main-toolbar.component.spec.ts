import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth-service/auth.service';
import { User } from '../models/user.model';
import { MainToolbarComponent } from './main-toolbar.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('MainToolbarComponent', () => {
  let component: MainToolbarComponent;
  let fixture: ComponentFixture<MainToolbarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MainToolbarComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          {
            provide: AuthService,
            useValue: {
              user$: Observable.of(new User())
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MainToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigate onClick', () => {
    const buttonElement: DebugElement = fixture.debugElement.query(
      By.css('button')
    );
    let emitted;
    component.toggleSidenav.subscribe(() => (emitted = true));
    buttonElement.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });
});
