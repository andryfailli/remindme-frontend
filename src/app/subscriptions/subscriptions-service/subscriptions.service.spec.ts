import { inject, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Subscription } from '../../models/subscription.model';
import { subscriptionsMockData } from './subscriptions-mock-data';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionsService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(
    inject([HttpTestingController], (httpClientMock: HttpTestingController) => {
      httpClientMock.verify();
    })
  );

  it(
    'should be created',
    inject([SubscriptionsService], (service: SubscriptionsService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should delete',
    inject(
      [SubscriptionsService, HttpTestingController],
      (
        service: SubscriptionsService,
        httpClientMock: HttpTestingController
      ) => {
        const subscription = subscriptionsMockData[0];

        service.delete(subscription).subscribe(() => undefined);

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + subscription.id
        );
        expect(request.request.method).toEqual('DELETE');
        request.flush(null);
      }
    )
  );

  it(
    'should save',
    inject(
      [SubscriptionsService, HttpTestingController],
      (
        service: SubscriptionsService,
        httpClientMock: HttpTestingController
      ) => {
        const subscription = subscriptionsMockData[0];

        service
          .save(subscription)
          .subscribe((subscriptionResponse: Subscription) =>
            expect(subscriptionResponse).toEqual(subscription)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + subscription.id
        );
        expect(request.request.method).toEqual('POST');
        request.flush(subscription);
      }
    )
  );
});
