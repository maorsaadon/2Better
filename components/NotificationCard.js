import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { GroupService } from "../back/GroupService";
import NotificationService from "../back/NotificationsService";
import { serverTimestamp } from "firebase/firestore";
import { auth } from "../back/firebase";
import React, { useEffect, useState } from "react";
import { NotificationCardStyles } from "./StylesSheets";



const screenWidth = Dimensions.get("window").width;


const NotificationCard = ({ notification }) => {
  const content = notification?.Content ?? "Default Content"
  const type = notification?.Type ?? "Default Type"
  const groupName = notification?.GroupName ?? "Default GroupName"
  const from = notification?.From ?? "Default From"
  const request = (type === "Group Join request" || type === "Meeting Join request") ? true : false
  const [handled, setHandled] = type === "Group Join request" ? useState(notification.Handled) : useState(false);
  const [requestAnswer, setRequestAnswer] = type === "Group Join request" ? useState(notification.RequestAnswer) : useState("");





  if(type === "Group Join request" || type === "Meeting Join request"){
    
    useEffect(() => {
      const checkIfHandled = async () => {
        const handle = await NotificationService.isHandled(notification.id);
        setHandled(handle);
      };

      const checkAnswer = async () => {
        const answer = await NotificationService.requestAnswer(notification.id);
        setRequestAnswer(answer);
      };
    
      checkIfHandled(), checkAnswer();
    },[notification.id, notification.Handled]);
  }

  const handleAcceptButton = () => {
    const acceptContent = `You are now a group member in ${groupName} `
    try {
      GroupService.handleJoinGroup(false, groupName, from);
      NotificationService.handleAddNewNotification("", groupName, acceptContent, "Request accepted", serverTimestamp(), auth.currentUser.email, from);
      NotificationService.updateHandledField(from, groupName);
      NotificationService.updateRequestAnswerField(from, groupName, "Accepted");
      setHandled(true);

      setRequestAnswer("Accepted");
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleRejectButton = () => {
    const rejectContent = `Your request to join ${groupName} has been denied`
    try {
      GroupService.handleJoinGroup(true, groupName, from);
      NotificationService.handleAddNewNotification("", groupName, rejectContent, "Request rejected", serverTimestamp(), auth.currentUser.email, from);
      NotificationService.updateHandledField(from, groupName);
      NotificationService.updateRequestAnswerField(from, groupName, "Rejected");      
      setHandled(true);

      setRequestAnswer("Rejected");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={NotificationCardStyles.card}>
        <View style={NotificationCardStyles.cardTopRow}>
            <Text style={NotificationCardStyles.title}>{type}</Text>
        </View>
        <View style={NotificationCardStyles.cardMiddleRow}>
            <Text>{content}</Text>
        </View>
        {request && !handled ? (
          <View style={NotificationCardStyles.cardBottomRow}>
          <TouchableOpacity
          onPress={() => handleAcceptButton(groupName)}
          style={NotificationCardStyles.acceptButton}
          >
          <Text style={NotificationCardStyles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={handleRejectButton}
          style={NotificationCardStyles.rejectButton}
          >
          <Text style={NotificationCardStyles.buttonText}>Reject</Text>
          </TouchableOpacity>
          </View>
          ) : request && requestAnswer == "Accepted" ? (
            <View style={NotificationCardStyles.cardBottomRow}>
            <Text style={NotificationCardStyles.acceptText}>You've accepted the request</Text>
          </View>
          ) : request && requestAnswer == "Rejected" ? (
            <View style={NotificationCardStyles.cardBottomRow}>
            <Text style={NotificationCardStyles.rejectText}>You've denied the request</Text>
          </View>
          ) : null}
      </View>
    </SafeAreaView>
  );
};

export default NotificationCard;

