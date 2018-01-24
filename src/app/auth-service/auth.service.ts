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

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private userService: UsersService,
    private subscriptionsService: SubscriptionsService
  ) {
    this.user$ = this.angularFireAuth.authState.switchMap((firebaseUser) => {
      if (firebaseUser) {
        const user$: Observable<User> = userService.get('me').share();
        user$.subscribe((user: User) => this.setupMessaging(user));
        return user$;
      } else {
        return Observable.of(null);
      }
    });
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
