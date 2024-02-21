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
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { auth } from '../back/firebase';

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

      imageUri = result.assets[0].uri
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
            reject(new TypeError('Network request faild'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });



        const storage = getStorage();

        const storageRef = ref(storage, `UsersProfilePics/${auth.currentUser.email}`);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        await UserService.updateUserImage();
      } catch (error) {
        console.error(error);
      }

    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
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
                borderColor: '#366A68',
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
                color='#366A68'
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFirstName("")} // Clear text on focus
          placeholder="First Name"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setLastName("")} // Clear text on focus
          placeholder="Last Name"
        />

        <Text style={[styles.label, { right: 120 }]}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          onFocus={() => setCity("")} // Clear text on focus
          placeholder="City"
        />

        {/* <Button title="Save" onPress={handleSave} style={styles.saveButton} /> */}
      </View>
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonSaveText}>Save</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

//export { imageUri };
export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  label: {
    backgroundColor: "#366A68",
    fontSize: 15,
    padding: 15,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    right: 95,
  },
  input: {
    width: "80%",
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#366A68",
    borderWidth: 2,
  },
  saveButton: {
    bottom: 30,
    left: 160,
    padding:10,
    width:"20%",
    backgroundColor: "#366A68",
    marginTop: 5,
    borderRadius: 20,
  },
  buttonSaveText: {
    left: 10,
    color: "white",
    fontWeight: "700",
    fontSize: 18,

  },
});