import { inject, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { User } from '../../models/user.model';
import { usersMockData } from './users-mock-data';
import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
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
    inject([UsersService], (service: UsersService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should list',
    inject(
      [UsersService, HttpTestingController],
      (service: UsersService, httpClientMock: HttpTestingController) => {
        service
          .list()
          .subscribe((users: User[]) => expect(users).toEqual(usersMockData));

        const request = httpClientMock.expectOne(service['apiBaseUrl']);
        expect(request.request.method).toEqual('GET');
        request.flush(usersMockData);
      }
    )
  );
});
