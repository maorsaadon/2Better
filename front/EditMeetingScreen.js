import { useNavigation } from "@react-navigation/core";
import React, { useState , useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Button,
  SafeAreaView,
  Platform,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import NotificationService from "../back/NotificationsService";
import { auth, db } from "../back/firebase";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DatePickerWithTime from '../components/DateTimePicker';
import MeetingDetails from './AddNewMeetingScreen';
import GroupService from "../back/GroupService";
import { stylesEditMeeting } from "../components/StylesSheets";


const EditMeetingScreen = ({ route }) => {
  const { meeting, group } = route.params;
  const [location, setLocation] = useState(meeting.Location);
  const [selectedDate, setSelectedDate] = useState(new Date());  // still a probem when i dont difned a new date and time it reset to the time of now
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [totalCapacity, setTotalCapacity] = useState(meeting.TotalCapacity);
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  const isIphone = Platform.OS === 'ios';

  const navigation = useNavigation();

  const backButton = () => {
      try {
        navigation.replace("GroupMeetings" , {group});
      } catch (error) {
        alert(error.message);
      }
  };

  const handleEditButton = async () => {
      try {
        // Check if both date and time are selected
        if (!dateSelected || !timeSelected) {
          alert('Please select both date and time before adding a meeting.');
          return;
        }
        
        let stringDate;
        let stringTime;
    
        // timestamp
        const combinedDateTimestamp = new Date(selectedDate);
        combinedDateTimestamp.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

        // Await the asynchronous functions
        stringDate = await MeetingService.getDateFromTimestamp(combinedDateTimestamp);
        stringTime = await MeetingService.getTimeFromTimestamp(combinedDateTimestamp);
    
        // Update the meeting details
        await MeetingService.updateMeetingDetails(meeting.id, stringDate, stringTime, location, combinedDateTimestamp, totalCapacity);


        const content = `${meeting.GroupName}: at ${stringDate}, ${stringTime} in - ${location}`;
        
        // Handle other operations as needed (e.g., notification)
        NotificationService.handleAddNewNotification(meeting.GroupName, content, "Meeting Updated", serverTimestamp());
      
        // Navigate back to the MyGroups screen
        navigation.replace("MyGroups");
      } catch (error) {
        alert(error.message);
      }
  };



  // const handleDeletePress = () =>{

  //   GroupService.removeGroupMeeting(meeting.id ,meeting.GroupName);

  //   MeetingService.handleDeleteMeeting(meeting.id);

  //   console.log('Click on Delete!');

  //   navigation.replace("MyGroups");
    
  // };

  return (
    <ImageBackground source={myLogoPic} style={stylesEditMeeting.backgroundImage}>
      <SafeAreaView style={stylesEditMeeting.safeArea} behavior="padding">
        <TouchableOpacity onPress={backButton} style={stylesEditMeeting.backButton}>
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <View style={stylesEditMeeting.inputContainer}>



          <DatePickerWithTime
            meeting={meeting}
            date={selectedDate}
            setDate={setSelectedDate}
            time={selectedTime}
            setTime={setSelectedTime}
            onDateSelected={setDateSelected}
            onTimeSelected={setTimeSelected}
          />

          <View style={stylesEditMeeting.LocationTextInputContainer}>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={(text) => setLocation(text)}
              onFocus={() => setLocation("")} // Clear text on focus
              style={stylesEditMeeting.input}
            />
          </View>

          <View style={stylesEditMeeting.LocationTextInputContainer}>
            <TextInput
              placeholder="Total Capacity"
              value={totalCapacity}
              onChangeText={(text) => setTotalCapacity(text)}
              keyboardType="numeric"
              onFocus={() => setTotalCapacity("")} // Clear text on focus
              style={stylesEditMeeting.input}
            />
          </View>
        </View>
        <View style={stylesEditMeeting.buttonContainer}>
          <TouchableOpacity onPress={handleEditButton} style={[stylesEditMeeting.button, stylesEditMeeting.buttonOutline]}>
            <Text style={stylesEditMeeting.buttonOutlineText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={stylesEditMeeting.orContainer}>
          <View style={stylesEditMeeting.line} />
          <Text style={stylesEditMeeting.orText}>or</Text>
          <View style={stylesEditMeeting.line} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};


export default EditMeetingScreen;



