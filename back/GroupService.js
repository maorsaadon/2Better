import db from './firebase';

export const groupService = {
    async getMyGroups(userId) {
        try {
            const snapshot = await db.collection('groups').where('leaderId', '==', userId).get();
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
