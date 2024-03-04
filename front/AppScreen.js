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

import { stylesApp } from "../components/StylesSheets";
import myLogoPic from "../assets/entry-page.png";

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
    <ImageBackground source={myLogoPic} style={stylesApp.backgroundImage}>
      <SafeAreaView style={stylesApp.container} behavior="padding">

        <View style={stylesApp.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={stylesApp.button}>
            <Text style={stylesApp.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} style={stylesApp.buttonOutline}>
          <Text style={stylesApp.buttonOutlineText}> Create an acount </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AppScreen;
