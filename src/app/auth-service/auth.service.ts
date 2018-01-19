import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { UsersService } from '../users/users-service/users.service';

@Injectable()
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private userService: UsersService
  ) {
    this.user$ = this.angularFireAuth.authState.switchMap((user) => {
      if (user) {
        return userService.get('me');
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
}
