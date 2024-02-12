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
import { doc, onSnapshot } from 'firebase/firestore';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import { db } from "../back/firebase";
//import {stylesHome} from "../components/StylesSheets";

const HomeScreen = () => {

  const navigation = useNavigation();
  const [userNotificationCounter, setNotificationCounter] = useState(0);
  console.log(`NotificationCounter = ${userNotificationCounter}`);
  //const Tab = createBottomTabNavigator();

  useEffect(() => {
    const fetchData = async () => {
      await UserService.getUserDetails();
    };

    const userRef = doc(db, 'Users', auth.currentUser.email);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      setNotificationCounter(data.NotificationCounter)
    });

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <TouchableOpacity onPress={handleNotifications} style={stylesHome.notificationBotton}>
          <Entypo name="bell" size={30} color="black" />

          {/* Badge view */}
          {userNotificationCounter > 0 && (
            <View style={stylesHome.badge}>
              <Text style={stylesHome.badgeText}>{userNotificationCounter}</Text>
            </View>
          )}
        </TouchableOpacity>


      </View>
      <TouchableOpacity onPress={handleMyProfile} style={stylesHome.profileButton}>
        <FontAwesome name="user" size={30} color="black" />
      </TouchableOpacity>
      <View style={stylesHome.container}>


        <TouchableOpacity onPress={handleMyGroups} style={stylesHome.button}>
          <FontAwesome6 name="people-group" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFindNewGroup} style={stylesHome.button}>
          <MaterialIcons name="explore" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpcomingMeetings}
          style={stylesHome.button}
        >
          <Entypo name="cake" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={stylesHome.button}>
          <Entypo name="log-out" size={30} color="black" />
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
};

export default HomeScreen;

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row', // Arrange buttons horizontally
    paddingHorizontal: 10, // Add some horizontal padding
    paddingTop: 520, // Add some horizontal padding
  },
  button: {
    width: "20%",
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
  badge: {
    position: 'absolute',
    top: 20, // Move it down a bit
    right: -10, // Move it to the left a bit
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white', // Number color
    fontWeight: 'bold',
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
    marginTop: -50,
    marginLeft: 345,
    borderRadius: 50,
  }
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
