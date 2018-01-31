export class Base {
  id: string;

  constructor(object: object = {}) {
    Object.assign(this, object);
  }
}
