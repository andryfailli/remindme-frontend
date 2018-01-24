import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth-service/auth.service';

import { User } from '../models/user.model';
import { AuthHttpInterceptor } from './auth-http.interceptor';

import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../../environments/environment';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

class NoOpHttpHandler implements HttpHandler {
  constructor() {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return Observable.of(null);
  }
}

describe('AuthHttpInterceptor', () => {
  const ID_TOKEN_MOCK = 'ID_TOKEN_MOCK';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthHttpInterceptor,
        {
          provide: AngularFireAuth,
          useValue: {
            authState: Observable.of({
              getIdToken: () => Observable.of(ID_TOKEN_MOCK).toPromise()
            })
          }
        }
      ]
    });
  });

  it(
    'should be created',
    inject(
      [AuthHttpInterceptor],
      (authHttpInterceptor: AuthHttpInterceptor) => {
        expect(authHttpInterceptor).toBeTruthy();
      }
    )
  );

  it(
    'should intercept',
    inject(
      [AuthHttpInterceptor],
      (authHttpInterceptor: AuthHttpInterceptor) => {
        const angularFireAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
        const request: HttpRequest<any> = new HttpRequest(
          'GET',
          environment.apiBaseUrl
        );
        const handler: HttpHandler = new NoOpHttpHandler();

        spyOn(request, 'clone').and.callThrough();
        spyOn(handler, 'handle').and.callThrough();

        authHttpInterceptor.intercept(request, handler).subscribe(() => {
          expect(handler.handle).toHaveBeenCalled();
          expect(request.clone).toHaveBeenCalledWith({
            setHeaders: { 'X-Authorization-Firebase': ID_TOKEN_MOCK }
          });
        });
      }
    )
  );

  it(
    'should not intercept',
    inject(
      [AuthHttpInterceptor],
      (authHttpInterceptor: AuthHttpInterceptor) => {
        const angularFireAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
        const request: HttpRequest<any> = new HttpRequest('GET', '/');
        const handler: HttpHandler = new NoOpHttpHandler();

        spyOn(request, 'clone').and.callThrough();
        spyOn(handler, 'handle').and.callThrough();

        authHttpInterceptor.intercept(request, handler).subscribe(() => {
          expect(handler.handle).toHaveBeenCalled();
          expect(request.clone).toHaveBeenCalledTimes(0);
        });
      }
    )
  );
});
