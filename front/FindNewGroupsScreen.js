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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { stylesFindNew } from "../components/StylesSheets";

const FindNewGroupScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [selectedTypeOfSport, setSelectedTypeOfSport] = useState(null);
  const [isOpenTypeOfSport, setIsOpenTypeOfSport] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);
  const [cityVisible, setCityVisible] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, [selectedTypeOfSport, selectedCity]);

  const handleTypeOfSportPress = (item) => {
    setIconVisible(false);
    setSelectedTypeOfSport(item.value);
  };

  const handleCityPress = (item) => {
    setCityVisible(false);
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
    <ImageBackground source={myLogoPic} style={stylesFindNew.backgroundImage}>
      <SafeAreaView style={stylesFindNew.safeArea}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsOpenCity(false);
            setIsOpenTypeOfSport(false);
          }}
        >
          <View style={stylesFindNew.container}>
            <View style={stylesFindNew.dropStyleContainer}>
              {iconVisible && (
                <MaterialCommunityIcons
                  name="arm-flex"
                  color="#366A68"
                  size={20}
                  style={stylesFindNew.icon}
                />
              )}
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
                placeholderStyle={stylesFindNew.placeHolderStyle}
                containerStyle={[
                  stylesFindNew.dropdownContainer,
                  { zIndex: 1 },
                ]}
                style={stylesFindNew.dropdownStyle}
                itemStyle={stylesFindNew.dropdownItemStyle}
                dropDownStyle={stylesFindNew.dropdownListStyle}
                searchable={true}
                searchPlaceholder="Search..."
                onSelectItem={(item) => handleTypeOfSportPress(item)}
              />
            </View>

            <View style={stylesFindNew.dropStyleContainer}>
              {cityVisible && ( // Conditionally render the icon
                <MaterialIcons
                  name="location-city"
                  color="#366A68"
                  size={20}
                  style={stylesFindNew.icon}
                />
              )}
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
                placeholderStyle={stylesFindNew.placeHolderStyle}
                containerStyle={[
                  stylesFindNew.dropdownContainer,
                  { zIndex: 1 },
                ]}
                style={stylesFindNew.dropdownStyle}
                itemStyle={stylesFindNew.dropdownItemStyle}
                dropDownStyle={stylesFindNew.dropdownListStyle}
                searchable={true}
                searchPlaceholder="Search..."
                onSelectItem={(item) => handleCityPress(item)}
              />
            </View>

            <Pressable
              style={stylesFindNew.buttonSearch}
              onPress={handleSearchPress}
            >
              <Text style={stylesFindNew.buttonTextSearch}>
                <FontAwesome name="search" size={20} color="white" /> Search
                Group
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FindNewGroupScreen;
