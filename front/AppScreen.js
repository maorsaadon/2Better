

import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";

import myLogoPic from "../assets/entryPage.jpeg";

const AppScreen = () => {


  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleSignIn = () => {
    try {
      navigation.replace("Login");
      console.log("move to Login page");
    } catch (error) {
      alert(error.message)
    }

  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} behavior="padding">

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}> Create an acount </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    width: 300,
  },
  button: {
    backgroundColor: "#366A68",
    width: "90%", // This will make the button fill the container
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonOutline: {
    width: "100%", // This will make the button fill the container
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "125%",
    justifyContent: "center",
    
  },
});