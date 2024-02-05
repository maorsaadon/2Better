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
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import myLogoPic from "../assets/profileImage.jpeg";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
import { auth } from "../back/firebase";
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  //const photo = require("../assets/iconProfile.jpeg");
  const [selectedImage, setSelectedImage] = useState();

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
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
      <TouchableOpacity onPress={backButton} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: '#000066',
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color='#000066'
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.valueName}>
            {userFirstName} {userLastName}
          </Text>
          <Text style={styles.valueNew}>{auth.currentUser?.email}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="location-on" size={26} color="black" />
          <View>
            <Text style={styles.valueNew}>
              {city}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.buttonEdit}>
          <Text style={styles.buttonTextEdit}>Edit User</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>


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
  buttonTextEdit: {
    color: "#000066",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextEdit: {
    color: "#000066",
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
    alignItems: "center",
    marginTop: 50,
  }
});
