import { Subscription } from './subscription.model';

describe('Subscription', () => {
  it('should be truthy using no arg constructor', () => {
    const user = new Subscription();
    expect(user).toBeTruthy();
  });

  it('should assign values passed to constructor', () => {
    const userId = 'user-id';
    const subscription = new Subscription({ userId });
    expect(subscription.userId).toEqual(userId);
  });
});
