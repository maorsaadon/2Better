import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../back/firebase";
import { stylesLogin } from "../components/StylesSheets";
import myLogoPic from "../assets/login-page.png";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  var [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (stayLoggedIn) {
        await AsyncStorage.setItem("stayLoggedIn", "true");
      } else {
        await AsyncStorage.removeItem("stayLoggedIn");
      }
      email = email.toLowerCase();
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
          navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground source={myLogoPic} style={stylesLogin.backgroundImage}>
      <SafeAreaView style={stylesLogin.container} behavior="padding">
        <View style={stylesLogin.inputContainer}>
          {/* Email line */}
          <View style={stylesLogin.inputRow}>
            <MaterialIcons
              name="email"
              color="#366A68"
              size={20}
              style={stylesLogin.icon}
            />
            <TextInput
              testID="username_field"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={stylesLogin.input}
            />
          </View>
          {/* Password line */}
          <View style={stylesLogin.inputRow}>
            <MaterialIcons
              name="lock"
              color="#366A68"
              size={20}
              style={stylesLogin.icon}
            />
            <TextInput
              testID="password_field"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={stylesLogin.input}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <View style={stylesLogin.checkShowIcon}>
                {password.length < 1 ? null : (
                  <MaterialIcons
                    name="remove-red-eye"
                    color="black"
                    size={20}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={stylesLogin.buttonContainer}>
          <TouchableOpacity testID="login_button" onPress={handleLogin} style={stylesLogin.button}>
            <Text style={stylesLogin.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleSignUp}
            style={stylesLogin.buttonEdit}
          >
            <Text style={stylesLogin.buttonTextEdit}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={stylesLogin.endTextEdit}>Don`t have account?</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
