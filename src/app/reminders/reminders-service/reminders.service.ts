import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Reminder } from '../../models/reminder.model';
import { User } from '../../models/user.model';

import { environment } from '../../../environments/environment';
import { remindersMockData } from './reminders-mock-data';

@Injectable()
export class RemindersService {
  private apiBaseUrl = environment.apiBaseUrl + '/reminder';

  constructor(private httpClient: HttpClient) {}

  public get(id: string): Observable<Reminder> {
    return this.httpClient.get<Reminder>(this.apiBaseUrl + '/' + id);
  }

  public list(archived: boolean): Observable<Reminder[]> {
    return this.httpClient
      .get<Reminder[]>(this.apiBaseUrl + '?archived=' + archived.toString())
      .map((entities: Reminder[]) =>
        entities.map((entity: Reminder) => new Reminder(entity))
      );
  }

  public save(reminder: Reminder): Observable<Reminder> {
    return reminder.id
      ? this.httpClient.post<Reminder>(
          this.apiBaseUrl + '/' + reminder.id,
          reminder
        )
      : this.httpClient
          .put<Reminder>(this.apiBaseUrl, reminder)
          .map((entity: Reminder) => new Reminder(entity));
  }

  public delete(reminder: Reminder): Observable<void> {
    return this.httpClient.delete<void>(this.apiBaseUrl + '/' + reminder.id);
  }

  public archive(reminder: Reminder): Observable<Reminder> {
    reminder.archived = true;
    return this.save(reminder);
  }

  public unarchive(reminder: Reminder): Observable<Reminder> {
    reminder.archived = false;
    return this.save(reminder);
  }
}
