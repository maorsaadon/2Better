import React, { useState, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/core";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
import myLogoPic from "../assets/default.png";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { auth , db} from '../back/firebase';

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState();
  const snapshot = db.collection("Users").doc(userEmail);

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await UserService.updateUserDetails(firstName, lastName, city);
      await snapshot.update({changeImage : 1});
      navigation.replace("Home"); // Go back to the Home screen after saving
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Use useFocusEffect to update the state when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      // Set initial values when the screen gains focus
      setFirstName(userFirstName);
      setLastName(userLastName);
      setCity(UserCity);
    }, [])
  );


  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    changeImage = 1;
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


        Alert.alert("photo uploading");

      } catch (error) {
        console.error(error);
      }
      // const storage = getStorage();

      // const storageRef = ref(storage, `UsersProfilePics/${firstName+ '2'} `);
      // file = result.Image
      // // 'file' comes from the Blob or File API
      // uploadBytes(storageRef, file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
      // Function to upload image
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

        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          onFocus={() => setCity("")} // Clear text on focus
          placeholder="City"
        />

        <Button title="Save" onPress={handleSave} style={styles.saveButton} />
      </View>
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
    backgroundColor: "#0782F9",
    fontSize: 15,
    padding: 15,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  saveButton: {
    marginTop: 100,
  },
});

