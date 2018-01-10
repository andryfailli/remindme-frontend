export class Base {
  id: string;

  constructor(object: Object = {}) {
    Object.assign(this, object);
  }
}
