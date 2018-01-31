import { User } from './user.model';

describe('User', () => {
  it('should be truthy using no arg constructor', () => {
    const user = new User();
    expect(user).toBeTruthy();
  });

  it('should assign values passed to constructor', () => {
    const name = 'my name';
    const email = 'email@example.com';
    const photoUrl = 'http://www.example.com/photo.jpg';
    const user = new User({ name, email, photoUrl });
    expect(user.name).toEqual(name);
    expect(user.email).toEqual(email);
    expect(user.photoUrl).toEqual(photoUrl);
  });
});
