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

const EditGroupScreen = ({ route }) => {
  const { groupName } = route.params;

  const navigation = useNavigation();
  const [leaderEmail, setLeaderEmail] = useState("");
  const [totalCapacity, setTotalCapacity] = useState(0);
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
          setTotalCapacity(data.TotalCapacity);
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
      await GroupService.updateGroupDetails(
        groupName,
        city,
        sportType,
        totalCapacity
      );
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
    <View style={styles.overlay}>
      <View style={styles.backContainer}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <AntDesign name="back" size={24} color="#366A68" />
      </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpenCity(false);
          setIsOpenTypeOfSport(false);
        }}
      >
        <View style={styles.container}>
          <Text style={styles.label}>Group Name:</Text>
          <View style={styles.inputRow}>
            <FontAwesome
              name="group"
              color="#366A68"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.input}>{groupName}</Text>
          </View>

          <Text style={styles.label}>Leader Email:</Text>
          <View style={styles.inputRow}>
            <MaterialIcons
              name="email"
              color="#366A68"
              size={20}
              style={styles.icon}
            />
            <Text style={styles.input}>{leaderEmail}</Text>
          </View>

          <Text style={styles.label}>TotalCapacity:</Text>
          <View style={styles.inputRow}>
            <MaterialIcons
              name="person"
              color="#366A68"
              size={20}
              style={styles.icon}
            />
            <TextInput
              value={String(totalCapacity)}
              onChangeText={(text) => setTotalCapacity(parseInt(text) || 0)}
              style={styles.input}
            />
          </View>

          <Text style={styles.label}>Sport Type:</Text>
          <View style={styles.dropContainer}>
            <MaterialCommunityIcons
              name="arm-flex"
              color="#366A68"
              size={20}
              style={styles.iconDrop}
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
              placeholderStyle={styles.placeHolderStyle}
              style={[styles.dropdownStyle, { zIndex: 2 }]}
              itemStyle={styles.dropdownItemStyle}
              dropDownStyle={styles.dropdownListStyle}
              searchable={false}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleTypeOfSportPress(item)}
            />
          </View>

          <Text style={styles.label}>City:</Text>
          <View style={styles.dropContainer}>
            <MaterialIcons
              name="location-city"
              color="#366A68"
              size={20}
              style={styles.iconDrop}
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
              placeholderStyle={styles.placeHolderStyle}
              style={[styles.dropdownStyle, { zIndex: 2 }]}
              itemStyle={styles.dropdownItemStyle}
              dropDownStyle={styles.dropdownListStyle}
              searchable={false}
              searchPlaceholder="Search..."
              onSelectItem={(item) => handleCityPress(item)}
            />
          </View>

          <View style={styles.buttonsRow}>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
    left: -120,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(233, 240, 233, 0.7)", // Adjust the opacity as needed
  },
  backContainer: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 20,
  },

  container: {
    top: -150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    minWidth: "80%",
    color: "#A9A9A9",
    fontSize: 16,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  icon: {
    position: "absolute",
    left: 5,
    zIndex: 3,
  },
  iconDrop: {
    position: "absolute",
    left: -25,
    top: 25,
    zIndex: 1,
  },
  saveButton: {
    top: 0,
    backgroundColor: "#366A68",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: -15,
  },
  dropContainer: {
    marginBottom: 16,
    textAlign: "center",
    zIndex: 1,
    width: "70%",
    
  },
  dropdownStyle: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginTop: 15,
    width: "124%",
    left: 35,
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  dropdownListStyle: {
    borderColor: "#C3D4D3",
    borderWidth: 3,
  },
  placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: "left",
    left: 40,
    backgroundColor: "#C3D4D3",
    fontSize: 16,
    maxWidth: 200,
    zIndex: 1,
  },
});

export default EditGroupScreen;
