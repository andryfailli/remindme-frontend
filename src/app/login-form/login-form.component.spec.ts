import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const usersServiceStub = {
    list: () => undefined
  };

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [LoginFormComponent],
        schemas: [NO_ERRORS_SCHEMA],
        providers: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit if form is submitted', () => {
    const formEl: DebugElement = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();

    expect(formEl).toBeTruthy();

    let emitted = false;
    component.submit.subscribe(() => (emitted = true));
    formEl.triggerEventHandler('submit', null);
    expect(emitted).toEqual(true);
  });
});
