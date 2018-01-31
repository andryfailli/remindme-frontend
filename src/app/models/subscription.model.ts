import { Base } from './base.model';

export class Subscription extends Base {
  userId: string;

  constructor(object: object = {}) {
    super(object);
  }
}
