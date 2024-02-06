import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/2better-logo.jpeg";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
//import {stylesHome} from "../components/StylesSheets";

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch groups from the service
    const fetchData = async () => {
      await UserService.getUserDetails();
    };
    // fetchGroups();

    // const fetchData = async () => {
    //   try {
    //     const data = await UserService.getUserDetails();
    //     // Handle the data
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    fetchData();
  },[]);


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
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
        <TouchableOpacity onPress={handleMyProfile} style={stylesHome.button}>
          <Text style={stylesHome.buttonText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMyGroups} style={stylesHome.button}>
          <Text style={stylesHome.buttonText}>My Groups</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFindNewGroup} style={stylesHome.button}>
          <Text style={stylesHome.buttonText}>Find a New Group</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNotifications} style={stylesHome.button}>
          <Text style={stylesHome.buttonText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpcomingMeetings}
          style={stylesHome.button}
        >
          <Text style={stylesHome.buttonText}>Upcoming Meetings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={stylesHome.button}>
          <Text style={stylesHome.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
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
})

//#################################################################

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Homescreen = () => {
//   return (
//     <View>
//       <Text>Homescreen</Text>
//     </View>
//   )
// }

// export default Homescreen

// const styles = StyleSheet.create({})
