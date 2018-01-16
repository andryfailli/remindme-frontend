import { User } from '../../models/user.model';

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

export const usersMockData = [u1, u2];
