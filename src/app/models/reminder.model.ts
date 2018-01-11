import { Base } from './base.model';
import { User } from './user.model';

export class Reminder extends Base {
  date: string;
  title: string;
  user: User;
  archived = false;

  constructor(object: object = {}) {
    super(object);
    if ('user' in object) {
      Object.assign(this.user, new User(object['user']));
    }
  }

  public isPast() {
    return new Date().getTime() > new Date(Date.parse(this.date)).getTime();
  }
}
