import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users-service/users.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SubscriptionsService } from '../subscriptions/subscriptions-service/subscriptions.service';

import * as firebase from 'firebase/app';
import { User } from '../models/user.model';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {}
        },
        {
          provide: SubscriptionsService,
          useValue: {
            save: () => Observable.of(null)
          }
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

  it(
    'should setup messaging',
    inject(
      [AuthService, SubscriptionsService],
      (service: AuthService, subscriptionsService: SubscriptionsService) => {
        const ID_TOKEN_MOCK = 'ID_TOKEN_MOCK';
        const userMock = new User({ id: 'id' });

        spyOn(firebase, 'messaging').and.returnValue({
          requestPermission: () => Observable.of().toPromise(),
          getToken: () => Observable.of(ID_TOKEN_MOCK).toPromise()
        });
        spyOn(subscriptionsService, 'save').and.callThrough();
        service
          .setupMessaging(userMock)
          .then(() => expect(subscriptionsService.save).toHaveBeenCalled());
      }
    )
  );
});
