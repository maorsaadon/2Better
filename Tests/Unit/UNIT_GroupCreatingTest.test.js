import GroupService from '../../back/GroupService';
import { db } from '../back/firebase';

test('Creating a new group and verifying it added to Firestore db', async () => {
  const groupName = 'Test Group - Unit';
  const city = 'Ariel';
  const sportType = 'Football';
  const leaderEmail = 'UnitTestUser@gmail.com';

  await GroupService.handleAddNewGroup(groupName, city, sportType, leaderEmail);

  const groupDoc = await db.collection('Groups').doc(groupName).get();
  expect(groupDoc.exists).toBe(true);

  const groupData = groupDoc.data();
  expect(groupData.GroupName).toBe(groupName);
  expect(groupData.City).toBe(city);
  expect(groupData.SportType).toBe(sportType);
  expect(groupData.LeaderEmail).toBe(leaderEmail);
});