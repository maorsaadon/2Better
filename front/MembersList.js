import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { db } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import "../back/MeetingService";
import MeetingService from "../back/MeetingService";
import GroupService from "../back/GroupService";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { onSnapshot } from "firebase/firestore";
import { stylesMemList } from "../components/StylesSheets";
import NotificationService from "../back/NotificationsService";
import { serverTimestamp } from "firebase/firestore";

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

      if (!meetingRef) {
        return;
      }

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

      if (!groupRef) {
        return;
      }

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

  const handleRemovePress = async (email) => {
    try {
      await MeetingService.removeUserFromMeeting(meeting.id, email);
      await NotificationService.handleAddNewNotification(
        email,
        meeting.GroupName,
        "The manager remove you from the meeting",
        "Removed From Meeting",
        serverTimestamp(),
        "",
        ""
      );
    } catch (error) {
      console.error("Error removing user from meeting members: ", error);
    }
  };

  const handleRemoveGroupPress = async (email) => {
    try {
      await GroupService.removeUserFromGroup(group.GroupName, email);
      await NotificationService.handleAddNewNotification(
        email,
        group.GroupName,
        "The manager remove you from the group",
        "Removed From Group",
        serverTimestamp(),
        "",
        ""
      );
    } catch (error) {
      console.error("Error removing user from meeting members: ", error);
    }
  };

  const backButton = () => {
    try {
      if (meeting) {
        navigation.navigate("GroupMeetings", { group });
      } else {
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
    <ImageBackground source={myLogoPic} style={stylesMemList.backgroundImage}>
      <TouchableOpacity onPress={backButton} style={stylesMemList.backButton}>
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      <DataTable.Header style={stylesMemList.header}>
        <DataTable.Title style={[stylesMemList.title, { left: 20 }]}>
          Members
        </DataTable.Title>
        <DataTable.Title style={[stylesMemList.title, { left: 65 }]}>
          Member Details
        </DataTable.Title>
        <DataTable.Title style={[stylesMemList.title, { left: 60 }]}>
          Remove
        </DataTable.Title>
      </DataTable.Header>
      <ScrollView style={stylesMemList.scrollView}>
        <View style={stylesMemList.wrapper}>
          <DataTable>
            {meetingMembers.map((email) => (
              <DataTable.Row key={email} style={stylesMemList.row}>
                <DataTable.Cell style={stylesMemList.cell}>
                  {email}
                </DataTable.Cell>
                <TouchableOpacity
                  onPress={() => handlePress(email)}
                  style={[stylesMemList.rowButton, stylesMemList.showButton]}
                >
                  <Text style={stylesMemList.buttonText}>Show</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    meeting
                      ? handleRemovePress(email)
                      : handleRemoveGroupPress(email)
                  }
                  style={[stylesMemList.rowButton, stylesMemList.deleteButton]}
                >
                  {/* <Text style={stylesMemList.buttonText}>Remove</Text> */}
                  {/* <FontAwesome name="remove" size={30} color="black" /> */}
                  <MaterialIcons name="person-remove" size={20} color="white" />
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
        <View style={stylesMemList.centeredView}>
          <View style={stylesMemList.modalView}>
            <Text style={stylesMemList.modalText}>
              First name: {selectedMember?.FirstName}
            </Text>
            <Text style={stylesMemList.modalText}>
              Last name: {selectedMember?.LastName}
            </Text>
            <Text style={stylesMemList.modalText}>
              Gender: {selectedMember?.Gender}
            </Text>
            <Text style={stylesMemList.modalText}>
              Age: {selectedMember?.Age}
            </Text>
            <Text style={stylesMemList.modalText}>
              City: {selectedMember?.City}
            </Text>

            <Pressable
              style={[stylesMemList.button, stylesMemList.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={stylesMemList.textStyle}>Hide Details</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default MembersList;
