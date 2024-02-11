import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Keyboard,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/registerPage.png";
import { MaterialIcons } from "@expo/vector-icons";
import { cityData } from "../back/DataBase";
import UserService from "../back/UserService";
import Autocomplete from "react-native-autocomplete-input";

const RegisterScreen = () => {
  let [email, setEmail] = useState("");
  const [emailVarify, setEmailVerfiy] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVarify, setPasswordVerfiy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    if (query.trim().length > 0) {
      setData(
        cityData.filter((cityObj) =>
          cityObj.label.toLowerCase().includes(query.trim().toLowerCase())
        )
      );
    } else {
      setData([]);
    }
  }, [query]);

  const isEmailValid = (email) => {
    return /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{1,}$/.test(email);
  };

  const isPasswordValid = (password) => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);
  };

  const handleSignUp = async () => {
    email = email.toLowerCase();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long."
      );
      return;
    }

    const isCityValid = cityData.find((cityObj) => cityObj.value === city);

    if (!isCityValid) {
      alert("Please enter a valid city");
      return;
    }

    UserService.createUserAccount(email, password, firstName, lastName, city);

    navigation.replace("Home");
  };
  const handleSignIn = () => {
    navigation.replace("Login");
  };

  const handleEmail = (text) => {
    setEmail(text);
    setEmailVerfiy(false);

    if (isEmailValid(text)) {
      setEmailVerfiy(true);
    }
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordVerfiy(false);

    if (isPasswordValid(text)) {
      setPasswordVerfiy(true);
    }
  };

  const handleCitySelect = (itemLabel) => {
    setCity(itemLabel);
    setQuery(itemLabel);
    setData([]);
    Keyboard.dismiss(); // Dismiss the keyboard and suggestions
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCitySelect(item.label)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
      >
          <View style={styles.container}>
            {/* First name line */}
            <View style={styles.inputRow}>
              <MaterialIcons
                name="person"
                color="#366A68"
                size={20}
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
                color="#366A68"
                size={20}
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
                color="#366A68"
                size={20}
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
                    <MaterialIcons
                      name="check-circle"
                      color="green"
                      size={20}
                    />
                  ) : (
                    <MaterialIcons name="error" color="red" size={30} />
                  )}
                </View>
              )}
            </View>
            {/* Warn line for example@gmail.com to tell the format of the mail */}
            {email.length < 1 ? null : emailVarify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                example@gmail.com
              </Text>
            )}
            {/* Password line */}
            <View style={styles.inputRow}>
              <MaterialIcons
                name="lock"
                color="#366A68"
                size={20}
                style={styles.icon}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={handlePassword}
                style={styles.input}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <View style={styles.checkShowIcon}>
                  {password.length < 1 ? null : (
                    <MaterialIcons
                      name="remove-red-eye"
                      color={passwordVarify ? "green" : "red"}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {/* Warn line for password to tell the format of the password */}
            {password.length < 1 ? null : passwordVarify ? null : (
              <Text style={{ marginLeft: 20, color: "red" }}>
                Uppercase, Lowercase, Number and 6 or more characters
              </Text>
            )}
            <View style={styles.inputRow}>
              <MaterialIcons
                name="location-city"
                color="#366A68"
                size={20}
                style={styles.icon}
              />
              {/* <ScrollView> */}
              <View style={styles.autocompleteContainer}>
                <Autocomplete
                  data={data}
                  defaultValue={query}
                  onChangeText={setQuery}
                  placeholder="City"
                  flatListProps={{
                    keyExtractor: (_, index) => index.toString(),
                    renderItem: renderCityItem,
                    style: { maxHeight: 200,  zIndex: 2 },
                  }}
                  style={styles.autocomplete}
                  inputContainerStyle={styles.inputAutocomplete}

                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={handleSignUp}
                style={styles.buttonRegister}
              >
                <Text style={styles.buttonTextRegister}>Register</Text>
              </TouchableOpacity>
            </View>
            <View>
              {/* <Text>Already have an account?</Text> */}
              <TouchableOpacity
                onPress={handleSignIn}
                style={styles.buttonSignIn}
              >
                <Text style={styles.buttonTextSignIn}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 5,
  },
  input: {
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 0,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    minWidth: "80%",
    fontSize: 16,
  },
  inputAutocomplete: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 10,
    minWidth: "50%",
    height: 30,
  },
  
  autocomplete: {
    minWidth: "80%", // Ensure it spans the width of the screen
    height: 20,
    backgroundColor: "#C3D4D3",
    zIndex: 2,
  },

  autocompleteContainer: {
    minWidth: "80%", // Ensure it spans the width of the screen
    height: 30,
    backgroundColor: "#C3D4D3",
    zIndex: 2,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
    color: "#000", // text color
  },
  icon: {
    position: "absolute",
    left: 5,
    zIndex: 3,
  },
  checkIcon: {
    position: "absolute",
    right: 5,
    bottom: 10,
    zIndex: 1,
  },
  checkShowIcon: {
    position: "absolute",
    right: 5,
    bottom: -18,
    zIndex: 1,
  },
  buttonRegister: {
    top: 50,
    backgroundColor: "#366A68",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonTextRegister: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonSignIn: {
    position: "absolute",
    left: 25,
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTextSignIn: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
});
