import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UsersService {
  constructor() {}

  public list(): Observable<User[]> {
    const u1 = new User({
      id: 1,
      name: 'Pinco',
      photoUrl:
        'https://lh3.googleusercontent.com/-ZFdmXbzeue0/AAAAAAAAAAI/AAAAAAAAAAA/AA6ZPT7VXXXjeDJgJ8FOKBGKERe2QpbBqw/s64-c-mo/photo.jpg'
    });

    const u21 = new User({
      id: 2,
      name: 'Pallino',
      photoUrl:
        'https://lh3.googleusercontent.com/-ZFdmXbzeue0/AAAAAAAAAAI/AAAAAAAAAAA/AA6ZPT7VXXXjeDJgJ8FOKBGKERe2QpbBqw/s64-c-mo/photo.jpg'
    });

    return Observable.of([u1, u21]);
  }
}
