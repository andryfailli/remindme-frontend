import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../auth-service/auth.service';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [RouterTestingModule.withRoutes([])],
        providers: [
          {
            provide: AuthService,
            useValue: {
              signIn: () => Observable.of(new User()).toPromise(),
              signOut: () => Observable.of(null).toPromise()
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

  it('should signIn', () => {
    const router: Router = TestBed.get(Router);
    const authService: AuthService = TestBed.get(AuthService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authService, 'signIn').and.callThrough();
    component
      .signIn()
      .then(() => expect(router.navigate).toHaveBeenCalledWith(['/']));
    expect(authService.signIn).toHaveBeenCalled();
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
