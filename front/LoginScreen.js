import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
//import styles from "../components/StylesSheets";
import { auth } from "../back/firebase";

import myLogoPic from "../assets/loginPage.png";

const LoginScreen = () => {
  var [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);


  const handleLogin = () => {
    email = email.toLowerCase();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleSignUp = () => {
    navigation.navigate("Register");
  };
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleSignUp} style={styles.buttonEdit}>
            <Text style={styles.buttonTextEdit}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    left: 10,
  },
  inputContainer: {
    width: "80%",

  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#366A68",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#366A68",
    width: "100%", // This will make the button fill the container
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 30,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#366A68",
    borderWidth: 2,
    width: "100%", // This ensures the outlined button also fills the container
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
    width: "103%",
    height: "109%",
    justifyContent: "center",
    right: 16,
    
  },
  buttonEdit: {
    position: 'absolute',
    top: 30, 
    left: 30, 
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  
  buttonTextEdit: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
});