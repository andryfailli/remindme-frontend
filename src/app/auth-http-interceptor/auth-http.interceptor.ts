import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private angularFireAuth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return request.url.startsWith(environment.apiBaseUrl)
      ? this.angularFireAuth.authState.switchMap((user) =>
          Observable.fromPromise(user.getIdToken()).mergeMap((idToken) => {
            if (user) {
              request = request.clone({
                setHeaders: { 'X-Authorization-Firebase': idToken }
              });
            }

            return next.handle(request);
          })
        )
      : next.handle(request);
  }
}
