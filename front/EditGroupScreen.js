// src/components/GroupDetailScreen.js
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import GroupService from "../back/GroupService";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { cityData, sportTypeData } from "../back/DataBase";
import { stylesEditGroup } from "../components/StylesSheets";

const EditGroupScreen = ({ route }) => {
  const { groupName } = route.params;

  const navigation = useNavigation();
  const [leaderEmail, setLeaderEmail] = useState("");
  const [city, setCity] = useState("");
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [sportType, setSportType] = useState("");
  const [isOpenTypeOfSport, setIsOpenTypeOfSport] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await GroupService.getGroupByName(groupName);
        if (data) {
          setLeaderEmail(data.LeaderEmail);
        } else {
          // Handle the case where the group data is not found
          console.log("No group data found for:", groupName);
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    fetchGroupDetails();
  }, [groupName, city, sportType]);

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await GroupService.updateGroupDetails(groupName, city, sportType);
      navigation.replace("MyGroups");
    } catch (error) {
      console.error("Error updating group details:", error);
    }
  };

  const handleTypeOfSportPress = (item) => {
    setSportType(item.value);
  };

  const handleCityPress = (item) => {
    setCity(item.value);
  };

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  // Render group details and update button
  return (
    <View style={stylesEditGroup.overlay}>
      <View style={stylesEditGroup.backContainer}>
        <TouchableOpacity
          onPress={backButton}
          style={stylesEditGroup.backButton}
        >
          <AntDesign name="back" size={24} color="#366A68" />
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
          setIsOpenTypeOfSport(false);
        }}
      >
        <View style={stylesEditGroup.container}>
          <Text style={stylesEditGroup.label}>Group Name:</Text>
          <View style={stylesEditGroup.inputRow}>
            <FontAwesome
              name="group"
              color="#366A68"
              size={20}
              style={stylesEditGroup.icon}
            />
            <Text style={stylesEditGroup.input}>{groupName}</Text>
          </View>

          <Text style={stylesEditGroup.label}>Leader Email:</Text>
          <View style={stylesEditGroup.inputRow}>
            <MaterialIcons
              name="email"
              color="#366A68"
              size={20}
              style={stylesEditGroup.icon}
            />
            <Text style={stylesEditGroup.input}>{leaderEmail}</Text>
          </View>

          <Text style={stylesEditGroup.labelSport}>Sport Type:</Text>
          <View style={stylesEditGroup.dropContainer}>
            <MaterialCommunityIcons
              name="arm-flex"
              color="#366A68"
              size={20}
              style={stylesEditGroup.iconDrop}
            />
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={sportTypeData}
              open={isOpenTypeOfSport}
              setOpen={() => setIsOpenTypeOfSport(!isOpenTypeOfSport)}
              value={sportType}
              setValue={setSportType}
              dropDownDirection="Top"
              showArrowIcon={false}
              mode="BADGE"
              badgeColors={"#2C64C6"}
              badgeDotColors={["white"]}
              badgeTextStyle={{ color: "white" }}
              placeholder="Select type of sport"
              placeholderStyle={stylesEditGroup.placeHolderStyle}
              style={[stylesEditGroup.dropdownStyle, { zIndex: 2 }]}
              itemStyle={stylesEditGroup.dropdownItemStyle}
              dropDownStyle={stylesEditGroup.dropdownListStyle}
              searchable={false}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleTypeOfSportPress(item)}
            />
          </View>

          <Text style={stylesEditGroup.labelCity}>City:</Text>
          <View style={stylesEditGroup.dropContainer}>
            <MaterialIcons
              name="location-city"
              color="#366A68"
              size={20}
              style={stylesEditGroup.iconDrop}
            />
            <DropDownPicker
              listMode={Platform.OS === "ios" ? "SCROLLVIEW" : "MODAL"}
              items={cityData}
              open={isOpenCity}
              setOpen={() => setIsOpenCity(!isOpenCity)}
              value={city}
              setValue={setCity}
              dropDownDirection="Top"
              showArrowIcon={false}
              mode="BADGE"
              badgeColors={"#2C64C6"}
              badgeDotColors={["white"]}
              badgeTextStyle={{ color: "white" }}
              placeholder="Select city"
              placeholderStyle={stylesEditGroup.placeHolderStyle}
              style={[stylesEditGroup.dropdownStyle, { zIndex: 2 }]}
              itemStyle={stylesEditGroup.dropdownItemStyle}
              dropDownStyle={stylesEditGroup.dropdownListStyle}
              searchable={false}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleCityPress(item)}
            />
          </View>

          <View style={stylesEditGroup.buttonsRow}>
            <Pressable style={stylesEditGroup.saveButton} onPress={handleSave}>
              <Text style={stylesEditGroup.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default EditGroupScreen;
