//מאור צריכה להבין איך לקשר את זה למאגר הנתונים
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// // import { groupService } from '../services/GroupService';

// const MyGroupsScreen = ({ navigation }) => {
//     const [groups, setGroups] = useState([]);

//     useEffect(() => {
//         // Fetch groups from the service
//         const fetchGroups = async () => {
//             const userGroups = await groupService.getMyGroups();
//             setGroups(userGroups);
//         };

//         fetchGroups();
//     }, []);

//     const handleAddGroup = () => {
//         // Navigate to Add Group Screen
//         navigation.navigate('AddGroupScreen');
//     };

//     const handleViewGroupMeetings = (groupId) => {
//         // Navigate to Group Meetings Screen with groupId
//         navigation.navigate('GroupMeetingsScreen', { groupId });
//     };

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={groups}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.groupItem}>
//                         <Text style={styles.groupName}>{item.name}</Text>
//                         <Button
//                             title="Group Meetings"
//                             onPress={() => handleViewGroupMeetings(item.id)}
//                         />
//                     </View>
//                 )}
//             />
//             <Button title="Add a New Group" onPress={handleAddGroup} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     groupItem: {
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderWidth: 1,
//         borderColor: '#ddd',
//     },
//     groupName: {
//         fontSize: 18,
//     },
// });

// export default MyGroupsScreen;
