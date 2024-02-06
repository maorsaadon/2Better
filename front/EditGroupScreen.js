// src/components/GroupDetailScreen.js
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpg";
import GroupService from "../back/GroupService";

const EditGroupScreen = ({ route }) => {
  const { groupName } = route.params;

  const navigation = useNavigation();
  const [leaderEmail, setLeaderEmail] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [sportType, setSportType] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await GroupService.getGroup(groupName);
        if (data) {
          setLeaderEmail(data.LeaderEmail);
          setTotalCapacity(data.TotalCapacity);
          setSportType(data.SportType);
          setCity(data.City);
        } else {
          // Handle the case where the group data is not found
          console.log("No group data found for:", groupName);
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    fetchGroupDetails();
  }, [groupName]);

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await GroupService.updateGroupDetails(
        groupName,
        city,
        sportType,
        totalCapacity
      );
      navigation.replace("MyGroups");
    } catch (error) {
      console.error("Error updating group details:", error);
    }
  };

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  // Render group details and update button
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={backButton} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Group Name:</Text>
        <Text style={styles.input}>{groupName}</Text>

        <Text style={styles.label}>Leader Email:</Text>
        <Text style={styles.input}>{leaderEmail}</Text>

        <Text style={styles.label}>TotalCapacity:</Text>
        <TextInput
          style={styles.input}
          value={totalCapacity}
          onChangeText={(text) => setTotalCapacity(text)}
        />
        <Text style={styles.label}>Sport Type:</Text>
        <TextInput
          style={styles.input}
          value={sportType}
          onChangeText={(text) => setSportType(text)}
        />

        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <View style={styles.buttonsRow}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    backgroundColor: "white",
    width: "40%",
    overflow: "hidden",
    borderRadius: 20,
    alignItems: "center",
    fontSize: 20,
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderColor: "black",
  },
  input: {
    backgroundColor: "black",
    overflow: "hidden",
    width: "60%",
    borderRadius: 20,
    alignItems: "center",
    fontSize: 20,
    marginTop: 20,
    borderWidth: 1,
    padding: 8,
    color: "white",
    borderColor: "white",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    width: "40%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#3B82F6",
    width: "20%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    width: "40%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  editButton: {
    backgroundColor: "green",
    width: "40%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  editButtonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  value: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
});

export default EditGroupScreen;
