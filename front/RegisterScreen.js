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
import { auth, db } from "../back/firebase";
import myLogoPic from "../assets/2better-logo.jpeg";

const RegisterScreen = () => {
  var [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        try {auth
          .signOut();
          navigation.navigate("Login");}
          catch(error) {alert(error.message);
      }
    }
  });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    email = email.toLowerCase();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", email);

        db.collection("Users") // The collection name
          .doc(email) // The document name
          .set({
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Email: email,
            MyGroups: [],
          });
      })
      .catch((error) => alert(error.message));
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
          <TextInput
            placeholder="FirstName"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="LastName"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  //###############################
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: 'center',
  },
  //###############################
});
