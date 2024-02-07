import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LogBox,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import myLogoPic from "../assets/2better-logo.jpeg";
import DropDownPicker from "react-native-dropdown-picker";
import GroupService from "../back/GroupService";
import { sportType_data, city_data, cityNames } from "../back/DataBase";
import { MaterialIcons } from "@expo/vector-icons";

const AddNewGroupScreen = () => {
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isOpenCities, setIsOpenCities] = useState(false);
  const [selectedSportType, setSelectedSportType] = useState("");
  const [isOpenSportTypes, setIsOpenSportTypes] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [selectedSportType, selectedCity]);

  const handleSportTypePress = (item) => {
    setSelectedSportType(item.value);
  };
  const handleCityPress = (item) => {
    setSelectedCity(item.value);
  };

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const AddButton = () => {
    try {
      GroupService.handleAddNewGroup(
        groupName,
        selectedCity,
        selectedSportType,
        totalCapacity
      );
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={backButton} style={styles.button}>
      <MaterialIcons name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
        <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCities(false);
          setIsOpenSportTypes(false);
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Group name"
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Maximum num of participants"
            value={totalCapacity}
            onChangeText={(text) => setTotalCapacity(text)}
            style={styles.input}
          />
          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={sportType_data}
            open={isOpenSportTypes}
            setOpen={() => setIsOpenSportTypes(!isOpenSportTypes)}
            value={selectedSportType}
            setValue={setSelectedSportType}
            dropDownDirection="DOWN"
            showArrowIcon={true}
            mode="BADGE"
            badgeColors={"#2C64C6"}
            badgeDotColors={["white"]}
            badgeTextStyle={{ color: "white" }}
            placeholder="Select type of sport"
            placeholderStyle={styles.placeHolderStyle}
            containerStyle={[styles.dropdownContainer, { zIndex: 3 }]}
            style={styles.dropdownStyle}
            itemStyle={styles.dropdownItemStyle}
            dropDownStyle={styles.dropdownListStyle}
            searchable={true}
            searchPlaceholder="Search..."
            onSelectItem={(item) => handleSportTypePress(item)}
          />

          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={city_data}
            open={isOpenCities}
            setOpen={() => setIsOpenCities(!isOpenCities)}
            value={selectedCity}
            setValue={setSelectedCity}
            dropDownDirection="DOWN"
            showArrowIcon={true}
            mode="BADGE"
            badgeColors={"#2C64C6"}
            badgeDotColors={["white"]}
            badgeTextStyle={{ color: "white" }}
            placeholder="Select city"
            placeholderStyle={styles.placeHolderStyle}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdownStyle}
            itemStyle={styles.dropdownItemStyle}
            dropDownStyle={styles.dropdownListStyle}
            searchable={true}
            searchPlaceholder="Search..."
            onSelectItem={(item) => handleCityPress(item)}
          />
        </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={AddButton}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Add</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AddNewGroupScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backButton: {
    alignSelf: "flex-start", // Aligns the button to the start of its container
    position: "absolute", // Positions the button absolutely within its container
    top: 10, // Adjusts the distance from the top
    left: 10, // Adjusts the distance from the left
    backgroundColor: "#0782F9",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  backButtonText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center", // Ensures text is centered within the button
  },
  inputContainer: {
    flex: 1,
    width: "80%", // Adjusted to take the full width
    alignItems: "center", // Centers children horizontally
    justifyContent: "center", // Aligns children from the top
    paddingTop: 50,
  },
  input: {
    backgroundColor: "white",
    width: "80%", // Adjusted to a consistent width for all inputs
    borderRadius: 20,
    color: "black",
    marginTop: 10,
    borderWidth: 1,
    padding: 15, // Increased padding for better touch area
    borderColor: "#3B82F6",
    marginBottom: 10, // Adds space between inputs
  },
  dropdownContainer: {
    width: "80%", // Ensure dropdowns are also the same width as inputs
    marginBottom: 10, // Consistent spacing
    zIndex: 2,
  },
  dropdownStyle: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3B82F6",
    padding: 15, // Adjust padding to match inputs
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
  },
  dropdownListStyle: {
    borderColor: "#2C64C6",
    borderWidth: 1,
  },
  placeHolderStyle: {
    color: "#A9A9A9",
  },
  buttonContainer: {
    width: "80%", // Ensure the container takes full width
    alignItems: "center", // Center the button horizontally
    marginTop: 20, // Space from the last input or dropdown
  },
  button: {
    width: "80%", // Match the width of inputs and dropdowns
    padding: 15, // Comfortable padding for tapping
    borderRadius: 20,
    alignItems: "center", // Center text within the button
    backgroundColor: "#0782F9", // Example button color
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
  },
});
