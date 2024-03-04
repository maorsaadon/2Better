import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import ManagerMeetingCard from "../components/ManagerMeetingCard";
import { AntDesign } from "@expo/vector-icons";
import { stylesGroupMeeting } from "../components/StylesSheets";

const GroupMeetingsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { group } = route.params;
  const groupName = group.GroupName;
  console.log("in the grouppppppp:", group);
  const [managerMeetings, setManagerMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const { managerMeetings } =
          await MeetingService.fetchMeetingsBygroup(group);
        setManagerMeetings(managerMeetings);
      } catch (error) {
        console.error("Error fetching Meetings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleAddNewMeeting = () => {
    try {
      navigation.replace("AddNewMeeting", { groupName });
    } catch (error) {
      alert(error.message);
    }
  };

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteMeeting = (meetingId) => {
    // Update the local state to remove the deleted meeting
    setManagerMeetings((prevMeetings) =>
      prevMeetings.filter((prevMeeting) => prevMeeting.id !== meetingId)
    );
  };

  return (
    <ImageBackground
      source={myLogoPic}
      style={stylesGroupMeeting.backgroundImage}
    >
      <ScrollView>
        <TouchableOpacity
          onPress={backButton}
          style={stylesGroupMeeting.backButton}
        >
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddNewMeeting}
          style={stylesGroupMeeting.addMeetingButton}
        >
          <Text style={stylesGroupMeeting.buttonText}>Add New Metting</Text>
        </TouchableOpacity>
        <View style={stylesGroupMeeting.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <View style={stylesGroupMeeting.container}>
              {managerMeetings.map((meeting, index) => (
                <ManagerMeetingCard
                  key={index}
                  meeting={meeting}
                  group={group}
                  onDelete={handleDeleteMeeting} // Pass the callback
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default GroupMeetingsScreen;
