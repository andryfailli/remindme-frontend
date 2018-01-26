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
      [AuthService, SubscriptionsService, Router],
      (
        service: AuthService,
        subscriptionsService: SubscriptionsService,
        router: Router
      ) => {
        const ID_TOKEN_MOCK = 'ID_TOKEN_MOCK';
        const userMock = new User({ id: 'id' });

        let onMessageHandler;

        const messagingMock = {
          requestPermission: () => Observable.of().toPromise(),
          getToken: () => Observable.of(ID_TOKEN_MOCK).toPromise(),
          onMessage: (_onMessageHandler) =>
            (onMessageHandler = _onMessageHandler)
        };

        spyOn(messagingMock, 'requestPermission').and.callThrough();
        spyOn(messagingMock, 'getToken').and.callThrough();
        spyOn(messagingMock, 'onMessage').and.callThrough();
        spyOn(firebase, 'messaging').and.returnValue(messagingMock);
        spyOn(subscriptionsService, 'save').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();

        service.setupMessaging(userMock).then(() => {
          expect(messagingMock.requestPermission).toHaveBeenCalled();
          expect(messagingMock.getToken).toHaveBeenCalled();
          expect(messagingMock.onMessage).toHaveBeenCalled();
          expect(subscriptionsService.save).toHaveBeenCalled();

          expect(onMessageHandler).toBeTruthy();

          const reminderIdMock = 'REMINDER_ID_MOCK';
          const notificationPayloadMock = {
            data: {
              title: 'TITLE_MOCK',
              click_action:
                'https://remindme.apps.andreafailli.it/inbox;reminder=' +
                reminderIdMock
            }
          };
          const notification: Notification = onMessageHandler(
            notificationPayloadMock
          );
          expect(notification.title).toBe(notificationPayloadMock.data.title);
          expect(notification.onclick).toBeTruthy();

          notification.onclick(null);
          expect(router.navigate).toHaveBeenCalledWith([
            '/inbox',
            { reminder: reminderIdMock }
          ]);
        });
      }
    )
  );
});
