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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import myLogoPic from "../assets/2better-logo.jpg";

const sportType_data = [
  { label: "Basketball", value: "Basketball" },
  { label: "Cycling", value: "Cycling" },
  { label: "Football", value: "Football" },
  { label: "Kitesurfing", value: "Kitesurfing" },
  { label: "Running", value: "Running" },
  { label: "Tennis", value: "Tenni" },
  { label: "Swimming", value: "Swimming" },
];
const city_data = [
  { label: "Tel-Aviv", value: "Tel-Aviv" },
  { label: "Ariel", value: "Ariel" },
  { label: "Jerusalem", value: "Jerusalem" },
  { label: "Beer-Sheva", value: "Beer-Sheva" },
];

const FindNewGroupScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [selectedTypeOfSport, setSelectedTypeOfSport] = useState(null);
  const [isOpenTypeOfSport, setIsOpenTypeOfSport] = useState(false);

  useEffect(() => {
    console.log(
      `city: ${selectedCity},
      sportType: ${selectedTypeOfSport}`
    );
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
            listMode={Platform.OS==='ios' ? "DEFAULT" : "MODAL"}
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
            listMode={Platform.OS==='ios' ? "DEFAULT" : "MODAL"}
            items={city_data}
            open={isOpenCity}
            setOpen={()=>setIsOpenCity(!isOpenCity)}
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
            containerStyle={ styles.dropdownContainer}
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
    backgroundColor: "#3B82F6",
    width: "20%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 6,
  },
  backButtonText: {
    alignSelf: "center",
    color: "white",
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
    alignSelf: 'flex-end' 
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
