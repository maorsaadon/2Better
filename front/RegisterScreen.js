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
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import myLogoPic from "../assets/registerPage.png";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { cityData } from "../back/DataBase";
import UserService from "../back/UserService";
import { auth } from '../back/firebase'
const RegisterScreen = () => {
  let [email, setEmail] = useState("");
  const [emailVarify, setEmailVerfiy] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVarify, setPasswordVerfiy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [isOpenCity, setIsOpenCity] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        
        navigation.replace("Home")
      }
    })

    return unsubscribe;
  }, [city]);

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

  const handleCityPress = (item) => {
    setCity(item.value);
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
        }}
      >
        <View style={styles.container}>
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
                  <MaterialIcons name="check-circle" color="green" size={20} />
                ) : (
                  <MaterialIcons name="error" color="red" size={30} />
                )}
              </View>
            )}
          </View>
          {email.length < 1 ? null : emailVarify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              example@gmail.com
            </Text>
          )}
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
          {password.length < 1 ? null : passwordVarify ? null : (
            <Text style={{ marginLeft: 20, color: "red" }}>
              Uppercase, Lowercase, Number and 6 or more characters
            </Text>
          )}

          <View style={styles.dropContainer}>
            <MaterialIcons
              name="location-city"
              color="#366A68"
              size={20}
              style={styles.iconCity}
            />
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={cityData}
              open={isOpenCity}
              setOpen={() => setIsOpenCity(!isOpenCity)}
              value={city}
              setValue={setCity}
              dropDownDirection="DOWN"
              showArrowIcon={false}
              mode="BADGE"
              badgeColors={"#2C64C6"}
              badgeDotColors={["white"]}
              badgeTextStyle={{ color: "white" }}
              placeholder="Select city"
              placeholderStyle={styles.placeHolderStyle}
              style={styles.dropdownStyle}
              itemStyle={styles.dropdownItemStyle}
              dropDownStyle={styles.dropdownListStyle}
              searchable={true}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleCityPress(item)}
            />
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
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "105%",
    top: -10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    gap: 5,
  },
  input: {
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    minWidth: "80%",
    color: "#A9A9A9",
    fontSize: 16,
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
    
  },
  icon: {
    position: "absolute",
    left: 5,
    zIndex: 3,
  },
  iconCity: {
    position: "absolute",
    left: -25,
    top: 20,
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
    top: 0,
    backgroundColor: "#366A68",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
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
    top: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTextSignIn: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
  dropContainer:{
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "70%",
  },
  dropdownStyle: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    borderRadius: 10,
    alignSelf: "flex-end",
    zIndex: 1,
    marginTop : 15,
    width: '125%',
    left: 35,
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "left",
    
  },
  dropdownListStyle: {
    borderColor: "#C3D4D3",
    borderWidth: 3,
    
  },
  placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: "left",
    left: 40,
    backgroundColor: "#C3D4D3",
    fontSize: 16,
    zIndex: 1,
    maxWidth: 80,
  },
});
