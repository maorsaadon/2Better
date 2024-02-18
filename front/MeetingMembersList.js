// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
// import { DataTable } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/core';
// import { db } from "../back/firebase";
// import myLogoPic from "../assets/default.png";
// import '../back/MeetingService'
// import MeetingService from '../back/MeetingService';


// const MeetingMembersList = () => {
//   const navigation = useNavigation();
//   const [meetings, setMeetings] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);
//     useEffect(() => {
//         const getMeetings = async () => {
//         const meetingsData = await MeetingService.fetchMeetingsData();
//         setMeetings(meetingsData); // Update the state with the fetched data
//         };
    
//         getMeetings();
//     }, []);
    
//   const backButton = () => {
//     try {
//       navigation.replace("EditMeeting");
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   const handlePress = (meeting) => {
//     setSelectedMeeting(meeting);
//     setModalVisible(true);
//   };
//   return (
//     <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//         <View style={styles.wrapper}>
//             <DataTable.Header style={styles.header}>
//               <DataTable.Title style={[styles.title, { flex: 2 }]}>Group Name</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 2 }]}>Date&Time</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 1 }]}>Location</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 1 }]}>Meeting Details</DataTable.Title>
//             </DataTable.Header>
//         </View>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.wrapper}>
//           <DataTable>
//             {/* <DataTable.Header style={styles.header}>
//               <DataTable.Title style={[styles.title, { flex: 2 }]}>Group Name</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 2 }]}>Date&Time</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 1 }]}>Location</DataTable.Title>
//               <DataTable.Title style={[styles.title, { flex: 1 }]}>Meeting Details</DataTable.Title>
//             </DataTable.Header> */}
//             {meetings.map((meeting) => (
//               <DataTable.Row key={meeting.id} style={styles.row}>
//                 <DataTable.Cell style={styles.cell}>{meeting.GroupName}</DataTable.Cell>
//                 <DataTable.Cell style={styles.cell}>{meeting.Date}</DataTable.Cell>
//                 <DataTable.Cell numeric style={styles.cell}>{meeting.Location}</DataTable.Cell>
//                 <TouchableOpacity onPress={() => handlePress(meeting)} style={styles.rowButton}>
//                   <Text style={styles.buttonText}>Show</Text>
//                 </TouchableOpacity>
//               </DataTable.Row>
//             ))}
//           </DataTable>
//         </View>
//       </ScrollView>
//       <TouchableOpacity onPress={backButton} style={styles.button}>
//         <Text style={styles.buttonText}>Back</Text>
//       </TouchableOpacity>
//       {/* Modal for displaying meeting details */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Group Name: {selectedMeeting?.GroupName}</Text>
//             <Text style={styles.modalText}>Date: {selectedMeeting?.Date}</Text>
//             <Text style={styles.modalText}>Location: {selectedMeeting?.Location}</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Details</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// };
// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   scrollView: {
//     marginHorizontal: 20,
//   },
//   wrapper: {
//     marginTop: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 10,
//     padding: 10,
//   },
//   header: {
//     backgroundColor: '#2196F3',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     overflow: 'hidden',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   row: {
//     backgroundColor: '#e0e0e0',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     borderRadius: 5,
//     marginVertical: 4,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   cell: {
//     fontSize: 16,
//     paddingVertical: 10,
//   },
//   button: {
//     backgroundColor: '#0782F9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     margin: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   rowButton: {
//     padding: 10,
//     backgroundColor: '#0782F9',
//     borderRadius: 5,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal overlay
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//     marginTop: 15, // Added margin top for spacing from the text
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     fontSize: 16, // Adjusted font size for modal text
//   },
// });
// export default MeetingMembersList;

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { db } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import '../back/MeetingService'
import MeetingService from '../back/MeetingService';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";


const MeetingMembersList = ({ route }) => {
  const { meeting } = route.params;
  const navigation = useNavigation();
  const [meetingMembers, setMeetingMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        const getMeetingMembers = async () => {
        const meetingsData = await MeetingService.getMembers(meeting.id);
        setMeetingMembers(meetingsData); // Update the state with the fetched data
        };
    
        getMeetingMembers();
    }, []);

    
    // const getMemberDetails = async (email) => {
    //     try {
    //       const snapshot = await db.collection("Users").doc(email).get();
    //       if (snapshot.exists) {
    //         const userData = snapshot.data();
    //         return userData; // Return the member details
    //       } else {
    //         console.log("No such document!");
    //         return null; // Return null if the document does not exist
    //       }
    //     } catch (error) {
    //       console.error("Error fetching user details: ", error);
    //       throw error; // Throw the error to be caught in the calling function
    //     }
    //   };
    
  const backButton = () => {
    try {
      navigation.navigate("EditMeeting" , { meeting });
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePress = async (email) => {
    try {
      const memberDetails = await MeetingService.getMemberDetails(email);
      setSelectedMember(memberDetails);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching member details: ", error);
    }
  };

  const handleDeletePress = (meetingMembers) => {
    // setSelectedMember(meetings);
    // setModalVisible(true);
    MeetingService.removeUserFromMeetingMembers(meeting.id,meetingMembers);
  };
  
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>

        <TouchableOpacity onPress={backButton} style={styles.backButton}>
              <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.wrapper}>
            <DataTable.Header style={styles.header}>
              <DataTable.Title style={[styles.title, { left: 10,}]}>Members</DataTable.Title>
              <DataTable.Title style={[styles.title, { left: 70 }]}>Member Details</DataTable.Title>
              <DataTable.Title style={[styles.title, { left: 60 }]}>Remove</DataTable.Title>
            </DataTable.Header>
        </View>
        <ScrollView style={styles.scrollView}>
      <View style={styles.wrapper}>
        <DataTable>
          {meetingMembers.map((email) => (
            <DataTable.Row key={email} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{email}</DataTable.Cell>
              <TouchableOpacity onPress={() => handlePress(email)} style={[styles.rowButton, { backgroundColor: "#0782F9", left: -5 }]}>
                <Text style={styles.buttonText}>Show</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(email)} style={[styles.rowButton, { backgroundColor: "red", left: 20 }]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
      {/* Modal for displaying meeting details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>First name: {selectedMember?.FirstName}</Text>
            <Text style={styles.modalText}>Last name: {selectedMember?.LastName}</Text>
            <Text style={styles.modalText}>City: {selectedMember?.City}</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={styles.textStyle}>Hide Details</Text>
            </Pressable>
            </View>
        </View>
    </Modal>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 40, // Align to the bottom
    left: -10, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  scrollView: {
    marginHorizontal: 20,
    top: -80,
  },
  wrapper: {
    marginTop: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    backgroundColor: '#2196F3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
    marginVertical: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cell: {
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
//   buttonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 16,
//   },
  rowButton: {
    padding: 10,
    borderRadius: 5,
    right: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 15, // Added margin top for spacing from the text
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16, // Adjusted font size for modal text
  },
});
export default MeetingMembersList;