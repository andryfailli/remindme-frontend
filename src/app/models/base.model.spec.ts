import { Base } from './base.model';

describe('Base', () => {
  it('should be truthy using no arg constructor', () => {
    const base = new Base();
    expect(base).toBeTruthy();
  });
  it('should assign values passed to constructor', () => {
    const value = 'my-id';
    const base = new Base({ id: value });
    expect(base.id).toEqual(value);
  });
});
