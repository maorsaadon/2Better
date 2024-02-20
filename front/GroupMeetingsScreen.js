import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import ManagerMeetingCard from "../components/ManagerMeetingCard";
import { AntDesign } from "@expo/vector-icons";

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
      navigation.replace("AddNewMeeting", {groupName});
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

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      
      <View style={styles.container}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView>
            <View style={styles.container}>
              {managerMeetings.map((meeting, index) => (
                <ManagerMeetingCard key={index} meeting={meeting} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleAddNewMeeting}
          style={styles.addMeetingButton}
        >
          <Text style={styles.buttonText}>Add New Metting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
    flexDirection: "column",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  addMeetingButton: {
    backgroundColor: "#325E54",
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  backButton: {
    position: "absolute", // Use absolute positioning
    top: 50, // Align to the bottom
    left: 0, // Align to the left
    marginBottom: 30, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  backButtonText: {
    alignSelf: "center",
    color: "white",
  },
});

export default GroupMeetingsScreen;
