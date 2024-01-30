// // src/components/UpcomingMeetingScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { DataTable } from 'react-native-paper';
// import { groupService } from '../back/GroupService';
// import { useNavigation } from '@react-navigation/core'
// import { auth } from '../back/firebase'
// import myLogoPic from '../assets/2better-logo.jpg';
// import UpcomingMeetingsService from '../back/UpcomingMeetingsService';



// const UpcomingMeetingsScreen = () => {

//     const navigation = useNavigation()
    


//     const backButton = () => {
//         try {
//             navigation.replace("Home");
//           } catch (error) {
//             alert(error.message);
//           }
//     };

//     const showCity = () => {
//         try {
//             UpcomingMeetingsService.getMeet()
//             console.log("click!");
//           } catch (error) {
//             alert(error.message);
//           }
//     }

//     const [meetings, setMeetings] = useState([]);

//     useEffect(() => {
//         // const fetchMeetings = async () => {
//         //     const upcomingMeetings = await groupService.getUpcomingMeetings();
//         //     setMeetings(upcomingMeetings);
//         // };

//         // fetchMeetings();
//     }, []);

//     return (
//         <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//         <View style={styles.container}>
//             <FlatList
//                 data={meetings}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.meeting}>
//                         <Text style={styles.meetingDetail}>{item.title}</Text>
//                         {/* Display other meeting details */}
//                     </View>
//                 )}
//             />
//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.wrapper}>            
//                     <DataTable>
//                         <DataTable.Header style={styles.header}>
//                             {/* Use flex to adjust the width of each column */}
//                             <DataTable.Title style={[styles.title, {flex: 2}]}>Name</DataTable.Title>
//                             <DataTable.Title style={[styles.title, {flex: 3}]}>Email</DataTable.Title>
//                             <DataTable.Title numeric style={[styles.title, {flex: 1}]}>Age</DataTable.Title>
//                         </DataTable.Header>

//                         {/* Rows */}
//                         {/* <DataTable.Row style={styles.row}>
//                             <DataTable.Cell style={styles.cell}>John</DataTable.Cell>
//                             <DataTable.Cell style={styles.cell}>john@kindacode.com</DataTable.Cell>
//                             <DataTable.Cell numeric style={styles.cell}>33</DataTable.Cell>
//                         </DataTable.Row>

//                         <DataTable.Row style={styles.row}>
//                             <DataTable.Cell style={styles.cell}>Bob</DataTable.Cell>
//                             <DataTable.Cell style={styles.cell}>test@test.com</DataTable.Cell>
//                             <DataTable.Cell numeric style={styles.cell}>105</DataTable.Cell>
//                         </DataTable.Row>

//                         <DataTable.Row style={styles.row}>
//                             <DataTable.Cell style={styles.cell}>Mei</DataTable.Cell>
//                             <DataTable.Cell style={styles.cell}>mei@kindacode.com</DataTable.Cell>
//                             <DataTable.Cell numeric style={styles.cell}>23</DataTable.Cell>
//                         </DataTable.Row> */}
//                     </DataTable>
//                 </View>
//             </ScrollView>

//             <View style={styles.container}>
//                 <TouchableOpacity
//                     onPress={showCity}
//                     style={styles.button}
//                     >
//                     <Text style={styles.buttonText}>showCity</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.container}>
//                 <TouchableOpacity
//                     onPress={backButton}
//                     style={styles.button}
//                     >
//                     <Text style={styles.buttonText}>Back</Text>
//                 </TouchableOpacity>
//             </View>

//         </View>

//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 22,
//     },
//     meeting: {
//         // Styling for each meeting item
//     },
//     meetingDetail: {
//         // Styling for the meeting details
//     },
// //################################################################
//     wrapper: {
//         paddingTop: 100,
//         paddingHorizontal: 30,    
//       },
//       scrollView: {
//         flex: 1,
//       },
//       header: {
//         backgroundColor: '#6200ee', // Example header background color
//       },
//       title: {
//         color: '#fff', // Example header text color
//         fontSize: 20, // Increase font size for header titles
//       },
//       row: {
//         backgroundColor: '#bb86fc', // Example row background color
//       },
//       cell: {
//         fontSize: 18, // Increase font size for cells
//       },
// //#################################################################
//     button: {
//         backgroundColor: '#0782F9',
//         width: '20%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 40,
//       },
//       buttonText: {
//         color: 'white',
//         fontWeight: '700',
//         fontSize: 16,
//       },
//       backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//       },
// });

// export default UpcomingMeetingsScreen;


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import myLogoPic from '../assets/2better-logo.jpg';

const UpcomingMeetingsScreen = () => {
    const navigation = useNavigation();

    const handlePress = (inputMeeting) => {
        console.log(`Meeting details: Name: ${inputMeeting.name}, Email: ${inputMeeting.email}, Age: ${inputMeeting.age}`);

    };
    
    const backButton = () => {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    };

    // Sample data for the table
    const [meetings, setMeetings] = useState([
        { id: '1', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '2', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '3', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
        { id: '4', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '5', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '6', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
        { id: '7', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '8', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '9', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
        { id: '10', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '11', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '12', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
        { id: '13', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '14', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '15', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
        { id: '16', name: 'John', email: 'john@kindacode.com', age: 33 },
        { id: '17', name: 'Bob', email: 'test@test.com', age: 105 },
        { id: '18', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
    ]);

    return (
        <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
            
            <ScrollView style={styles.scrollView}>
                <View style={styles.wrapper}>
                    <DataTable>
                        <DataTable.Header style={styles.header}>
                            <DataTable.Title style={[styles.title, { flex: 2 }]}>Name</DataTable.Title>
                            <DataTable.Title style={[styles.title, { flex: 3 }]}>Email</DataTable.Title>
                            <DataTable.Title numeric style={[styles.title, { flex: 1 }]}>Age</DataTable.Title>
                            <DataTable.Title style={[styles.title, { flex: 1 }]}>     Edit</DataTable.Title>
                        </DataTable.Header>

                        {meetings.map((meeting) => (
                            <DataTable.Row key={meeting.id} style={styles.row}>
                                <DataTable.Cell style={styles.cell}>{meeting.name}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell}>{meeting.email}</DataTable.Cell>
                                <DataTable.Cell numeric style={styles.cell}>{meeting.age}</DataTable.Cell>
                                <TouchableOpacity onPress={() => handlePress(meeting)} style={styles.rowButton}>
                                        <Text style={styles.buttonText}>Print!</Text>
                                </TouchableOpacity>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            </ScrollView>

            <TouchableOpacity onPress={backButton} style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center', // Adjusted for better layout with ImageBackground
    },
    scrollView: {
        marginHorizontal: 20, // Adjusted for spacing
    },
    wrapper: {
        marginTop: 20, // Reduced top margin
    },
    header: {
        backgroundColor: '#6200ee',
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    row: {
        backgroundColor: '#bb86fc',
    },
    cell: {
        fontSize: 18,
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
});

export default UpcomingMeetingsScreen;
