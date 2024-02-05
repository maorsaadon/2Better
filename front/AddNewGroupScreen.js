import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpg";
import GroupService from "../back/GroupService";
import RNPickerSelect from "react-native-picker-select";

const AddNewGroupScreen = () => {
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState("");
  const [city, setCity] = useState("");
  const [sportType, setSportType] = useState("");

  const typeOfSport = [
    { label: "Basketball", value: "Basketball" },
    { label: "Cycling", value: "Cycling" },
    { label: "Football", value: "Football" },
    { label: "Kitesurfing", value: "Kitesurfing" },
    { label: "Running", value: "Running" },
    { label: "Tennis", value: "Tennis" },
    { label: "Swimming", value: "Swimming" },
    { label: "Soccer", value: "Soccer" },
  ];

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
      GroupService.handleAddNewGroup(groupName, city, sportType, participants);
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
       <SafeAreaView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          {/* Back Button */}
          <TouchableOpacity onPress={backButton} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Group name"
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Maximum num of participants"
            value={participants}
            onChangeText={(text) => setParticipants(text)}
            style={styles.input}
          />
          <RNPickerSelect
            onValueChange={(value) => setSportType(value)}
            items={typeOfSport}
            placeholder={{ label: "Select sport type...", value: null }}
            style={pickerSelectStyles}
          />

          <TextInput
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
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
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AddNewGroupScreen;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#0782F9",
    width: "15%",
    padding: 5, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 5,
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
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
