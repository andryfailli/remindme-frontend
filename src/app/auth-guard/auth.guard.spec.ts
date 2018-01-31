import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth-service/auth.service';
import { AuthGuard } from './auth.guard';

import { User } from '../models/user.model';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {}
        },
        {
          provide: Router,
          useValue: {
            navigate: () => Observable.of(true).toPromise()
          }
        }
      ]
    });
  });

  it(
    'should be created',
    inject([AuthGuard], (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    })
  );

  it(
    'should activate if authenticated',
    inject(
      [AuthGuard, AuthService, Router],
      (guard: AuthGuard, authService: AuthService, router: Router) => {
        spyOn(router, 'navigate');
        authService.user$ = Observable.of(new User());
        (guard.canActivate(null, null) as Observable<boolean>).subscribe(
          (result) => {
            expect(result).toBe(true);
            expect(router.navigate).toHaveBeenCalledTimes(0);
          }
        );
      }
    )
  );

  it(
    'should not activate if not authenticated (navigate to login)',
    inject(
      [AuthGuard, AuthService, Router],
      (guard: AuthGuard, authService: AuthService, router: Router) => {
        spyOn(router, 'navigate');
        authService.user$ = Observable.of(null);
        (guard.canActivate(null, null) as Observable<boolean>).subscribe(
          (result) => {
            expect(result).toBe(false);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
          }
        );
      }
    )
  );
});
