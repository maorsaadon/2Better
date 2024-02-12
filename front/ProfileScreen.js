import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import myLogoPic from "../assets/default.png";
import { userFirstName, userLastName, UserCity, userImageUpload, userCity } from "../back/UserService";
import UserService from "../back/UserService";
import { auth, db } from "../back/firebase";
import * as ImagePicker from 'expo-image-picker';
import { styles } from "../components/StylesSheets"
import EditProfileScreen, { changeImage } from '../front/EditProfileScreen'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Alert } from 'react-native';


const ProfileScreen = () => {
  const userEmail = auth.currentUser.email;
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  //const photo = require("../assets/iconProfile.jpeg");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setFirstName(userFirstName);
        setLastName(userLastName);
        setCity(UserCity);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } 
      const storage = getStorage();
      var storageRef;
      
      if (userImageUpload == 0) {
        storageRef = ref(storage, 'UsersProfilePics/' + 'defaultProfile.jpeg');
      }
      else {
        storageRef = ref(storage, 'UsersProfilePics/' + auth.currentUser.email);
      }
      try {
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        console.log(url)
      } catch (error) {
        console.error('Error retrieving image:', error);
      }

      console.log(userImageUpload);
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    navigation.replace("EditProfile");
  };

  const handleDelete = async () => {
    try {

      // Ask for user confirmation using Alert( if user press yes the resolve var will becmae true and then the confrimed will became true)
      const confirmed = await new Promise(resolve => {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to delete your account? This action is irreversible.",
          [
            { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
            { text: "OK", onPress: () => resolve(true) }
          ],
          { cancelable: false }
        );
      });

      // If user press cancel(the confirmed will became false)
      if (!confirmed) {
        console.log("User canceled account deletion");
        return;
      }

      // Call the deleteUserAccount function or any other method you have for account deletion
      await UserService.deleteUserAccount();

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
        <TouchableOpacity onPress={backButton} style={styles.button}>
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <Image
            source={{ uri: imageUrl }}
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
          </View>

        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.valueName}>
            {userFirstName}{ } {userLastName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="mail" size={30} color="black" />
            <Text style={styles.valueNew}>{auth.currentUser?.email}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="location-on" size={26} color="black" />
          <Text style={styles.valueNew}>{userCity}</Text>

          {/* <View>
            <Text style={styles.valueNew}>
              {city}
            </Text>
          </View> */}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 0,
//     marginLeft: 20,
//   },
//   button: {
//     backgroundColor: "#000066",
//     width: "20%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     position: "absolute", // Use absolute positioning
//     top: 0, // Align to the bottom
//     left: 0, // Align to the left
//     marginBottom: 10, // Optional margin to add some space from the bottom
//     marginLeft: 10, // Optional margin to add some space from the left
//   },
//   buttonDelete: {
//     backgroundColor: "#990000",
//     width: "40%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 50,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonTextEdit: {
//     color: "#000066",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
//   input: {
//     width: "100%",
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "gray",
//   },
//   label: {
//     backgroundColor: "#0782F9",
//     color: "black",
//     fontSize: 18,
//     padding: 5,
//     borderRadius: 10,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   valueName: {
//     fontWeight: "bold",
//     fontSize: 16,
//     flexDirection: "row",
//     fontSize: 28,
//     marginLeft: 4,
//   },
//   valueNew: {
//     fontSize: 16,
//     flexDirection: "row",
//     fontSize: 22,
//     marginLeft: 4,
//   },
//   buttonEdit: {
//     width: "30%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 50,
//   }
// });