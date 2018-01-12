import { inject, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { Reminder } from '../../models/reminder.model';
import { remindersMockData } from './reminders-mock-data';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemindersService],
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
    inject([RemindersService], (service: RemindersService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should list inbox reminders',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        service
          .list(false)
          .subscribe((reminders: Reminder[]) =>
            expect(reminders).toEqual(remindersMockData)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '?archived=false'
        );
        expect(request.request.method).toEqual('GET');
        request.flush(remindersMockData);
      }
    )
  );

  it(
    'should list archived reminders',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        service
          .list(true)
          .subscribe((reminders: Reminder[]) =>
            expect(reminders).toEqual(remindersMockData)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '?archived=true'
        );
        expect(request.request.method).toEqual('GET');
        request.flush(remindersMockData);
      }
    )
  );

  it(
    'should get',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = remindersMockData[0];

        service
          .get(reminder.id)
          .subscribe((reminderRespone: Reminder) =>
            expect(reminderRespone).toEqual(reminder)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + reminder.id
        );
        expect(request.request.method).toEqual('GET');
        request.flush(reminder);
      }
    )
  );

  it(
    'should delete',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = remindersMockData[0];

        service.delete(reminder).subscribe(() => undefined);

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + reminder.id
        );
        expect(request.request.method).toEqual('DELETE');
        request.flush(null);
      }
    )
  );

  it(
    'should save (insert)',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = new Reminder({});

        service
          .save(reminder)
          .subscribe((reminderRespone: Reminder) =>
            expect(reminderRespone).toEqual(reminder)
          );

        const request = httpClientMock.expectOne(service['apiBaseUrl']);
        expect(request.request.method).toEqual('PUT');
        request.flush(reminder);
      }
    )
  );

  it(
    'should save (update)',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = remindersMockData[0];

        service
          .save(reminder)
          .subscribe((reminderRespone: Reminder) =>
            expect(reminderRespone).toEqual(reminder)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + reminder.id
        );
        expect(request.request.method).toEqual('POST');
        request.flush(reminder);
      }
    )
  );

  it(
    'should archive a reminder (update)',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = remindersMockData[0];
        reminder.archived = false;

        service
          .archive(reminder)
          .subscribe((reminderRespone: Reminder) =>
            expect(reminderRespone.archived).toEqual(true)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + reminder.id
        );
        expect(request.request.method).toEqual('POST');
        request.flush(reminder);
      }
    )
  );

  it(
    'should unarchive a reminder (update)',
    inject(
      [RemindersService, HttpTestingController],
      (service: RemindersService, httpClientMock: HttpTestingController) => {
        const reminder = remindersMockData[0];
        reminder.archived = true;

        service
          .unarchive(reminder)
          .subscribe((reminderRespone: Reminder) =>
            expect(reminderRespone.archived).toEqual(false)
          );

        const request = httpClientMock.expectOne(
          service['apiBaseUrl'] + '/' + reminder.id
        );
        expect(request.request.method).toEqual('POST');
        request.flush(reminder);
      }
    )
  );
});
