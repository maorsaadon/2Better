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
import myLogoPic from "../assets/registerPage.png";

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
        try {
          auth
            .signOut();
          navigation.navigate("Login");
        }
        catch (error) {
          alert(error.message);
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
          });
      })
      .catch((error) => alert(error.message));
  };
  const handleSignIn = () => {
    navigation.navigate("Login");
  };
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
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
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.button}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleSignIn} style={styles.buttonEdit}>
            <Text style={styles.buttonTextEdit}>Sign in</Text>
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
    marginTop: 70,
    marginLeft: 25,
  },
  input: {
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#C3D4D3",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#366A68",
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
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  //###############################
  backgroundImage: {
    flex: 1,
    width: "105%",
    height: "100%",
    marginLeft: -19,
    justifyContent: "center",
    // alignItems: 'center',
  },
  buttonEdit: {
    position: 'absolute',
    top: 55, 
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
