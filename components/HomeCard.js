import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomSlider from "./CustomSlider";
import {
  sportIconMapping_MaterialCommunityIcons,
  sportIconMapping_FontAwesome,
  sportIconMapping_FontAwesome5,
} from "../back/DataBase";
import { auth } from "../back/firebase";
import React, { useEffect, useState } from "react";
import MeetingService from "../back/MeetingService";
import { stylesHomeCard } from "../components/StylesSheets";
import GroupService from "../back/GroupService";
import NotificationService from "../back/NotificationsService";
import { userFirstName, userLastName } from "../back/UserService";
import { serverTimestamp } from "firebase/firestore";

const HomeCard = ({ meeting }) => {
  const groupName = meeting?.GroupName ?? "Default Name";
  const [groupLeaderEmail, setGroupLeaderEmail] = useState("");
  const [currentParticipants, setCurrentParticipants] = useState(
    meeting.Members.length
  );
  const totalCapacity = meeting.TotalCapacity || 10;
  const [isUserInMeeting, setIsUserInMeeting] = useState(false);
  const [isUserInGroup, setIsUserInGroup] = useState(false);
  const [flageRequest, setFlageRequest] = useState(true);
  const content =
    "`" +
    userFirstName +
    " " +
    userLastName +
    "` wants to join your group: `" +
    groupName +
    "`";

  useEffect(() => {
    const checkUserInMeeting = async () => {
      const isInMeeting = await MeetingService.isInTheMeeting(
        meeting.id,
        auth.currentUser.email
      );
      const isInGroup = await GroupService.isInTheGroup(groupName);
      setIsUserInMeeting(isInMeeting);
      setIsUserInGroup(isInGroup);
      const leaderName = await GroupService.getLeaderEmail(groupName);
      setGroupLeaderEmail(leaderName);
    };
    const checkAndDeleteIfMeetingPassed = () => {
      const currentTimestamp = new Date().getTime();
      const meetingTimestamp = meeting?.Timestamp?.toDate().getTime() || 0;

      if (meetingTimestamp < currentTimestamp) {
        console.log(`Meeting ID: ${meeting.id} has passed. Deleting...`);
        MeetingService.handleDeleteMeeting(meeting.id);
        GroupService.removeGroupMeeting(meeting.id, meeting.GroupName);
      }
    };
    checkAndDeleteIfMeetingPassed();
    checkUserInMeeting();
  }, [meeting.id, auth.currentUser.email, meeting.Members, meeting.Timestamp]);

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

  const handleJoinPress = () => {
    setIsUserInMeeting(true); // Set hasJoined to true when button is pressed
    setCurrentParticipants(currentParticipants + 1);
    MeetingService.addUserToMeeting(meeting.id, auth.currentUser.email);
    console.log("Click on Join Meeting!");
  };

  const handleRequestPress = async () => {
    setFlageRequest(false);
    NotificationService.handleAddNewNotification(
      "",
      groupName,
      content,
      "Meeting Join request",
      serverTimestamp(),
      auth.currentUser.email,
      groupLeaderEmail
    );
    Alert.alert(
      "Request to Join Group",
      "This is only a request to join the group, please wait to approve."
    );
  };

  return (
    <SafeAreaView>
      <View style={stylesHomeCard.card}>
        <View style={stylesHomeCard.cardTopRow}>
          {getSportIcon(meeting.SportType)}
          <View>
            <Text style={stylesHomeCard.title}>{groupName}</Text>
            <Text style={stylesHomeCard.subTitle}>{meeting.SportType}</Text>
          </View>
        </View>
        <View style={stylesHomeCard.cardMiddleRow}>
          <View style={stylesHomeCard.iconAndTextContainer}>
            <MaterialIcons name="location-on" size={22} color="black" />
            <Text>{meeting.Location}</Text>
          </View>
          <View style={stylesHomeCard.iconAndTextContainer}>
            <FontAwesome6 name="calendar-days" size={20} color="black" />
            <Text>{meeting.Date}</Text>
          </View>
          <View style={stylesHomeCard.iconAndTextContainer}>
            <AntDesign name="clockcircle" size={20} color="black" />
            <Text>{meeting.Time}</Text>
          </View>
        </View>
        <View style={stylesHomeCard.participantContainer}>
          <Text style={stylesHomeCard.participantText}>
            {currentParticipants}
          </Text>
          <CustomSlider
            minimumValue={0}
            maximumValue={totalCapacity}
            value={currentParticipants}
          />
          <Text style={stylesHomeCard.participantText}>{totalCapacity}</Text>
          <AntDesign name="user" size={22} color="black" />
        </View>
        <View style={stylesHomeCard.cardBottomRow}>
          {!isUserInMeeting && isUserInGroup ? (
            <TouchableOpacity
              style={stylesHomeCard.button}
              onPress={handleJoinPress}
            >
              <Text style={stylesHomeCard.buttonText}>Join</Text>
            </TouchableOpacity>
          ) : !isUserInGroup && flageRequest ? (
            <TouchableOpacity
              style={stylesHomeCard.button}
              onPress={handleRequestPress}
            >
              <Text style={stylesHomeCard.buttonText}>Request</Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeCard;
