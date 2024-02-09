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
import { MaterialIcons } from "@expo/vector-icons";
import { city_data } from "../back/DataBase";

const RegisterScreen = () => {
  var [email, setEmail] = useState("");
  const [emailVarify, setEmailVerfiy] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVarify, setPasswordVerfiy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const isEmailValid = (email) => {
    return /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(email);
  };
  
  const isPasswordValid = (password) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
  };

  const handleSignUp = () => {
    email = email.toLowerCase();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (!isPasswordValid(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long.");
      return;
    }

    // Check if the entered city is in the predefined list
    const isCityValid = city_data.find((cityObj) => cityObj.value === city);

    if (!isCityValid) {
      alert("Please enter a valid city");
      return;
    }

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

  function handleEmail(text) {
    setEmail(text);
    setEmailVerfiy(false);
  
    if (isEmailValid(text)) {
      setEmailVerfiy(true);
    }
  };

  function handlePassword(text) {
    setPassword(text);
    setPasswordVerfiy(false);

    if (isPasswordValid(text)) {
      setPasswordVerfiy(true);
    }
  };
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          {/* First name line */}
          <View style={styles.inputRow}>
            <MaterialIcons 
              name="person"
              color="#420475"
              size={26}
              style={styles.icon}
            />
            <TextInput
              placeholder="FirstName"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={styles.input}
            />
          </View>
          {/* Last name line */}
          <View style={styles.inputRow}>
            <MaterialIcons 
              name="person"
              color="#420475"
              size={26}
              style={styles.icon}
            />
            <TextInput
              placeholder="LastName"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={styles.input}
            />
          </View>
          {/* Email line */}
          <View style={styles.inputRow}>
            <MaterialIcons 
              name="email"
              color="#420475"
              size={30}
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              // onChangeText={(text) => setEmail(text)}
              onChangeText={handleEmail}
              style={styles.input}
            />
            {email.length > 0 && (
              <View style={styles.checkIcon}>
                {emailVarify ? (
                  <MaterialIcons name="check-circle" color="green" size={30} />
                ) : (
                  <MaterialIcons name="error" color="red" size={30} />
                )}
              </View>
            )}
          </View>
          {/* Warn line for example@gmail.com to tell the format of the mail */}
          {email.length < 1 ? null : emailVarify ? null : (
            <Text style={{ marginLeft: 20 , color: 'red'}} >example@gmail.com</Text>
          )}
          {/* Password line */}
          <View style={styles.inputRow}>
            <MaterialIcons 
              name="lock"
              color="#420475"
              size={26}
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={handlePassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.checkShowIcon}>
                {password.length < 1 ? null : 
                <MaterialIcons
                  name="remove-red-eye"
                  color={passwordVarify ? 'green' : 'red'}
                  size={30} 
                />
                }
              </View>
            </TouchableOpacity>
          </View>
          {/* Warn line for password to tell the format of the password */}
          {password.length < 1 ? null : passwordVarify ? null : (
            <Text style={{ marginLeft: 20 , color: 'red'}} >Uppercase, Lowercase, Number and 6 or more characters</Text>
          )}
          {/* City line */}
          <View style={styles.inputRow}>
            <MaterialIcons 
              name="location-city"
              color="#420475"
              size={26}
              style={styles.icon}
            />
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.input}
            />
          </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
  checkIcon: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    zIndex: 1,
  },
  checkShowIcon: {
    position: 'absolute',
    right: 5,
    bottom: -18,
    zIndex: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#C3D4D3",
    borderWidth: 2,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 8, // Adjusted padding
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
