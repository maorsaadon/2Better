import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Text
} from "react-native";
import {Entypo, FontAwesome } from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import UserService from "../back/UserService";
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from "../back/firebase";

const HomeScreen = () => {

  const navigation = useNavigation();
  const [userNotificationCounter, setNotificationCounter] = useState(0);
  // console.log(`NotificationCounter = ${userNotificationCounter}`);

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


  const handleMyProfile = () => {
    try {
      navigation.replace("Profile");
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


  return (
    <ImageBackground source={myLogoPic} style={stylesHome.backgroundImage}>
      <View style={stylesHome.container}>

        <TouchableOpacity onPress={handleNotifications} style={stylesHome.notificationBotton}>
          <Entypo name="bell" size={30} color="black" />

              {/* Badge view */}
              {userNotificationCounter > 0 && (
            <View style={stylesHome.badge}>
              <Text style={stylesHome.badgeText}>{userNotificationCounter}</Text>
            </View>
          )}
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
    marginBottom: 600,
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
    marginTop: 0,
    marginLeft: 280,
    borderRadius: 50,
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
})

    // const fetchData = async () => {
    //   try {
    //     const data = await UserService.getUserDetails();
    //     // Handle the data
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
