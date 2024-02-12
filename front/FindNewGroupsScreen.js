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
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import myLogoPic from "../assets/2better-logo.jpeg";
import { sportTypeDataSearch, cityDataSearch } from "../back/DataBase";
import { MaterialIcons,MaterialCommunityIcons } from "@expo/vector-icons";

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
        <AntDesign name="back" size={24} color="#366A68" />
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
          setIsOpenTypeOfSport(false);
        }}
      >
        <View style={styles.container}>
          <View>
            <MaterialCommunityIcons
            name="arm-flex"
            color="#366A68"
            size={20}
            style={styles.icon}
            />
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={sportTypeDataSearch}
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
              containerStyle={[styles.dropdownContainer, { zIndex: 1 }]}
              style={styles.dropdownStyle}
              itemStyle={styles.dropdownItemStyle}
              dropDownStyle={styles.dropdownListStyle}
              searchable={true}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleTypeOfSportPress(item)}
            />
          </View>

          <View>
            <MaterialIcons
              name="location-city"
              color="#366A68"
              size={20}
              style={styles.icon}
            />
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={cityDataSearch}
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
              // containerStyle={styles.dropdownContainer}
              style={styles.dropdownStyle}
              itemStyle={styles.dropdownItemStyle}
              dropDownStyle={styles.dropdownListStyle}
              searchable={true}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleCityPress(item)}
            />
          </View>

          <Pressable style={styles.buttonSearch} onPress={handleSearchPress}>
            <Text style={styles.buttonTextSearch}>
              <FontAwesome name="search" size={20} color="white" /> Search Group
            </Text>
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
    justifyContent: "center",
    alignItems: "center",
    left: 60,
    gap: 20,
    width: "70%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: -15,
  },
  buttonSearch: {
    top: 50,
    backgroundColor: "#366A68",
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  buttonTextSearch: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  dropdownStyle: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    borderWidth: 3,
    borderRadius: 10,
    textAlign: "left",
    alignSelf: "flex-end",
    zIndex: 1,
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  dropdownListStyle: {
    borderColor: "#C3D4D3",
    borderWidth: 3,
    textAlign: "left",
  },
  placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: "center",
    backgroundColor: "#C3D4D3",
    zIndex: 1,
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
  },

});
