import {
    Pressable,
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
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
import MeetingService from '../back/MeetingService';
import { useNavigation } from '@react-navigation/core';
import { stylesHomeCard } from "../components/StylesSheets"
const screenWidth = Dimensions.get("window").width;

const HomeCard = ({ meeting }) => {
    const navigation = useNavigation();
    const groupName = meeting?.GroupName ?? "Default Name";
    const [currentParticipants, setCurrentParticipants] = useState(meeting.NumberOfMembers);
    const totalCapacity = parseInt(meeting.TotalCapacity, 10);
    const [isUserInMeeting, setIsUserInMeeting] = useState(false); // New state to track if joined
    useEffect(() => {

        const checkUserInMeeting = async () => {
            const isInMeeting = await MeetingService.isInTheMeeting(meeting.id, auth.currentUser.email);
            setIsUserInMeeting(isInMeeting);
        };

        checkUserInMeeting();
    }, [meeting.id, auth.currentUser.email, meeting.NumberOfMembers]);

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

    const handleJoinPress = () => {
        
        //Alert.alert("This is only a request, please wait to approve");
        setIsUserInMeeting(true); // Set hasJoined to true when button is pressed
        setCurrentParticipants(currentParticipants + 1);
        MeetingService.addUserToMeeting(meeting.id, auth.currentUser.email);
        console.log("Click on Join Meeting!");
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
                    <Text style={stylesHomeCard.participantText}>{currentParticipants}</Text>
                    <CustomSlider
                        minimumValue={0}
                        maximumValue={totalCapacity}
                        value={currentParticipants}
                    />
                    <Text style={stylesHomeCard.participantText}>{totalCapacity}</Text>
                    <AntDesign name="user" size={22} color="black" />
                </View>
                <View style={stylesHomeCard.cardBottomRow}>
                    {!isUserInMeeting ? ( // Only show if isUserInMeeting is false
                        <TouchableOpacity style={stylesHomeCard.button} onPress={handleJoinPress}>
                           <Text style={stylesHomeCard.buttonText}>Join</Text>
                        </TouchableOpacity>
                    ) : ( // Only show if hasJoined is true
                        <Text />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeCard;

