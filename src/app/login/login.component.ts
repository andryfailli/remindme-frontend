import { AuthService } from '../auth-service/auth.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$.share();
  }

  signIn(): Promise<any> {
    const promise = this.authService.signIn();
    promise.then(() => this.router.navigate(['/']));
    return promise;
  }

  signOut(): Promise<any> {
    const promise = this.authService.signOut();
    promise.then(() => this.router.navigate(['/']));
    return promise;
  }
}
