import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { MaterialIcons, Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { db } from "../back/firebase";
import { styles } from "./ResultGroupsScreen";
//import {stylesHome} from "../components/StylesSheets";

const HomeScreen = () => {

  const navigation = useNavigation();
  //const Tab = createBottomTabNavigator();
  useEffect(() => {
    const fetchData = async () => {
      await UserService.getUserDetails();
    };
    // const fetchData = async () => {
    //   try {
    //     const data = await UserService.getUserDetails();
    //     // Handle the data
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    fetchData();
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Entry");
      })
      .catch((error) => alert(error.message));
  };

  const handleMyProfile = () => {
    try {
      navigation.replace("Profile");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMyGroups = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFindNewGroup = () => {
    try {
      navigation.replace("FindNewGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNotifications = () => {
    try {
      navigation.replace("Notifications");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpcomingMeetings = () => {
    try {
      navigation.replace("UpComingMeetings");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={stylesHome.backgroundImage}>
      <View style={stylesHome.container}>

        <TouchableOpacity onPress={handleNotifications} style={stylesHome.notificationBotton}>
          <Entypo name="bell" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMyProfile} style={stylesHome.profileButton}>
          <FontAwesome name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>




    </ImageBackground>
  );
};

export default HomeScreen;

const stylesHome = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 600
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  notificationBotton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 50,
  },
  profileButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 280,
    borderRadius: 50,
  }
})




    // const fetchData = async () => {
    //   try {
    //     const data = await UserService.getUserDetails();
    //     // Handle the data
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
