import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { MaterialIcons , Entypo , FontAwesome , FontAwesome6} from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import UserService from "../back/UserService";
import { db } from "../back/firebase";
//import {stylesHome} from "../components/StylesSheets";

const HomeScreen = () => {
  
  const [notificationCounter, setNotificationCounter] = useState("");
  const navigation = useNavigation();
  
  useEffect(() => {
    // Fetch groups from the service
    const fetchData = async () => {
      await UserService.getUserDetails();
    };
    const fetchCounter = async () => {
      const counter = await getNotificationCounter();
      setNotificationCounter(counter);
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
    fetchCounter();
    // fetchGroups();
  },[]);
  
  
  const getNotificationCounter = async () =>{
    try {
      const counterRef = db
          .collection("Notifications").doc("notificationCount");

        const doc = await counterRef.get();
        if (doc.exists) {
          console.log(doc.data().counter);
          return doc.data().counter;
        } else {
          console.log("No such document!");
        }
    } catch (error) {
      
    }
  }
  console.log("notification Counter: " + notificationCounter);

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
            <Entypo name="bell" size={30} color="black" opacity = '1' />

            {/* Badge view */}
            {notificationCounter > 0 && (
              <View style={stylesHome.badge}>
                <Text style={stylesHome.badgeText}>{notificationCounter}</Text>
              </View>
            )}
          </TouchableOpacity>
          </View>
      <View style={stylesHome.container}>
        <TouchableOpacity onPress={handleMyProfile} style={stylesHome.button}>
        <FontAwesome name="user" size={30} color="black" opacity = '1' />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMyGroups} style={stylesHome.button}>
        <FontAwesome6 name="people-group" size={30} color="black" opacity = '1' />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFindNewGroup} style={stylesHome.button}>
        <MaterialIcons name="explore" size={30} color="black" opacity = '1' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUpcomingMeetings}
          style={stylesHome.button}
        >
          <Entypo name="cake" size={30} color="black" opacity = '1' />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignOut} style={stylesHome.button}>
        <Entypo name="log-out" size={30} color="black" opacity = '1' />
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
    paddingTop: 420, // Add some horizontal padding
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
    position: 'absolute', // Position the badge over the button
    top: -10, // Adjust the position as needed
    right: -10, // Adjust the position as needed
    backgroundColor: 'red', // Badge color
    borderRadius: 15, // Make it circular
    width: 30, // Badge size
    height: 30, // Badge size
    justifyContent: 'center', // Center the number horizontally
    alignItems: 'center', // Center the number vertically
  },
  badgeText: {
    color: 'white', // Number color
    fontWeight: 'bold',
  },
  notificationBotton:{
    padding: 10, 
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 50,
    opacity: 1
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
