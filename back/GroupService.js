// import db from './firebase';

// var userFirstName = ""
// var userLastName = ""
// var UserCity = ""i

// export const groupService = {
//     async getMyGroups(userEmail) {
//         try {
//             const snapshot = await db.collection('Groups').where('leaderEmail', '==', userEmail).get();
//             const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             return groups;
//         } catch (error) {
//             console.error("Error fetching groups: ", error);
//             throw error;
//         }
//     },
//     async addGroup(groupData) {
//         try {
//             const docRef = await db.collection('groups').add(groupData);
//             return docRef.id; // Returns the newly created document's ID
//         } catch (error) {
//             console.error('Error adding group: ', error);
//             throw new Error(error);
//         }
//     },
// };
