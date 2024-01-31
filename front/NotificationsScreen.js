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

import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/core';
import myLogoPic from '../assets/2better-logo.jpg';

const NotificationsScreen = () => {

    const navigation = useNavigation()

  const [selectedDay, setSelectedDay] = useState('');

  const daysOfWeek = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
  ];

  const backButton = () => {
    try {
        navigation.replace("Home");
    } catch (error) {
        alert(error.message);
    }
};

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
        <View style={styles.container}>
        <Text style={styles.title}>Select a Day</Text>
        <RNPickerSelect
            onValueChange={(value) => setSelectedDay(value)}
            items={daysOfWeek}
            placeholder={{ label: 'Select a day...', value: null }}
            style={pickerSelectStyles}
        />
        <Text style={styles.selectedDayText}>Selected Day: {selectedDay}</Text>
        </View>
        
        <View style={styles.container}>
            <TouchableOpacity onPress={backButton} style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>

    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  selectedDayText: {
    marginTop: 10,
    fontSize: 16,
  },

    button: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20, // Added margin for spacing
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'left',
    },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default NotificationsScreen;
