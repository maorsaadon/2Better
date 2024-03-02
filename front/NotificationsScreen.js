import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { NotificationService } from "../back/NotificationsService";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import NotificationCard from "../components/NotificationCard";
import { AntDesign } from "@expo/vector-icons";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../back/firebase";

const NotificationsScreen = () => {
  //Aviv's Edit:
  /***************** */
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestNotification, setLatestNotification] = useState(null);
  const slideAnim = useRef(new Animated.Value(-100)).current; // Initial position off-screen

  const slideNotification = () => {
    // Slide in
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Stay visible for 2 seconds then slide out
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 6000);
    });
  };

  // Fetch user notifications when the component is mounted
  useEffect(() => {
    // if (latestNotification) {
    //   slideNotification();
    // }

    const fetchNotifications = async () => {
      try {
        const userNotifications = await NotificationService.getUserNotifications();
        if (userNotifications && userNotifications.length > 0) {
          setNotifications(userNotifications);
        } else {
          console.log("No Notifications found for the given criteria.");
        }
      } catch (error) {
        console.error("Error fetching Notifications:", error);
      } finally {
        setIsLoading(false); // This ensures isLoading is set to false after fetching is done
      }
    };

    // const unsubscribe = db.collection('Notifications')
    //   .where('Addressee', '==', auth.currentUser.email)
    //   .onSnapshot(snapshot => {
    //     const updatedNotifications = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     setNotifications(updatedNotifications);
    //     new Promise(resolve => setTimeout(resolve, 1000));
    //     setLatestNotification(notifications[notifications.length-1])
    //   });

    fetchNotifications();
  }, []);

  const pressedNotification = (notification) => {
    if (notification.Type === "New Meeting") {
      try {
        navigation.navigate('Home', { screen: 'Meetings' });
      } catch (error) {
        alert(error.message);
      }
    }

    if (notification.Type === "Request accepted") {
      try {
        navigation.navigate('Home', { screen: 'My Groups' });
      } catch (error) {
        alert(error.message);
      }
    }
  }

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
        <View style={styles.container}>
          <ScrollView>
            <TouchableOpacity onPress={backButton} style={styles.backButton}>
              <AntDesign name="back" size={30} color="black" />
            </TouchableOpacity>

            {isLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (

              <View style={styles.container}>
                {notifications.slice().reverse().map((notification) => (
                  <TouchableOpacity key={notification.id} onPress={() => pressedNotification(notification)}>
                  <NotificationCard notification={notification} />  
                </TouchableOpacity>
                ))}
              </View>

            )}
          </ScrollView>
        </View>
      </ImageBackground>
      {/* <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 50, // Adjust as needed
          backgroundColor: 'blue', // Customize
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={styles.container}>
          {latestNotification ? (
            <TouchableOpacity onPress={() => pressedNotification(notifications[notifications.length - 1])}>
              <NotificationCard notification={notifications[notifications.length - 1]} />
            </TouchableOpacity>
          ) : null}
        </View>
      </Animated.View> */}
    </View>
  );
};

// Styles for the NotificationsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50, // Adjust this value so that the ScrollView starts below the back button.
  },
  notificationItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "20%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 0, // Align to the bottom
    left: 0, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
    position: "absolute", // This is good for positioning the button.
    top: 0,
    left: 0,
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: -15,
    left: -18,
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "left",
  },

});

export default NotificationsScreen;