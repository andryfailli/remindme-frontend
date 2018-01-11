import { Reminder } from './reminder.model';

describe('Reminder', () => {
  it('should be truthy using no arg constructor', () => {
    const reminder = new Reminder();
    expect(reminder).toBeTruthy();
  });
  it('should assign values passed to constructor', () => {
    const value = 'my title';
    const reminder = new Reminder({ title: value });
    expect(reminder.title).toEqual(value);
  });
  it('should assign values passed to constructor (achived)', () => {
    const value = true;
    const reminder = new Reminder({ archived: value });
    expect(reminder.archived).toEqual(value);
  });
  it('should be past if date is past', () => {
    const date = new Date(new Date().getTime() - 1000 * 3600).toISOString();
    const reminder = new Reminder({ date });
    expect(reminder.isPast()).toEqual(true);
  });
  it('should not be past if date is future', () => {
    const date = new Date(new Date().getTime() + 1000 * 3600).toISOString();
    const reminder = new Reminder({ date });
    expect(reminder.isPast()).toEqual(false);
  });
});
