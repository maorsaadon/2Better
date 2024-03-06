import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import myLogoPic from "../assets/default.png";
import {
  userFirstName,
  userLastName,
  userImageUpload,
  userCity,
  userAge,
  userGender,
} from "../back/UserService";
import UserService from "../back/UserService";
import { auth } from "../back/firebase";
import { stylesProfile } from "../components/StylesSheets";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Alert } from "react-native";

const ProfileScreen = () => {
  const userEmail = auth.currentUser.email;
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [genderOption, setGenderOption] = useState(false);

  //const photo = require("../assets/iconProfile.jpeg");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    UserService.getUserDetails();

    const fetchUserDetails = async () => {
      try {
        setFirstName(userFirstName);
        setLastName(userLastName);
        setCity(userCity);
        setAge(userAge);
        setGender(userCity);
        if (userGender === "Male") {
          setGenderOption(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
      const storage = getStorage();
      var storageRef;

      if (userImageUpload == 0) {
        storageRef = ref(storage, "UsersProfilePics/" + "defaultProfile.jpeg");
      } else {
        storageRef = ref(storage, "UsersProfilePics/" + auth.currentUser.email);
      }
      try {
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        console.log(url);
      } catch (error) {
        console.error("Error retrieving image:", error);
      }

      console.log(" The number is and ", userImageUpload);
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    navigation.replace("EditProfile");
  };

  const handleDelete = async () => {
    try {
      // Ask for user confirmation using Alert( if user press yes the resolve var will becmae true and then the confrimed will became true)
      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to delete your account? This action is irreversible.",
          [
            { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
            { text: "OK", onPress: () => resolve(true) },
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
      await navigation.replace("Entry");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const navigation = useNavigation();

  const logOutTo = () => {
    navigation.replace("Entry");
    console.log("Log Out From User");
  };

  return (
    <ImageBackground source={myLogoPic} style={stylesProfile.backgroundImage}>
      <TouchableOpacity onPress={logOutTo} style={stylesProfile.buttonLogOut}>
        <Entypo name="log-out" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit} style={stylesProfile.buttonEdit}>
        <FontAwesome5 name="user-edit" size={30} color="black" />
      </TouchableOpacity>
      <View style={stylesProfile.container}>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
            right: 10,
          }}
        >
          <Image
            source={{ uri: imageUrl }}
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
          ></View>

          <View style={stylesProfile.userInfoContainer}>
            <Text style={stylesProfile.valueName}>
              {userFirstName} {userLastName}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Entypo name="mail" size={30} color="black" />
              <Text style={stylesProfile.valueNew}>
                {auth.currentUser?.email}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {genderOption ? (
                <Fontisto name="male" size={26} color="black" />
              ) : (
                <Fontisto name="female" size={26} color="black" />
              )}
              <Text style={stylesProfile.valueNew}>{userGender}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <MaterialIcons name="face" color="black" size={20} />
              <Text style={stylesProfile.valueNew}>{userAge}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <MaterialIcons name="location-on" size={26} color="black" />
              <Text style={stylesProfile.valueNew}>{userCity}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          style={stylesProfile.buttonDelete}
        >
          <Text style={stylesProfile.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
