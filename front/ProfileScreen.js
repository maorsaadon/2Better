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
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpg";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
import { auth } from "../back/firebase";

const ProfileScreen = () => {
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

  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };

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

  const navigation = useNavigation();
  

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{auth.currentUser?.email}</Text>

        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{userFirstName}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{userLastName}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{UserCity}</Text>

        <Button title="Edit" onPress={handleEdit} />

        <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={backButton} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "20%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 0, // Align to the bottom
    left: 0, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  buttonDelete: {
    backgroundColor: "#0782F9",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  label: {
    backgroundColor: "#0782F9",
    color: "black",
    fontSize: 18,
    padding: 5,
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 10,
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
