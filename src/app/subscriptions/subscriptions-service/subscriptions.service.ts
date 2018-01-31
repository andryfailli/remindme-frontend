import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { Subscription } from '../../models/subscription.model';

@Injectable()
export class SubscriptionsService {
  private apiBaseUrl = environment.apiBaseUrl + '/subscription';

  constructor(private httpClient: HttpClient) {}

  public save(subscription: Subscription): Observable<Subscription> {
    return this.httpClient
      .post<Subscription>(this.apiBaseUrl + '/' + subscription.id, subscription)
      .map((entity: Subscription) => new Subscription(entity));
  }

  public delete(subscription: Subscription): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiBaseUrl + '/' + subscription.id
    );
  }
}
