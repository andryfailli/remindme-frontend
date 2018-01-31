import { NO_ERRORS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../auth-service/auth.service';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  const USER_EMAIL_MOCK = 'USER_EMAIL_MOCK';
  const USER_PASSWORD_MOCK = 'USER_PASSWORD_MOCK';

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [
          {
            provide: AuthService,
            useValue: {
              signInWithGoogle: () => Observable.of(new User()).toPromise(),
              signInWithEmailAndPassword: () =>
                Observable.of(new User()).toPromise(),
              signOut: () => Observable.of(null).toPromise(),
              user$: Observable.of(new User())
            }
          },
          {
            provide: Router,
            useValue: {
              navigate: () => Observable.of(true).toPromise()
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signInWithGoogle', () => {
    const router: Router = TestBed.get(Router);
    const authService: AuthService = TestBed.get(AuthService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authService, 'signInWithGoogle').and.callThrough();
    component
      .signInWithGoogle()
      .then(() => expect(router.navigate).toHaveBeenCalledWith(['/']));
    expect(authService.signInWithGoogle).toHaveBeenCalled();
  });

  it('should signInWithEmailAndPassword', () => {
    const router: Router = TestBed.get(Router);
    const authService: AuthService = TestBed.get(AuthService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authService, 'signInWithEmailAndPassword').and.callThrough();
    component
      .signInWithEmailAndPassword({
        email: USER_EMAIL_MOCK,
        password: USER_PASSWORD_MOCK
      })
      .then(() => expect(router.navigate).toHaveBeenCalledWith(['/']));
    expect(authService.signInWithEmailAndPassword).toHaveBeenCalledWith(
      USER_EMAIL_MOCK,
      USER_PASSWORD_MOCK
    );
  });

  it('should signOut', () => {
    const router: Router = TestBed.get(Router);
    const authService: AuthService = TestBed.get(AuthService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authService, 'signOut').and.callThrough();
    component
      .signOut()
      .then(() => expect(router.navigate).toHaveBeenCalledWith(['/']));
    expect(authService.signOut).toHaveBeenCalled();
  });
});
