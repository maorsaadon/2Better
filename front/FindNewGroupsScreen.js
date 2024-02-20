import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  LogBox,
  Pressable,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import myLogoPic from "../assets/default.png";
import DropDownPicker from "react-native-dropdown-picker";
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

 

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>

    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
          setIsOpenTypeOfSport(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.dropStyleContainer}>
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

          <View style={styles.dropStyleContainer}>
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
              containerStyle={[styles.dropdownContainer, { zIndex: 1 }]}
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
      </SafeAreaView>
      </ImageBackground>
  );
};

export default FindNewGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "70%",
    gap: 20,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    backgroundColor: "rgba(233, 240, 233, 0.7)", // Adjust the opacity as needed
  },
  dropStyleContainer:{
    marginBottom: 16,
    textAlign: "center",
    zIndex: 1,
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: -15,
  },
  dropContainer:{
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "70%",
  },
  dropdownStyle: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    width: "125%",
    borderWidth: 3,
    borderRadius: 10,
    textAlign: "center",
    alignSelf: "flex-end",
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "center",
    
  },
  dropdownListStyle: {
    borderColor: "#C3D4D3",
    borderWidth: 3,
    textAlign: "center",
    paddingLeft:50,
  },
  dropdownContainer: {
    height: 40,
    width: "80%",
    marginBottom: 16,
    textAlign: "center",
    zIndex: 2,
  },
  placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: "center",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
  },
  buttonSearch: {
    top: 0,
    backgroundColor: "#366A68",
    width: "70%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTextSearch: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

});