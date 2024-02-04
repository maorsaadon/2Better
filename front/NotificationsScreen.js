// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { notificationService } from '../back/NotificationsService';
// import { useNavigation } from '@react-navigation/core'
// import { auth } from '../back/firebase'
// import myLogoPic from '../assets/2better-logo.jpg';

// // Screen to display user notifications
// const NotificationsScreen = () => {

//     //Aviv's Edit:
//     /************************************************* */
//     const navigation = useNavigation()

//     const backButton = () => {
//         try {
//             navigation.replace("Home");
//         } catch (error) {
//             alert(error.message);
//         }
//     }
//     /************************************************** */

//     const [notifications, setNotifications] = useState([]);

//     // Fetch user notifications when the component is mounted
//     useEffect(() => {
//         const fetchNotifications = async () => {
//             const userNotifications = await notificationService.getUserNotifications(userId);
//             setNotifications(userNotifications);
//         };

//         fetchNotifications();
//     }, []);

//     // Render each notification as a list item
//     const renderNotificationItem = ({ item }) => (
//         <View style={styles.notificationItem}>
//             <Text style={styles.notificationText}>{item.message}</Text>
//         </View>
//     );

//     return (
//         <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//             <View style={styles.container}>
//                 <TouchableOpacity
//                     onPress={backButton}
//                     style={styles.button}
//                 >
//                     <Text style={styles.buttonText}>Back</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.container}>
//                 <FlatList
//                     data={notifications}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={renderNotificationItem}
//                 />


//             </View>
//         </ImageBackground>
//     );
// };

// // Styles for the NotificationsScreen
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     notificationItem: {
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     notificationText: {
//         fontSize: 16,
//     },

//     //Aviv's Edit:
//     /************************************************* */
//     button: {
//         backgroundColor: '#0782F9',
//         width: '20%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: -290,
//         marginRight: 310,
//     },
//     buttonText: {
//         color: 'black',
//         fontWeight: '700',
//         fontSize: 16,
//     },
//     backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'left',
//     },
//     /************************************************* */
// });

// export default NotificationsScreen;



// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/core';
// import storage from '@react-native-firebase/storage'; // Import Firebase storage
// import myLogoPic from '../assets/2better-logo.jpg';


// const NotificationsScreen = () => {
//     const navigation = useNavigation();
//     const [firebaseImageUrl, setFirebaseImageUrl] = useState(null); // State to store the Firebase image URL

//     useEffect(() => {
//         // Function to fetch image URL from Firebase Storage
//         const fetchImageFromFirebase = async () => {  
//             try {
//                 const imageUrl = await storage()
//                 .ref('/Test/firstPic.png')
//                 .getDownloadURL();
//                 setFirebaseImageUrl(imageUrl); // Set the fetched URL to state
//             } catch (error) {
//                 alert(error.message);
//                 console.log(error.message);
//             }
//         };

//         fetchImageFromFirebase();
//     }, []);

//     const backButton = () => {
//         try {
//             navigation.replace("Home");
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//             <View style={styles.container}>
//                 <TouchableOpacity onPress={backButton} style={styles.button}>
//                     <Text style={styles.buttonText}>Back</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.container}>
//                 {/* Display the fetched image from Firebase */}
//                 {firebaseImageUrl && (
//                     <Image source={{ uri: firebaseImageUrl }} style={styles.firebaseImage} />
//                 )}
//             </View>

//         </ImageBackground>
//     );
// };

// // Add styles for the Firebase image
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     button: {
//         backgroundColor: '#0782F9',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         margin: 20,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: '700',
//         fontSize: 16,
//     },
//     backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'left',
//     },
//     firebaseImage: {
//         width: 300, // Set width as needed
//         height: 300, // Set height as needed
//         margin: 20,
//     },
// });

// export default NotificationsScreen;
