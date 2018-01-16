import { Subscription } from '../../models/subscription.model';

const s1 = new Subscription({
  id: '1',
  userId: 'a'
});

const s2 = new Subscription({
  id: '2',
  userId: 'b'
});

export const subscriptionsMockData = [s1, s2];
