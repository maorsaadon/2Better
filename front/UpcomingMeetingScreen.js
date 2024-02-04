// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { DataTable } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/core';
// import myLogoPic from '../assets/2better-logo.jpg';
// import UpcomingMeetingsService from '../back/UpcomingMeetingsService';



// const UpcomingMeetingsScreen = () => {
//     const navigation = useNavigation();

//     const handlePress = (inputMeeting) => {
//         console.log(`Meeting details: Name: ${inputMeeting.name}, Email: ${inputMeeting.email}, Age: ${inputMeeting.age}`);

//     const navigation = useNavigation()
    


//     const backButton = () => {
//         try {
//             navigation.replace("Home");
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     // Sample data for the table
//     const [meetings, setMeetings] = useState([
//         { id: '1', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '2', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '3', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//         { id: '4', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '5', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '6', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//         { id: '7', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '8', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '9', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//         { id: '10', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '11', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '12', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//         { id: '13', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '14', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '15', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//         { id: '16', name: 'John', email: 'john@kindacode.com', age: 33 },
//         { id: '17', name: 'Bob', email: 'test@test.com', age: 105 },
//         { id: '18', name: 'Mei', email: 'mei@kindacode.com', age: 23 },
//     ]);

//     return (
//         <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
            
//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.wrapper}>
//                     <DataTable>
//                         <DataTable.Header style={styles.header}>
//                             <DataTable.Title style={[styles.title, { flex: 2 }]}>Name</DataTable.Title>
//                             <DataTable.Title style={[styles.title, { flex: 3 }]}>Email</DataTable.Title>
//                             <DataTable.Title numeric style={[styles.title, { flex: 1 }]}>Age</DataTable.Title>
//                             <DataTable.Title style={[styles.title, { flex: 1 }]}>     Edit</DataTable.Title>
//                         </DataTable.Header>

//                         {meetings.map((meeting) => (
//                             <DataTable.Row key={meeting.id} style={styles.row}>
//                                 <DataTable.Cell style={styles.cell}>{meeting.name}</DataTable.Cell>
//                                 <DataTable.Cell style={styles.cell}>{meeting.email}</DataTable.Cell>
//                                 <DataTable.Cell numeric style={styles.cell}>{meeting.age}</DataTable.Cell>
//                                 <TouchableOpacity onPress={() => handlePress(meeting)} style={styles.rowButton}>
//                                         <Text style={styles.buttonText}>Print!</Text>
//                                 </TouchableOpacity>
//                             </DataTable.Row>
//                         ))}
//                     </DataTable>
//                 </View>
//             </ScrollView>

//             <TouchableOpacity onPress={backButton} style={styles.button}>
//                 <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>

//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//         justifyContent: 'center', // Adjusted for better layout with ImageBackground
//     },
//     scrollView: {
//         marginHorizontal: 20, // Adjusted for spacing
//     },
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
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         margin: 20, // Added margin for spacing
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: '700',
//         fontSize: 16,
//     },
// });

// export default UpcomingMeetingsScreen;


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { db } from "../back/firebase";
import myLogoPic from '../assets/2better-logo.jpg';

const UpcomingMeetingsScreen = () => {
  const navigation = useNavigation();

  const handlePress = (inputMeeting) => {
    console.log(
      `Meeting details: GroupName: ${inputMeeting.GroupName}, Date: ${inputMeeting.Date}, Location: ${inputMeeting.Location}`
    );
  };

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  // Sample data for the table
  const [meetings, setMeetings] = useState([]);


  useEffect(() => {
    const fetchMeetingsData = async () => {
      try {
        const meetingsCollection = await db.collection('Meetings').get();
        const meetingsData = meetingsCollection.docs.map(doc => {
          const data = doc.data();
          return {
            GroupName: data.GroupName,
            Date: data.Date,
            Location: data.Location,
          };
        });
        // Update the state with the fetched meetings data
        setMeetings(meetingsData);
      } catch (error) {
        console.error("Error fetching meetings data: ", error);
      }
    };

    fetchMeetingsData();
  }, []);



    return (
        <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
            
            <ScrollView style={styles.scrollView}>
                <View style={styles.wrapper}>
                    <DataTable>
                        <DataTable.Header style={styles.header}>
                            <DataTable.Title style={[styles.title, { flex: 2 }]}>Group Name</DataTable.Title>
                            <DataTable.Title style={[styles.title, { flex: 2 }]}>Date&Time</DataTable.Title>
                            <DataTable.Title style={[styles.title, { flex: 1 }]}>Loction</DataTable.Title>
                            <DataTable.Title style={[styles.title, { flex: 1 }]}>Meeting Details </DataTable.Title>
                        </DataTable.Header>

                        {meetings.map((meeting) => (
                            <DataTable.Row key={meeting.id} style={styles.row}>
                                <DataTable.Cell style={styles.cell}>{meeting.GroupName}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell}>{meeting.Date}</DataTable.Cell>
                                <DataTable.Cell numeric style={styles.cell}>{meeting.Location}</DataTable.Cell>
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
        justifyContent: 'center',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    wrapper: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        borderRadius: 10, // Rounded corners for the wrapper
        padding: 10, // Padding inside the wrapper for spacing
    },
    header: {
        backgroundColor: '#6200ee',
        borderTopLeftRadius: 10, // Rounded top corners for the header
        borderTopRightRadius: 10,
        overflow: 'hidden', // Ensures the background does not bleed outside the border radius
    },
    title: {
        color: '#fff',
        fontSize: 18, // Slightly reduced font size for titles
        fontWeight: 'bold', // Bold font weight for titles
    },
    row: {
        backgroundColor: '#e0e0e0', // Lighter background for rows for contrast
        borderBottomWidth: 1, // Add a border to separate rows
        borderBottomColor: '#ccc', // Light grey color for the border
        borderRadius: 5, // Rounded corners for rows
        marginVertical: 4, // Margin between rows
        elevation: 1, // Elevation for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cell: {
        fontSize: 16, // Adjusted font size for cell content
        paddingVertical: 10, // Padding for top and bottom of cell content
    },
    button: {
        backgroundColor: '#0782F9',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    rowButton: {
        padding: 10,
        backgroundColor: '#6200ee', // Matching button color with header
        borderRadius: 5, // Rounded corners for buttons
    },
});

export default UpcomingMeetingsScreen;
