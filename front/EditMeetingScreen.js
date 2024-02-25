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


        //const content = `${meeting.groupName}: at ${stringDate}, ${stringTime} in - ${location}`;
        
        // Handle other operations as needed (e.g., notification)
        //NotificationService.handleAddNewNotification(meeting.groupName, content, "Meeting Updated", serverTimestamp());
      
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
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea} behavior="padding">
        <TouchableOpacity onPress={backButton} style={styles.backButton}>
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>



          <DatePickerWithTime
            meeting={meeting}
            date={selectedDate}
            setDate={setSelectedDate}
            time={selectedTime}
            setTime={setSelectedTime}
            onDateSelected={setDateSelected}
            onTimeSelected={setTimeSelected}
          />

          <View style={styles.LocationTextInputContainer}>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={(text) => setLocation(text)}
              onFocus={() => setLocation("")} // Clear text on focus
              style={styles.input}
            />
          </View>

          <View style={styles.LocationTextInputContainer}>
            <TextInput
              placeholder="Total Capacity"
              value={totalCapacity}
              onChangeText={(text) => setTotalCapacity(text)}
              keyboardType="numeric"
              onFocus={() => setTotalCapacity("")} // Clear text on focus
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleEditButton} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
          {/* <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
            <Text style={styles.buttonText}>Delete meeting</Text>
          </TouchableOpacity> */}
      </SafeAreaView>
    </ImageBackground>
  );
};


export default EditMeetingScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
  },
  // container: {
  //   flex: 1,
  //   justifyContent: "flex-start", // Align items at the top
  //   alignItems: "center",
  //   paddingTop: 150, // Add padding to give some space at the top
  //   flexDirection: "column",
  //   gap: 35,
  // },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: -200, // Align to the bottom
    left: -40, // Align to the left
    top: 35, // Optional margin to add some space from the bottom
    left: -10,
  },
  backButtonText: {
    alignSelf: "center",
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    bottom: 50,
  },
  input: {
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 5,
    borderColor: "#366A68",
    borderWidth: 2,
  },
  LocationTextInputContainer: {
    bottom: -150,
    marginTop: 20,
    width: "65%",
    left: 70,
  },
  buttonContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    bottom: -140,
 
  },
  button: {
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    top: -20,
  },
  Memberbutton: {
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
    top: -30,
  },
  MemberButtonOutline: {
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    marginTop: 1,
    borderColor: "#366A68",
    borderWidth: 2,
  },
  buttonOutline: {
    //width: '80',
    backgroundColor: "#366A68",
    marginTop: 5,
  },
  MemberButtonOutlineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: 'center',
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#8B1B1B",
    width: 150,
    height: 50,
    padding: 15,
    borderRadius: 20,
    bottom: 10,
    top: 170,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "700",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust as needed
    top: 150,
  },
  orText: {
    color: 'black',
    paddingHorizontal: 10, // Adjust as needed
    fontSize: 20,
    fontStyle: "italic",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'black',
    marginHorizontal: 5, // Adjust as needed to create space between the text and the lines
  },


});
