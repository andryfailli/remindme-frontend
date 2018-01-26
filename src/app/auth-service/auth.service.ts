import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Subscription } from '../models/subscription.model';
import { SubscriptionsService } from '../subscriptions/subscriptions-service/subscriptions.service';

import { User } from '../models/user.model';
import { UsersService } from '../users/users-service/users.service';

@Injectable()
export class AuthService {
  user$: Observable<User | null>;
  private _user$: Observable<User | null>;
  private _user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private userService: UsersService,
    private subscriptionsService: SubscriptionsService
  ) {
    this.user$ = this.angularFireAuth.authState.switchMap(
      (firebaseUser: firebase.User) => {
        if (firebaseUser) {
          if (!this._user || this._user.id !== firebaseUser.uid) {
            this._user$ = userService.get('me').share();
            this._user$.subscribe((user: User) => {
              this.setupMessaging(user);
              this._user = user;
            });
          }
        } else {
          this._user = null;
          this._user$ = Observable.of(null);
        }
        return this._user$;
      }
    );
  }

  signIn(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }

  signOut(): Promise<any> {
    const promise = this.angularFireAuth.auth.signOut();
    promise.then(() => {
      this.router.navigate(['/']);
    });
    return promise;
  }

  setupMessaging(user: User): Promise<any> {
    const messaging = firebase.messaging();

    messaging.onMessage((payload: any) => {
      const options: NotificationOptions = {
        icon: '/favicon.png'
      };
      const notification: Notification = new Notification(
        payload.data.title,
        options
      );
      if (payload.data.click_action) {
        notification.onclick = () => {
          const reminderId = payload.data.click_ation.split('=')[1];
          this.router.navigate(['/inbox', { reminder: reminderId }]);
        };
      }

      return notification;
    });

    return messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        this.subscriptionsService
          .save(new Subscription({ id: token, userId: user.id }))
          .toPromise()
          .then(() => null);
      });
  }
}
