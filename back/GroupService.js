import db from './firebase';

var userFirstName = ""
var userLastName = ""
var UserCity = ""

export const groupService = {
    async getMyGroups(userEmail) {
        try {
            const snapshot = await db.collection('Groups').where('leaderEmail', '==', userEmail).get();
            const groups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return groups;
        } catch (error) {
            console.error("Error fetching groups: ", error);
            throw error;
        }
    },
    async addGroup(groupData) {
        try {
            const docRef = await db.collection('groups').add(groupData);
            return docRef.id; // Returns the newly created document's ID
        } catch (error) {
            console.error('Error adding group: ', error);
            throw new Error(error);
        }
    },
};





// var userFirstName = ""
// var userLastName = ""
// var UserCity = ""

//   const userEmail = auth.currentUser.email;
//   const userDocRef = db.collection('Users').doc(userEmail)
//   // const userName = userDoc.FirstName
//   userDocRef.get()
//     .then(docSnapshot => {
//       if (docSnapshot.exists) {
//         const userData = docSnapshot.data();
//         // const firstName = userData.FirstName; // Accessing the 'FirstName' field
//         firstName = userData.FirstName; // Accessing the 'FirstName' field
//         console.log("User's first name:", firstName);
//         // Do something with firstName
//       } else {
//         // Handle the case where the document does not exist
//         console.log('No such document!');
//       }
//     })
//     .catch(error => {
//       // Handle any errors in fetching document
//       console.error("Error fetching document:", error);
//     });
    

//     const navigation = useNavigation()

//     const backButton = () => {
//       try {
//         navigation.replace("Home");
//       } catch (error) {
//         alert(error.message);
//       }
//   }