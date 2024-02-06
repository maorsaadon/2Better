import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  LogBox,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import myLogoPic from "../assets/2better-logo.jpg";
import { sportType_data, city_data } from "../back/DataBase";

const FindNewGroupScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [selectedTypeOfSport, setSelectedTypeOfSport] = useState(null);
  const [isOpenTypeOfSport, setIsOpenTypeOfSport] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [selectedTypeOfSport, selectedCity]);

  const handleTypeOfSportPress = (item) => {
    setSelectedTypeOfSport(item.value);
  };

  const handleCityPress = (item) => {
    setSelectedCity(item.value);
  };

  const handleSearchPress = () => {
    try {
      if (selectedTypeOfSport && selectedCity) {
        navigation.navigate("ResultGroups", {
          selectedCity: selectedCity,
          selectedTypeOfSport: selectedTypeOfSport,
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
          setIsOpenTypeOfSport(false);
        }}
      >
        <View style={styles.container}>
          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={sportType_data}
            open={isOpenTypeOfSport}
            setOpen={() => setIsOpenTypeOfSport(!isOpenTypeOfSport)}
            value={selectedTypeOfSport}
            setValue={setSelectedTypeOfSport}
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
            onSelectItem={(item) => handleTypeOfSportPress(item)}
          />

          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={city_data}
            open={isOpenCity}
            setOpen={() => setIsOpenCity(!isOpenCity)}
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

          <Pressable
            style={[styles.button, styles.pressableWithMargin]}
            onPress={handleSearchPress}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>
                <FontAwesome name="search" size={24} color="white" /> serch
                meeting
              </Text>
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default FindNewGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    alignItems: "center",
    paddingTop: 40, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 17,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#0782F9",
    width: "15%",
    padding: 5, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  backButtonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  container_text: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    backgroundColor: "#5B8BDF",
    alignItems: "right",
    paddingTop: 40, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 20,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: "contain", // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
  },
  button: {
    backgroundColor: "#2C64C6",
    width: 300,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  pressableWithMargin: {
    marginRight: 25,
  },
  iconTextContainer: {
    flexDirection: "colomn",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  input: {
    height: 50,
    width: "75%",
    borderColor: "#2C64C6",
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 3,
    marginBottom: 16,
    paddingLeft: 8,
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputWithMargin: {
    marginTop: 30, // Adjust the margin based on your design
    // Add other styles for the input with margin if needed
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // or 'space-around'
    alignItems: "center",
    marginVertical: 20, // Adjust as needed
  },
  pressableContainer: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  serchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  calendarIcon: {
    marginTop: 10, // Adjust the space between text and icon
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },

  modalCloseButton: {
    backgroundColor: "#2C64C6",
    padding: 10,
    marginBottom: 30,
    marginRight: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  categoryInputContainer: {
    marginBottom: 16,
    width: "80%",
    borderColor: "#2C64C6",
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 3,
    paddingLeft: 10,
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "flex-end",
    height: 40,
  },

  categoryInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryInputText: {
    color: "#2C64C6",
    fontSize: 16,
  },

  categoryButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },

  inputPlaceholder: {
    height: 40,
    textAlign: "right",
    color: "#CCCCCC",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C64C6",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 15,
  },

  selectedCategoryText: {
    color: "white",
    fontSize: 16,
    padding: 5,
  },

  removeCategoryButton: {
    color: "white",
    marginLeft: 50,
    marginRight: 50,
    fontWeight: "bold",
  },

  chooseButton: {
    color: "blue",
  },
  container_icon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  iconContainer_icon: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon_icon: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  iconScrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50, // Adjust padding as needed
    height: 120,
    paddingVertical: -100,
  },
  searchtext: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },

  loginContainer: {
    flexDirection: "row", // Ensure items are in the same row
    alignItems: "center", // Align items vertically in the center
    marginTop: 16,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    marginRight: 8, // Add margin to separate text and button
    marginBottom: 12,
  },
  dropdownContainer: {
    height: 40,
    width: "80%",
    marginBottom: 16,
    textAlign: "left",
    zIndex: 2,
  },
  dropdownStyle: {
    backgroundColor: "white",
    borderColor: "#2C64C6",
    borderWidth: 3,
    borderRadius: 10,
    textAlign: "left",
    alignSelf: "flex-end",
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  dropdownListStyle: {
    borderColor: "#2C64C6",
    borderWidth: 3,
    textAlign: "left",
  },
  placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: "left",
  },
  datePickerContainer: {
    marginup: 30, // Adjust this value as needed for the desired spacing
  },
});

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     alignItems: 'center', // Center children horizontally
//     justifyContent: 'center', // Center children vertically
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   backButton: {
//     alignSelf: "flex-start", // Aligns the button to the start of its container
//     position: "absolute", // Positions the button absolutely within its container
//     top: 10, // Adjusts the distance from the top
//     left: 10, // Adjusts the distance from the left
//     backgroundColor: "#0782F9",
//     padding: 10,
//     borderRadius: 10,
//     margin: 10,
//   },
//   backButtonText: {
//     color: "white",
//     fontWeight: "700",
//     textAlign: "center", // Ensures text is centered within the button
//   },
//   inputContainer: {
//     flex: 1,
//     width: "80%", // Adjusted to take the full width
//     alignItems: "center", // Centers children horizontally
//     justifyContent: "center", // Aligns children from the top
//     paddingTop: 50,
//   },
//   input: {
//     backgroundColor: "white",
//     width: "80%", // Adjusted to a consistent width for all inputs
//     borderRadius: 20,
//     color: "black",
//     marginTop: 10,
//     borderWidth: 1,
//     padding: 15, // Increased padding for better touch area
//     borderColor: "#3B82F6",
//     marginBottom: 10, // Adds space between inputs
//   },
//   dropdownContainer: {
//     width: "80%", // Ensure dropdowns are also the same width as inputs
//     marginBottom: 10, // Consistent spacing
//     zIndex: 2,
//   },
//   dropdownStyle: {
//     backgroundColor: "white",
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#3B82F6",
//     padding: 15, // Adjust padding to match inputs
//   },
//   dropdownItemStyle: {
//     justifyContent: "flex-start",
//   },
//   dropdownListStyle: {
//     borderColor: "#2C64C6",
//     borderWidth: 1,
//   },
//   placeHolderStyle: {
//     color: "#A9A9A9",
//   },
//   buttonContainer: {
//     width: "80%", // Ensure the container takes full width
//     alignItems: "center", // Center the button horizontally
//     marginTop: 20, // Space from the last input or dropdown
//   },
//   button: {
//     width: "80%", // Match the width of inputs and dropdowns
//     padding: 15, // Comfortable padding for tapping
//     borderRadius: 20,
//     alignItems: "center", // Center text within the button
//     backgroundColor: "#0782F9", // Example button color
//   },
//   buttonOutlineText: {
//     color: "white",
//     fontWeight: "700",
//   },
// });
