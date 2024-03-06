import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { GroupService } from "../back/GroupService";
import React, { useState } from "react";
import {
  sportIconMapping_MaterialCommunityIcons,
  sportIconMapping_FontAwesome,
  sportIconMapping_FontAwesome5,
} from "../back/DataBase";
import { ManagerGroupCardStyles } from "./StylesSheets";

const ManagerGroupCard = ({ group }) => {
  const navigation = useNavigation();
  console.log(group);
  const groupName = group?.GroupName ?? "Default Name";
  const NumOfMembers = group.Members;
  const [isDelete, setIsDelete] = useState(true);

  const getSportIcon = (sportType) => {
    const iconName = sportIconMapping_FontAwesome5[sportType];
    if (iconName) {
      return <FontAwesome5 name={iconName} size={30} color="black" />;
    }
    const iconNameFA = sportIconMapping_FontAwesome[sportType];
    if (iconNameFA) {
      return <FontAwesome name={iconNameFA} size={30} color="black" />;
    }
    const iconNameMCI = sportIconMapping_MaterialCommunityIcons[sportType];
    if (iconNameMCI) {
      return (
        <MaterialCommunityIcons name={iconNameMCI} size={30} color="black" />
      );
    }

    return null; // Return null if no icon is found
  };

  const deleteButton = (groupName) => {
    try {
      GroupService.handleDeleteGroup(groupName);
      setIsDelete(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditButton = (groupName) => {
    try {
      navigation.replace("EditGroup", { groupName });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleMembersListButton = () => {
    console.log("Click on members list");
    navigation.replace("MembersList", { group });
  };

  return (
    <SafeAreaView>
      {isDelete && (
        <View style={ManagerGroupCardStyles.card}>
          <View style={ManagerGroupCardStyles.cardTopRow}>
            {getSportIcon(group.SportType)}
            <View>
              <Text style={ManagerGroupCardStyles.title}>{groupName}</Text>
              <Text style={ManagerGroupCardStyles.subTitle}>
                {group.SportType}
              </Text>
            </View>
          </View>
          <View style={ManagerGroupCardStyles.cardMiddleRow}>
            <View style={ManagerGroupCardStyles.iconAndTextContainer}>
              <MaterialIcons name="location-on" size={22} color="black" />
              <Text>{group.City}</Text>
            </View>
            <View style={ManagerGroupCardStyles.iconAndTextContainer}>
              <MaterialCommunityIcons name="email" size={22} color="black" />
              <Text>{group.LeaderEmail}</Text>
            </View>
            <View style={ManagerGroupCardStyles.iconAndTextContainer}>
              <AntDesign
                name="user"
                size={22}
                color="black"
                onPress={handleMembersListButton}
              />
              <Text>{NumOfMembers}</Text>
            </View>
          </View>
          <View style={ManagerGroupCardStyles.cardBottomRow}>
            <TouchableOpacity
              onPress={() => handleEditButton(groupName)}
              style={ManagerGroupCardStyles.editButton}
            >
              <Text style={ManagerGroupCardStyles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteButton(groupName)}
              style={ManagerGroupCardStyles.deleteButton}
            >
              <FontAwesome5
                name="trash"
                size={20}
                color="black"
                style={ManagerGroupCardStyles.buttonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ManagerGroupCard;
