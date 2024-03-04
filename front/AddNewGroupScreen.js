import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  LogBox,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import GroupService from "../back/GroupService";
import { sportTypeData, cityData } from "../back/DataBase";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { stylesNewGroup } from "../components/StylesSheets";



const AddNewGroupScreen = () => {
  const navigation = useNavigation();

  const [groupName, setGroupName] = useState("");
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
      );
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={stylesNewGroup.safeArea}>
      <TouchableOpacity onPress={backButton} style={stylesNewGroup.backButton}>
        <AntDesign name="back" size={24} color="#366A68" />
      </TouchableOpacity>
        <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCities(false);
          setIsOpenSportTypes(false);
        }}
      >
        <View style={stylesNewGroup.inputContainer}>
          <TextInput
            placeholder="Group name"
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            style={stylesNewGroup.input}
          />
          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={sportTypeData}
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
            placeholderStyle={stylesNewGroup.placeHolderStyle}
            containerStyle={[stylesNewGroup.dropdownContainer, { zIndex: 3 }]}
            style={stylesNewGroup.dropdownStyle}
            itemStyle={stylesNewGroup.dropdownItemStyle}
            dropDownStyle={stylesNewGroup.dropdownListStyle}
            searchable={true}
            searchPlaceholder="Search..."
            onSelectItem={(item) => handleSportTypePress(item)}
          />

          <DropDownPicker
            listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
            items={cityData}
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
            placeholderStyle={stylesNewGroup.placeHolderStyle}
            containerStyle={stylesNewGroup.dropdownContainer}
            style={stylesNewGroup.dropdownStyle}
            itemStyle={stylesNewGroup.dropdownItemStyle}
            dropDownStyle={stylesNewGroup.dropdownListStyle}
            searchable={true}
            searchPlaceholder="Search..."
            onSelectItem={(item) => handleCityPress(item)}
          />
        </View>
      </TouchableWithoutFeedback>

        <TouchableOpacity onPress={AddButton} style={stylesNewGroup.addButton}>
          <Text style={stylesNewGroup.addButtonText}>Add</Text>
        </TouchableOpacity>

    </SafeAreaView>
  );
};

export default AddNewGroupScreen;

