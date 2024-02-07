import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpeg";
import MeetingService from "../back/MeetingService";
import NotificationService from "../back/NotificationsService";
import { auth, db } from "../back/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { serverTimestamp } from "firebase/firestore";

const AddNewMeetingScreen = ({ route }) => {
  const { groupName } = route.params;
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const userEmail = auth.currentUser.email;
  const content = "" + groupName + " - " + date + ", "  + location;

  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const AddButton = () => {
    try {
      MeetingService.handleAddNewMeeting(groupName, location, date);
      NotificationService.handleAddNewNotification(userEmail, content, "New Meeting", serverTimestamp())
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          {/* Back Button */}
          <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <MaterialIcons name="chevron-left" size={30} color="white" />
        </TouchableOpacity>

          <TextInput
            placeholder="January 30, 2024 at 12:59:23 PM "
            value={date}
            onChangeText={(text) => setDate(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={AddButton}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddNewMeetingScreen;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#0782F9",
    width: "15%",
    padding: 5, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  backButtonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  //###############################
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: 'center',
  },
  //###############################
});
