import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Reminder } from '../../models/reminder.model';
import { User } from '../../models/user.model';

@Injectable()
export class RemindersService {
  constructor() {}

  public get(id: string): Observable<Reminder> {
    const u1 = new User({
      id: 1,
      name: 'Pinco',
      photoUrl:
        'https://lh3.googleusercontent.com/-ZFdmXbzeue0/AAAAAAAAAAI/AAAAAAAAAAA/AA6ZPT7VXXXjeDJgJ8FOKBGKERe2QpbBqw/s64-c-mo/photo.jpg'
    });

    const rem = new Reminder({
      id: 1,
      title: 'test reminder',
      date: '2017-12-13T10:10',
      archived: false,
      user: u1
    });

    return Observable.of(rem);
  }

  public list(): Observable<Reminder[]> {
    const u1 = new User({
      id: 1,
      name: 'Pinco',
      photoUrl:
        'https://lh3.googleusercontent.com/-ZFdmXbzeue0/AAAAAAAAAAI/AAAAAAAAAAA/AA6ZPT7VXXXjeDJgJ8FOKBGKERe2QpbBqw/s64-c-mo/photo.jpg'
    });
    const u2 = new User({
      id: 2,
      name: 'Pallino',
      photoUrl:
        'https://lh3.googleusercontent.com/-ZFdmXbzeue0/AAAAAAAAAAI/AAAAAAAAAAA/AA6ZPT7VXXXjeDJgJ8FOKBGKERe2QpbBqw/s64-c-mo/photo.jpg'
    });

    const rem1 = new Reminder({
      id: 1,
      title: 'test reminder 1',
      date: '2017-12-13T10:10',
      archived: false,
      user: u1
    });
    const rem2 = new Reminder({
      id: 2,
      title: 'test reminder 2',
      date: '2018-01-13T10:10',
      archived: false,
      user: u2
    });

    return Observable.of([rem1, rem2]);
  }

  public save(reminder: Reminder): Observable<Reminder> {
    return Observable.of(reminder);
  }

  public delete(reminder: Reminder): Observable<Reminder> {
    return Observable.of(reminder);
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
