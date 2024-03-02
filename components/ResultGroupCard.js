import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  sportIconMapping_MaterialCommunityIcons,
  sportIconMapping_FontAwesome,
  sportIconMapping_FontAwesome5,
} from "../back/DataBase";
import NotificationService from "../back/NotificationsService";
import { userFirstName, userLastName, UserCity } from "../back/UserService";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../back/firebase";
import React, { useEffect, useState } from "react";
import { ResultStyles } from "./StylesSheets";


const screenWidth = Dimensions.get("window").width;

const ResultGroupCard = ({ group }) => {

  const groupName = group?.GroupName ?? "Default Name";
  const groupLeaderEmail = group?.LeaderEmail ?? "Default Email";
  const NumOfMembers = group.Members ;
  const [isRequest, setIsRequest] = useState(true);

  const content = "`" + userFirstName + " " + userLastName + "` wants to join your group: `" + groupName +"`"

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

    return null; 
  };

  const handleRequestPress = () =>{
    setIsRequest(false);
    NotificationService.handleAddNewNotification(groupName, content, "Group Join request", serverTimestamp(), auth.currentUser.email, groupLeaderEmail);
  };

  return (
    <SafeAreaView>
      <View style={ResultStyles.card}>
        <View style={ResultStyles.cardTopRow}>
          {getSportIcon(group.SportType)}
          <View>
            <Text style={ResultStyles.title}>{groupName}</Text>
            <Text style={ResultStyles.subTitle}>{group.SportType}</Text>
          </View>
        </View>
        <View style={ResultStyles.cardMiddleRow}>
          <View style={ResultStyles.iconAndTextContainer}>
            <MaterialIcons name="location-on" size={22} color="black" />
            <Text>{group.City}</Text>
          </View>
          <View style={ResultStyles.iconAndTextContainer}>
            <MaterialCommunityIcons name="email" size={22} color="black" />
            <Text>{group.LeaderEmail}</Text>
          </View>
          <View style={ResultStyles.iconAndTextContainer}>
            <AntDesign name="user" size={22} color="black" />
            <Text>{NumOfMembers}</Text>
          </View>
        </View>
{isRequest &&(        <View style={ResultStyles.cardBottomRow}>
          <TouchableOpacity 
          style={ResultStyles.button}
          onPress={() => handleRequestPress(groupName)}
          >
            <Text style={ResultStyles.buttonText}>Request</Text>
          </TouchableOpacity>
        </View>)}
      </View>
    </SafeAreaView>
  );
};

export default ResultGroupCard;

