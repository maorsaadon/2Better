import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
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
import { userFirstName, userLastName } from "../back/UserService";
import { serverTimestamp } from "firebase/firestore";
import GroupService from "../back/GroupService";
import { auth } from "../back/firebase";
import React, { useState } from "react";
import { MemberGroupCardStyles } from "./StylesSheets";

const MemberGroupCard = ({ group }) => {
  const groupName = group?.GroupName ?? "Default Name";
  const groupLeaderEmail = group?.LeaderEmail ?? "Default Email";
  const NumOfMembers = group.Members;
  const [pressUnsubscribe, setPressUnsubscribe] = useState(false);

  const content =
    "`" +
    userFirstName +
    " " +
    userLastName +
    "` wants to unsubscribe to your group `" +
    groupName +
    "`";

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

  const handleUnsubscribePress = () => {
    setPressUnsubscribe(true);
    NotificationService.handleAddNewNotification(
      "",
      groupName,
      content,
      "Group unsubscribe",
      serverTimestamp(),
      auth.currentUser.email,
      groupLeaderEmail
    );
    GroupService.handleJoinGroup(true, group.GroupName);
  };

  return (
    <SafeAreaView>
      {!pressUnsubscribe ? (
        <View style={MemberGroupCardStyles.card}>
          <View style={MemberGroupCardStyles.cardTopRow}>
            {getSportIcon(group.SportType)}
            <View>
              <Text style={MemberGroupCardStyles.title}>{groupName}</Text>
              <Text style={MemberGroupCardStyles.subTitle}>
                {group.SportType}
              </Text>
            </View>
          </View>
          <View style={MemberGroupCardStyles.cardMiddleRow}>
            <View style={MemberGroupCardStyles.iconAndTextContainer}>
              <MaterialIcons name="location-on" size={22} color="black" />
              <Text>{group.City}</Text>
            </View>
            <View style={MemberGroupCardStyles.iconAndTextContainer}>
              <MaterialCommunityIcons name="email" size={22} color="black" />
              <Text>{group.LeaderEmail}</Text>
            </View>
            <View style={MemberGroupCardStyles.iconAndTextContainer}>
              <AntDesign name="user" size={22} color="black" />
              <Text>{NumOfMembers}</Text>
            </View>
          </View>
          <View style={MemberGroupCardStyles.cardBottomRow}>
            <TouchableOpacity
              style={MemberGroupCardStyles.button}
              onPress={handleUnsubscribePress}
            >
              <Text style={MemberGroupCardStyles.buttonText}>Unsubscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text></Text>
      )}
    </SafeAreaView>
  );
};

export default MemberGroupCard;
