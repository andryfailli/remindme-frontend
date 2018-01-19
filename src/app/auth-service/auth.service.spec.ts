import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users-service/users.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

describe('AuthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {}
        },
        {
          provide: AngularFireAuth,
          useValue: {
            authState: Observable.of(null),
            auth: {
              signInWithPopup: () => Observable.of(null).toPromise(),
              signOut: () => Observable.of(null).toPromise()
            }
          }
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
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should signIn',
    inject(
      [AuthService, AngularFireAuth],
      (service: AuthService, angularFireAuth: AngularFireAuth) => {
        spyOn(angularFireAuth.auth, 'signInWithPopup');
        service.signIn();
        expect(angularFireAuth.auth.signInWithPopup).toHaveBeenCalled();
      }
    )
  );

  it(
    'should signOut',
    inject(
      [AuthService, AngularFireAuth, Router],
      (
        service: AuthService,
        angularFireAuth: AngularFireAuth,
        router: Router
      ) => {
        spyOn(angularFireAuth.auth, 'signOut').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();
        service
          .signOut()
          .then(() => expect(router.navigate).toHaveBeenCalledWith(['/']));
        expect(angularFireAuth.auth.signOut).toHaveBeenCalled();
      }
    )
  );
});
