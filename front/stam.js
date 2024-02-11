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
  ScrollView,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { auth, db } from "../back/firebase";
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

  // const [hideResults, setHideResults] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    if (query.trim().length > 0) {
      const cities = findCity(query);
      setData(cities);
    } else {
      setData([]);
    }

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setData([]); // This will hide the autocomplete suggestions
    });

    return () => {
      keyboardDidHideListener.remove();
    };
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

    // Check if the entered city is in the predefined list
    const isCityValid = cityData.find((cityObj) => cityObj.value === city);

    if (!isCityValid) {
      alert("Please enter a valid city");
      return;
    }

    UserService.createUserAccount(email, password, firstName, lastName, city);
    navigation.replace("Home");
  };
  const handleSignIn = () => {
    navigation.navigate("Login");
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

  const findCity = (query) => {
    const regex = new RegExp(`${query.trim()}`, "i");
    return cityData.filter((cityObj) => cityObj.label.search(regex) >= 0);
  };

  const handleCityChange = (text) => {
    setQuery(text);
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setCity(item.label);
        setQuery(item.label);
        setData([]);
        Keyboard.dismiss(); // This will dismiss the keyboard and suggestions
      }}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
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
            <Text style={{ marginLeft: 20, color: "red" }}>
              example@gmail.com
            </Text>
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
              style={styles.input}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <View style={styles.checkShowIcon}>
                {password.length < 1 ? null : (
                  <MaterialIcons
                    name="remove-red-eye"
                    color={passwordVarify ? "green" : "red"}
                    size={30}
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

          {/* <View style={styles.inputContainerStyle}>
                <MaterialIcons
                  name="location-city"
                  color="#420475"
                  size={26}
                  style={styles.icon}
                />
                <Autocomplete
                  placeholder="City"
                  data={data}
                  defaultValue={query}
                  onChangeText={handleCityChange}
                  flatListProps={{
                    keyExtractor: (_, index) => index.toString(),
                    renderItem: renderCityItem,
                  }}
                  // onBlur={() => setHideResults(true)}
                  // onFocus={() => setHideResults(false)}
                  // hideResults={hideResults}
                  style={styles.inputContainerStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                />
              </View> */}

          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={data}
              defaultValue={query}
              onChangeText={handleCityChange}
              placeholder="City"
              flatListProps={{
                keyExtractor: (_, index) => index.toString(),
                renderItem: renderCityItem,
              }}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleSignIn} style={styles.buttonEdit}>
            <Text style={styles.buttonTextEdit}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100, // Adjust as needed
  },
  input: {
    backgroundColor: "#C3D4D3",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    minWidth: "80%",
    fontSize: 16,
  },
  autocompleteContainer: {
    minWidth: "80%",
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  inputContainer: {
    width: "80%",
    marginTop: 250,
    marginLeft: 25,
  },
  inputRow: {
    width: "100%",
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
    zIndex: 2,
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
  // input: {
  //   width: "100%",
  //   backgroundColor: "#C3D4D3",
  //   paddingHorizontal: 35,
  //   paddingVertical: 10,
  //   borderRadius: 10,
  //   marginTop: 5,
  //   borderColor: "#C3D4D3",
  //   borderWidth: 2,
  // },
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
  // backgroundImage: {
  //   flex: 1,
  //   width: "105%",
  //   height: "100%",
  //   marginLeft: -19,
  //   justifyContent: "center",
  //   // alignItems: 'center',
  // },
  buttonEdit: {
    position: "absolute",
    top: 43,
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

  // autocompleteInput: {
  //   flex: 1,
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   borderWidth: 1,
  //   borderColor: "#C3D4D3",
  //   borderRadius: 10,
  //   backgroundColor: "#C3D4D3",
  //   color: "#000",
  // },
  // inputContainerStyle: {
  //   width: "100%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderWidth: 0, // Removes the default border
  //   backgroundColor: "#C3D4D3",
  //   paddingVertical: 1,
  //   borderRadius: 10,
  //   marginTop: 5,
  //   paddingLeft: 20,
  //   zIndex: 1,
  // },
});
