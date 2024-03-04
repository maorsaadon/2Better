import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { userFirstName, userLastName, userCity } from "../back/UserService";
import UserService from "../back/UserService";
import myLogoPic from "../assets/default.png";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as FileSystem from "expo-file-system";
import { auth } from "../back/firebase";

import { stylesEditProfile } from "../components/StylesSheets";

const EditProfileScreen = () => {
  const userEmail = auth.currentUser.email;
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [city, setCity] = useState(userCity);

  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState();

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await UserService.updateUserDetails(firstName, lastName, city);
      navigation.replace("Profile page"); // Go back to the Home screen after saving
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Use useFocusEffect to update the state when the screen gains focus
  // useFocusEffect(
  //   useCallback(() => {
  //     // Set initial values when the screen gains focus
  //     setFirstName(userFirstName);
  //     setLastName(userLastName);
  //     setCity(UserCity);
  //   }, [])
  // );

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    await UserService.updateUserImage();
    console.log(result);

    if (!result.canceled) {
      imageUri = result.assets[0].uri;
      if (!imageUri) return;
      setSelectedImage(imageUri);
      try {
        const { uri } = await FileSystem.getInfoAsync(imageUri);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError("Network request faild"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const storage = getStorage();

        const storageRef = ref(
          storage,
          `UsersProfilePics/${auth.currentUser.email}`
        );

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
        await UserService.updateUserImage();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ImageBackground
      source={myLogoPic}
      style={stylesEditProfile.backgroundImage}
    >
      <View style={stylesEditProfile.container}>
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
                borderColor: "#366A68",
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
              <MaterialIcons name="photo-camera" size={32} color="#366A68" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={stylesEditProfile.label}>First Name:</Text>
        <TextInput
          style={stylesEditProfile.input}
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFirstName("")} // Clear text on focus
          placeholder="First Name"
        />

        <Text style={stylesEditProfile.label}>Last Name:</Text>
        <TextInput
          style={stylesEditProfile.input}
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setLastName("")} // Clear text on focus
          placeholder="Last Name"
        />

        <Text style={[stylesEditProfile.label, { right: 120 }]}>City:</Text>
        <TextInput
          style={stylesEditProfile.input}
          value={city}
          onChangeText={setCity}
          onFocus={() => setCity("")} // Clear text on focus
          placeholder="City"
        />

        {/* <Button title="Save" onPress={handleSave} style={stylesEditProfile.saveButton} /> */}
      </View>
      <TouchableOpacity
        onPress={handleSave}
        style={stylesEditProfile.saveButton}
      >
        <Text style={stylesEditProfile.buttonSaveText}>Save</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default EditProfileScreen;
