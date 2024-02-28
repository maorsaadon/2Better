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
import GroupService from "../back/GroupService";
import { auth } from "../back/firebase";
import React, { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;

const MemberGroupCard = ({ group }) => {
  
  const groupName = group?.GroupName ?? "Default Name";
  const groupLeaderEmail = group?.LeaderEmail ?? "Default Email";
  const NumOfMembers = group.Members;
  const [pressUnsubscribe, setPressUnsubscribe] = useState(false);

  const content = "`" + userFirstName + " " + userLastName + "` wants to unsubscribe to your group `" + groupName +"`"

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

  const handleUnsubscribePress = () =>{
    setPressUnsubscribe(true);
    NotificationService.handleAddNewNotification(groupName, content, "Group unsubscribe", serverTimestamp(), auth.currentUser.email, groupLeaderEmail)
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
            <Text style={MemberGroupCardStyles.subTitle}>{group.SportType}</Text>
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
      </View>) : <Text></Text>}
    </SafeAreaView>
  );
};

export default MemberGroupCard;

const MemberGroupCardStyles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#5B8BDF",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 30,
    gap: 15,
    flex: 1,
  },
  card: {
    width: screenWidth - 32,
    marginTop: -30,
    backgroundColor: "#E9F1E9", // Assuming a white card background
    borderRadius: 15, // Rounded corners
    marginVertical: 8, // Adds vertical space between items
    marginHorizontal: 16, // Adds horizontal space and centers the card in the view
    padding: 16, // Internal spacing between the border and content
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow position
    shadowOpacity: 0.22, // Shadow opacity
    shadowRadius: 2.22, // Shadow blur radius
    elevation: 3, // Elevation for Android
    borderWidth: 1, // Border width
    borderColor: "#E0E0E0",
  },
  cardTopRow: {
    marginTop: 0, 
    marginLeft: 0, 
    alignSelf: "flex-start", 
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardMiddleRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 0,
  },
  sportIcon: {
    width: 30, 
    height: 30, 
    resizeMode: "contain",
    marginRight: 10, 
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 0,
  },
  subTitle: {
    opacity: 0.6,
    alignSelf: "flex-start",
    marginLeft: 0,
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "#366A68",
    width: 120,
    paddingVertical: 10,
    borderRadius: 10,
    top: 5,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    minimumTrackTintColor: "black",
    maximumTrackTintColor: "#C0C0C0", // Color for the remaining track
    thumbTintColor: "white",
  },
  participantText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    // Add margin to the left or right to space the text from the slider
    marginHorizontal: 5,
  },
});
