import {
Text,
View,
SafeAreaView,
Dimensions,
TouchableOpacity,
} from "react-native";
import {
AntDesign,
FontAwesome5,
FontAwesome6,
MaterialIcons,
FontAwesome,
MaterialCommunityIcons,
Entypo,
} from "@expo/vector-icons";
import NavigationButton from "./NavigationButton";
import {
sportIconMapping_MaterialCommunityIcons,
sportIconMapping_FontAwesome,
sportIconMapping_FontAwesome5,
} from "../back/DataBase";
import { auth } from "../back/firebase";
import React, { useEffect, useState } from "react";
import MeetingService from '../back/MeetingService';
import { useNavigation } from '@react-navigation/core';
import colors from '../colors';
import { UpcomingStyles } from "./StylesSheets";
import GroupService from "../back/GroupService";


const screenWidth = Dimensions.get("window").width;

const UpcomingMeetingCard = ({ meeting }) => {
const groupName = meeting?.GroupName ?? "Default Name";

const [isUnJoin, setIsUnJoin] = useState(true);

const navigation = useNavigation();


useEffect(() => {
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
}, [meeting.id, meeting.Timestamp]);


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

const handleUnJoinPress = () => {
    setIsUnJoin(false);
    MeetingService.removeUserFromMeeting(meeting.id, auth.currentUser.email);
    console.log("Click on Join Meeting!");
};

const handleChatPress = () => {
    navigation.navigate("Chat" , {meeting})
    console.log("chat is pressed!");
}

return (
    <SafeAreaView>
    {isUnJoin && (<View style={UpcomingStyles.card}>
        <View style={UpcomingStyles.cardTopRow}>
        {getSportIcon(meeting.SportType)}
        <View>
            <Text style={UpcomingStyles.title}>{groupName}</Text>
            <Text style={UpcomingStyles.subTitle}>{meeting.SportType}</Text>
        </View>
        </View>
        <View style={UpcomingStyles.cardMiddleRow}>
            <View style={UpcomingStyles.iconAndTextContainer}>
                <MaterialIcons name="location-on" size={22} color="black" />
                <Text>{meeting.Location}</Text>
            </View>
            <View style={UpcomingStyles.iconAndTextContainer}>
                <FontAwesome6 name="calendar-days" size={20} color="black" />
                <Text>{meeting.Date}</Text>
            </View>
            <View style={UpcomingStyles.iconAndTextContainer}>
                <AntDesign name="clockcircle" size={20} color="black" />
                <Text>{meeting.Time}</Text>
            </View>

        </View>
        <View style={UpcomingStyles.cardBottomRow}>

          <TouchableOpacity onPress={handleChatPress} style={UpcomingStyles.chatButton} >
            <Entypo name="chat" size={24} color={colors.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity style={UpcomingStyles.button} onPress={handleUnJoinPress}>
            <Text style={UpcomingStyles.buttonText}>UnJoin</Text>
          </TouchableOpacity>
          <NavigationButton destination={meeting.Location} />
        </View>
    </View>)}
    </SafeAreaView>
);
};

export default UpcomingMeetingCard;

