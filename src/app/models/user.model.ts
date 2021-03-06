import { Base } from './base.model';

export class User extends Base {
  name: string;
  email: string;
  photoUrl: string;

  constructor(object: object = {}) {
    super(object);
  }
}
