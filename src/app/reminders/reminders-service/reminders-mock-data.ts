import { Reminder } from '../../models/reminder.model';
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

const rem1 = new Reminder({
  id: 1,
  title: 'test reminder 1',
  date: '2017-11-12T05:10',
  archived: true,
  user: u1
});
const rem2 = new Reminder({
  id: 1,
  title: 'test reminder 1',
  date: '2017-12-13T10:10',
  archived: false,
  user: u1
});
const rem3 = new Reminder({
  id: 2,
  title: 'test reminder 2',
  date: '2118-01-13T10:10',
  archived: false,
  user: u2
});

export const remindersMockData = [rem1, rem2, rem3];
