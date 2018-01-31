import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable()
export class UsersService {
  private apiBaseUrl = environment.apiBaseUrl + '/user';

  constructor(private httpClient: HttpClient) {}

  public list(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.apiBaseUrl)
      .map((entities: User[]) =>
        entities.map((entity: User) => new User(entity))
      );
  }

  public get(id: string): Observable<User> {
    return this.httpClient
      .get<User>(this.apiBaseUrl + '/' + id)
      .map((entity: User) => new User(entity));
  }
}
