import UserService from '../../back/UserService';
import { db, auth } from '../../back/firebase';


test('Creating a new user account and verifying it added to Firestore db', async () => {
    const email = 'UnitTestUser@gmail.com';
    const password = 'password123';
    const firstName = 'Oren';
    const lastName = 'Hazan';
    const city = 'Ariel';
    const gender = 'Male';
    const age = 55;
  
    const result = await UserService.createUserAccount(email, password, firstName, lastName, city, gender, age);
    
    expect(result).toBe(true);
  
    const userDoc = await db.collection('Users').doc(email).get();
    expect(userDoc.exists).toBe(true);
    
    const userData = userDoc.data();
    expect(userData.FirstName).toBe(firstName);
    expect(userData.LastName).toBe(lastName);
    expect(userData.City).toBe(city);
    expect(userData.Gender).toBe(gender);
    expect(userData.Age).toBe(age);
  });