import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { notificationService } from "../back/NotificationsService";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/2better-logo.jpg";
// Screen to display user notifications
const NotificationsScreen = () => {
  //Aviv's Edit:
  /************************************************* */
  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch user notifications when the component is mounted
  useEffect(() => {
    const fetchNotifications = async () => {
      const userNotifications = await notificationService.getUserNotifications(
        userId
      );
      setNotifications(userNotifications);
    };

    fetchNotifications();
  }, []);

  // Render each notification as a list item
  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  pickImageHandler = async() => {

  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={backButton} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
        />
      </View> */}
    </ImageBackground>
  );
};

// Styles for the NotificationsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
