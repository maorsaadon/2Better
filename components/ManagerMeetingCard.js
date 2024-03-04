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
  import GroupService from "../back/GroupService";
  import { ManagerMeetingCardStyles } from "./StylesSheets";
  
  const screenWidth = Dimensions.get("window").width;
  
  const ManagerMeetingCard = ({ meeting, group, onDelete }) => {
  const navigation = useNavigation();
  console.log(meeting);
  console.log(group);
  const groupName = meeting?.GroupName ?? "Default Name";
  const [currentParticipants, setCurrentParticipants] = useState(meeting.Members.length);
  const totalCapacity = meeting.TotalCapacity || 10;
  const [isUserInMeeting, setIsUserInMeeting] = useState(false);
  
  
  useEffect(() => {
      const checkUserInMeeting = async () => {
          const isInMeeting = await MeetingService.isInTheMeeting(meeting.id, auth.currentUser.email);
          setIsUserInMeeting(isInMeeting);
      };
  
      const checkAndDeleteIfMeetingPassed = () => {
          const currentTimestamp = new Date().getTime();
          const meetingTimestamp = meeting?.Timestamp?.toDate().getTime() || 0;
  
          if (meetingTimestamp < currentTimestamp) {
              console.log(`Meeting ID: ${meeting.id} has passed. Deleting...`);
              MeetingService.handleDeleteMeeting(meeting.id);
              GroupService.removeGroupMeeting(meeting.id, meeting.GroupName);

              onDelete(meeting.id);
          }
      };
  
      checkUserInMeeting();
      checkAndDeleteIfMeetingPassed();
  }, [meeting.id, auth.currentUser.email, meeting.NumberOfMembers, meeting.Timestamp]);
  
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
    setIsUserInMeeting(true); 
    setCurrentParticipants(currentParticipants + 1);
    MeetingService.addUserToMeeting(meeting.id, auth.currentUser.email);
    console.log("Click on Join Meeting!");
};
  
  const handleCancelPress = () =>{
      setIsUserInMeeting(false);
      setCurrentParticipants(currentParticipants-1);
      MeetingService.removeUserFromMeeting(meeting.id, auth.currentUser.email);
      console.log("Click on Cancel Meeting!");
  };
  
  const handleEditPress = () =>{
      console.log("Click on Edit!");
      navigation.replace("EditMeeting", {meeting , group});
  };
  
  const handleMembersListButton = () => {
      console.log("Click on members list");
      navigation.replace("MembersList" , {meeting , group} );
  };

  const handleDeletePress = () =>{
    GroupService.removeGroupMeeting(meeting.id ,meeting.GroupName);
    MeetingService.handleDeleteMeeting(meeting.id);
    onDelete(meeting.id);
    console.log('Click on Delete!');
    
  };
  
  return (
      <SafeAreaView>
      <View style={ManagerMeetingCardStyles.card}>
          <View style={ManagerMeetingCardStyles.cardTopRow}>
          {getSportIcon(meeting.SportType)}
          <View>
              <Text style={ManagerMeetingCardStyles.title}>{groupName}</Text>
              <Text style={ManagerMeetingCardStyles.subTitle}>{meeting.SportType}</Text>
          </View>
          </View>
          <TouchableOpacity
            style={ManagerMeetingCardStyles.deleteButton}
            onPress={handleDeletePress}
            >
            <FontAwesome5 name="trash" size={23} color="#460811" />
          </TouchableOpacity>
          <View style={ManagerMeetingCardStyles.cardMiddleRow}>
              <View style={ManagerMeetingCardStyles.iconAndTextContainer}>
                  <MaterialIcons name="location-on" size={22} color="black" />
                  <Text>{meeting.Location}</Text>
              </View>
              <View style={ManagerMeetingCardStyles.iconAndTextContainer}>
                  <FontAwesome6 name="calendar-days" size={20} color="black" />
                  <Text>{meeting.Date}</Text>
              </View>
              <View style={ManagerMeetingCardStyles.iconAndTextContainer}>
                  <AntDesign name="clockcircle" size={20} color="black" />
                  <Text>{meeting.Time}</Text>
              </View>
  
          </View>
          <View style={ManagerMeetingCardStyles.participantContainer}>
          <Text style={ManagerMeetingCardStyles.participantText}>{currentParticipants}</Text>
          <CustomSlider
              minimumValue={0}
              maximumValue={totalCapacity}
              value={currentParticipants}
              
          />
          <Text style={ManagerMeetingCardStyles.participantText}>{totalCapacity}</Text>
              <AntDesign name="user"
                          size={22} 
                          color="black" 
                          onPress={handleMembersListButton}>
              </AntDesign>
          </View>
          <View style={ManagerMeetingCardStyles.cardBottomRow}>
            {!isUserInMeeting ? ( 
                        <TouchableOpacity style={ManagerMeetingCardStyles.button} onPress={handleJoinPress}>
                           <Text style={ManagerMeetingCardStyles.buttonText}>Join</Text>
                        </TouchableOpacity>
                    ) : ( 
                    <TouchableOpacity style={ManagerMeetingCardStyles.button} onPress={handleCancelPress}>
                    <Text style={ManagerMeetingCardStyles.buttonText}>UnJoin</Text>
                 </TouchableOpacity>
                    )}
          
          <TouchableOpacity style={ManagerMeetingCardStyles.button} onPress={handleEditPress}>
              <Text style={ManagerMeetingCardStyles.buttonText}>Edit</Text>
          </TouchableOpacity>
    
          </View>
      </View>
      </SafeAreaView>
  );
  };
  
  export default ManagerMeetingCard;
  
  