import { User } from './user.model';

describe('User', () => {
  it('should be truthy using no arg constructor', () => {
    const user = new User();
    expect(user).toBeTruthy();
  });
  it('should assign values passed to constructor', () => {
    const value = 'my name';
    const user = new User({ name: value });
    expect(user.name).toEqual(value);
  });
});
