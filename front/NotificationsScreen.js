import React, { useState, useEffect, useRef  } from "react";
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

const NotificationsScreen = () => {
  //Aviv's Edit:
  /************************************************* */
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const [showNotification, setShowNotification] = useState(false);
  // const notificationHeight = useRef(new Animated.Value(-100)).current; // Start off-screen

  // const triggerNotification = () => {
  //   // Show the notification
  //   setShowNotification(true);
  //   // Start the animation
  //   Animated.timing(notificationHeight, {
  //     toValue: 0, // Slide down to just within the top of the screen
  //     duration: 500, // Duration of the animation in milliseconds
  //     useNativeDriver: true,
  //   }).start(() => {
  //     // After a delay, slide the notification back up
  //     setTimeout(() => {
  //       Animated.timing(notificationHeight, {
  //         toValue: -100, // Slide back up off-screen
  //         duration: 500, // Duration of the animation in milliseconds
  //         useNativeDriver: true,
  //       }).start(() => {
  //         setShowNotification(false); // Hide the notification
  //       });
  //     }, 3000); // Time before the notification slides back up
  //   });
  // };

  
  // Fetch user notifications when the component is mounted
  useEffect(() => {
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

    fetchNotifications();
  }, []);

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // <View style={{ flex: 1 }}>
    //   {showNotification && (
    //     <Animated.View
    //       style={{
    //         position: 'absolute',
    //         top: notificationHeight, // Animated
    //         left: 0,
    //         right: 0,
    //         // ... other styles for your notification ...
    //       }}
    //     >
    //     {notifications.slice().reverse().map((notification) => (
    //     <NotificationCard key={0} notification={notification} />
    //     ))}
    //     </Animated.View>
    //   )}
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      
      {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView>
            <View style={styles.container}>
              {notifications.slice().reverse().map((notification, index) => (
                <NotificationCard key={index} notification={notification} />
              ))}
            </View>
          </ScrollView>
        )}
        </View>
    </ImageBackground>
  // </View>
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
    position: "absolute", // Use absolute positioning
    top: -45, // Align to the bottom
    left: -18, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
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