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
import myLogoPic from "../assets/default.png";
import { sportType_data, city_data } from "../back/DataBase";
import { MaterialIcons } from "@expo/vector-icons";

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
      <MaterialIcons name="chevron-left" size={30} color="white" />
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40, 
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
    backgroundColor: "#2C64C6",
    width: "15%",
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  logo: {
    width: 100, 
    height: 100, 
    resizeMode: "contain", 
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
  pressableWithMargin: {
    marginRight: 25,
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

});

