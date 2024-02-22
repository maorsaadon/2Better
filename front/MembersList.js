
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { db } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import '../back/MeetingService'
import MeetingService from '../back/MeetingService';
import GroupService from '../back/GroupService';
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { onSnapshot, collection, query, getDocs } from 'firebase/firestore';


const MembersList = ({ route }) => {
  const { meeting, group } = route.params;
  const navigation = useNavigation();
  const [meetingMembers, setMeetingMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    let unsubscribe;
  
    if (meeting) {
      const meetingRef = db.collection("Meetings").doc(meeting.id);
  
      unsubscribe = onSnapshot(meetingRef, (doc) => {
        try {
          const meetingData = doc.data();
          const updatedMeetingMembers = meetingData.Members || [];
          setMeetingMembers(updatedMeetingMembers);
        } catch (error) {
          console.error("Error updating meeting members: ", error);
        }
      });
    } else if (group) {
      const groupRef = db.collection("Groups").doc(group.GroupName);
  
      unsubscribe = onSnapshot(groupRef, (doc) => {
        try {
          const groupData = doc.data();
          const updatedGroupMembers = groupData.Members || [];
          setMeetingMembers(updatedGroupMembers);
        } catch (error) {
          console.error("Error updating group members: ", error);
        }
      });
    }
  
    return () => {
      // Unsubscribe the snapshot listener when the component is unmounted
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [meeting, group]);
    

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     query(collection(db, 'Meetings', meeting.id, 'Members')),
  //     (snapshot) => {
  //       const getMeetingMembers = async () => {
  //         const meetingsData = await MeetingService.getMembers(meeting.id);
  //         setMeetingMembers(meetingsData); // Update the state with the fetched data
  //       };

  //       getMeetingMembers();
  //     },
  //     (error) => {
  //       console.error("Error fetching meeting members: ", error);
  //     }
  //   );

  //   return () => {
  //     // Unsubscribe the snapshot listener when the component is unmounted
  //     unsubscribe();
  //   };
  // }, [meeting.id]);


  const handleRemovePress = async (email) => {
    try {
      await MeetingService.removeUserFromMeeting(meeting.id, email);
    } catch (error) {
      console.error("Error removing user from meeting members: ", error);
    }
  };

  const handleRemoveGroupPress = async (email) => {
    try {
      await GroupService.removeUserFromGroup(group.GroupName, email);
    } catch (error) {
      console.error("Error removing user from meeting members: ", error);
    }
  };


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
      if(meeting){
        navigation.navigate("GroupMeetings", { group });
      }else{
        navigation.navigate("MyGroups");
      }
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

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>

      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={[styles.title, { left: 20 }]}>Members</DataTable.Title>
        <DataTable.Title style={[styles.title, { left: 65 }]}>Member Details</DataTable.Title>
        <DataTable.Title style={[styles.title, { left: 60 }]}>Remove</DataTable.Title>
      </DataTable.Header>
      <ScrollView style={styles.scrollView}>
        <View style={styles.wrapper}>
          <DataTable>
            {meetingMembers.map((email) => (
              <DataTable.Row key={email} style={styles.row}>
                <DataTable.Cell style={styles.cell}>{email}</DataTable.Cell>
                <TouchableOpacity onPress={() => handlePress(email)} style={[styles.rowButton, styles.showButton]}>
                  <Text style={styles.buttonText}>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => (meeting ? handleRemovePress(email) : handleRemoveGroupPress(email))} 
                  style={[styles.rowButton, styles.deleteButton]}>
                  {/* <Text style={styles.buttonText}>Remove</Text> */}
                  {/* <FontAwesome name="remove" size={30} color="black" /> */}
                  <MaterialIcons name='person-remove' size={20} color='white' />
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
            <Text style={styles.modalText}>Gender: {selectedMember?.Gender}</Text>
            <Text style={styles.modalText}>Age: {selectedMember?.Age}</Text>
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
    marginTop: 110,
    borderRadius: 10,
    padding: 0,
  },
  header: {
    marginTop: 110,
    backgroundColor: 'rgba(54, 106, 104, 0.7)',
  },
  title: {
    color: 'black',
    fontSize: 60,
    fontWeight: '800',
  },
  row: {
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    borderRadius: 20,
  },
  cell: {
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#366A68',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  },
  rowButton: {
    padding: 15,
    borderRadius: 20,
    right: 60,
  },
  showButton: {
    backgroundColor: "#366A68",
    left: -10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  deleteButton: {
    backgroundColor: "#8B1B1B",
    left: 16,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
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
    backgroundColor: "#366A68",
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
export default MembersList;