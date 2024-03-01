import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  LogBox,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import myLogoPic from "../assets/register-page.png";
import { MaterialIcons , Foundation} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { cityData } from "../back/DataBase";
import UserService from "../back/UserService";
import { auth } from "../back/firebase";
import { stylesRegister} from "../components/StylesSheets"

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
  const [iconVisible, setIconVisible] = useState(true);
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isOpenGender, setIsOpenGender] = useState(false);
  const [genderIconVisible, setGenderIconVisible] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     navigation.replace("Login");
    //   }
    // })
  
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    // return unsubscribe
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

    // Check if the email is already in use
    const emailInUse = await UserService.isEmailInAuth(email);

    if (emailInUse) {
      // If the email is already in use, show an alert and return without proceeding
      alert("Email is already in use! Please use another email.");
      return;
    }

    try {
      const accountCreated = await UserService.createUserAccount(email, password, firstName, lastName, city, selectedGender, age);
      if (accountCreated) {
        // If the account is created successfully, show a success message and navigate to the login screen
        alert("Account created successfully!");
        // Navigate to your desired screen here
        navigation.replace("Login");
      } else {
        // If there was an issue creating the account, show an error message
        alert("Failed to create account. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating user account:", error.message);
      // Handle any additional error cases if needed
    }

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
    setIconVisible(false);
    setCity(item.value);
  };

  const handleAge = (text) => {
    setAge(text);
  };

  const handleGenderPress = (item) => {
    setGenderIconVisible(false);
    setSelectedGender(item.value);
  };

  return (
    <ImageBackground source={myLogoPic} style={stylesRegister.backgroundImage}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
        }}
      >
        <View style={stylesRegister.container}>
          <View style={stylesRegister.inputRow}>
            <MaterialIcons
              name="person"
              color="#366A68"
              size={20}
              style={stylesRegister.icon}
            />
            <TextInput
              placeholder="FirstName"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={stylesRegister.input}
            />
          </View>
          <View style={stylesRegister.inputRow}>
            <MaterialIcons
              name="person"
              color="#366A68"
              size={20}
              style={stylesRegister.icon}
            />
            <TextInput
              placeholder="LastName"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={stylesRegister.input}
            />
          </View>
          <View style={stylesRegister.inputRow}>
            <MaterialIcons
              name="email"
              color="#366A68"
              size={20}
              style={stylesRegister.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              // onChangeText={(text) => setEmail(text)}
              onChangeText={handleEmail}
              style={stylesRegister.input}
            />
            {email.length > 0 && (
              <View style={stylesRegister.checkIcon}>
                {emailVarify ? (
                  <MaterialIcons name="check-circle" color="green" size={23} />
                ) : (
                  <MaterialIcons name="error" color="#8B1B1B" size={23} />
                )}
              </View>
            )}
          </View>
          {email.length < 1 ? null : emailVarify ? null : (
            <Text style={{ marginLeft: -210, color: "#8B1B1B" }}>
              Example@gmail.com
            </Text>
          )}
          <View style={stylesRegister.inputRow}>
            <MaterialIcons
              name="lock"
              color="#366A68"
              size={20}
              style={stylesRegister.icon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={handlePassword}
              style={stylesRegister.input}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <View style={stylesRegister.checkShowIcon}>
                {password.length < 1 ? null : (
                  <MaterialIcons
                    name="remove-red-eye"
                    color={passwordVarify ? "green" : "#8B1B1B"}
                    size={23}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {password.length < 1 ? null : passwordVarify ? null : (
            <Text style={{ marginLeft: 20, color: "#8B1B1B" }}>
              Uppercase, Lowercase, Number and 6 or more characters
            </Text>
          )}

          <View style={stylesRegister.dropContainer}>
          {iconVisible && ( // Conditionally render the icon
          <MaterialIcons
            name="location-city"
            color="#366A68"
            size={20}
            style={stylesRegister.iconCity}
          />
          )}
            
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
              placeholderStyle={stylesRegister.placeHolderStyle}
              style={stylesRegister.dropdownStyle}
              itemStyle={stylesRegister.dropdownItemStyle}
              dropDownStyle={stylesRegister.dropdownListStyle}
              searchable={true}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleCityPress(item)}
            />
          </View>
          <View style={[stylesRegister.inputRow , {top: -5}]}>
            <MaterialIcons
              name="face"
              color="#366A68"
              size={20}
              style={stylesRegister.icon}
            />
            <TextInput
              placeholder="Age"
              value={age}
              onChangeText={handleAge}
              keyboardType="numeric"
              style={stylesRegister.input}
            />
          </View>

          <View style={[stylesRegister.dropContainer , {top: -10}]}>
          {genderIconVisible && (
            <Foundation
              name="male-female"
              color="#366A68"
              size={20}
              style={stylesRegister.iconCity}
            />
          )}
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              open={isOpenGender}
              setOpen={() => setIsOpenGender(!isOpenGender)}
              value={selectedGender}
              setValue={setSelectedGender}
              dropDownDirection="DOWN"
              showArrowIcon={false}
              mode="BADGE"
              badgeColors={"#2C64C6"}
              badgeDotColors={["white"]}
              badgeTextStyle={{ color: "white" }}
              placeholder="Select gender"
              placeholderStyle={stylesRegister.placeHolderStyle}
              style={stylesRegister.dropdownStyle}
              itemStyle={stylesRegister.dropdownItemStyle}
              dropDownStyle={stylesRegister.dropdownListStyle}
              searchable={false}
              onSelectItem={(item) => handleGenderPress(item.value)}
            />
          </View>
          <View style= {{width: "60%"}}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={stylesRegister.buttonRegister}
            >
              <Text style={stylesRegister.buttonTextRegister}>Register</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* <Text>Already have an account?</Text> */}
            <TouchableOpacity
              onPress={handleSignIn}
              style={stylesRegister.buttonSignIn}
            >
              <Text style={stylesRegister.buttonTextSignIn}>Sign in</Text>
            </TouchableOpacity>

          </View>        
          <View>
            <Text style={stylesRegister.endTextEdit}>Already have account?</Text>
        </View>
        </View>            

      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default RegisterScreen;

