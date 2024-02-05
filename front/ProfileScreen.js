import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpg";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
import { auth } from "../back/firebase";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setFirstName(userFirstName);
        setLastName(userLastName);
        setCity(UserCity);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDelete = async () => {
    try {
      // Call the deleteUserAccount function or any other method you have for account deletion
      await UserService.deleteUserAccount();

      // Delete the user account in Firebase Authentication
      await auth.currentUser.delete();

      // Navigate to the login screen or any other desired screen after account deletion
      navigation.replace("Login");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await UserService.updateUserDetails(firstName, lastName, city, []);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.input}>{auth.currentUser?.email}</Text>
        <Text style={styles.label}>First Name:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        ) : (
          <Text style={styles.input}>{userFirstName}</Text>
        )}

        <Text style={styles.label}>Last Name:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        ) : (
          <Text style={styles.input}>{userLastName}</Text>
        )}

        <Text style={styles.label}>City:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        ) : (
          <Text style={styles.input}>{UserCity}</Text>
        )}

        

        <View style={styles.buttonsRow}>
          {isEditing ? (
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
          )}
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    backgroundColor: "white",
    overflow: "hidden",
    width: "37%",
    borderRadius: 20,
    alignItems: "center",
    fontSize: 20,
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderColor: "#3B82F6",
  },
  input: {
    backgroundColor: "#3B82F6",
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
