import UserService from '../../back/UserService';

jest.mock('../back/firebase', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({ NotificationCounter: 7 }),
    }),
  },
}));

test('fetch user notification counter', async () => {
  const notificationCount = await UserService.getUserNotificationCounter('UnitTestUser@gmail.com');
  expect(notificationCount).toBe(7);
});