import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import NotificationService from "../back/NotificationsService";
import { auth, db } from "../back/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { serverTimestamp } from "firebase/firestore";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddNewMeetingScreen = ({ route }) => {
  const { groupName } = route.params;
  const [date, setDate] = useState(""); // var to firestore
  const [time, setTime] = useState(""); // var to firestore
  const [location, setLocation] = useState("");
  const userEmail = auth.currentUser.email;
  const content = "" + groupName + ": at " + date + ", "  + time + " in - " + location;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTime, setSelectedTime] = useState('Select Time');


  // Define a function to get the current date without time
  const getToday = () => {
    const today = new Date(); // This creates a new Date object representing the current date and time
    today.setHours(0, 0, 0, 0); // This sets the time part of the today object to midnight
    return today;
  };

  const minimumDate = getToday();

  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const AddButton = () => {
    try {
      MeetingService.handleAddNewMeeting(groupName, location, date, time);
      NotificationService.handleAddNewNotification(userEmail, groupName,  content, "New Meeting", serverTimestamp())
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  {/* open and close calander modal */}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  {/* Change date selected */}
  const handleDateConfirm = (date) => {
    const dt= new Date(date);
    const dateAlone = dt.toISOString().split('T');
    const splitDate= dateAlone[0].split('-');
    const correctFormatDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
    setSelectedDate(correctFormatDate);
    setDate(correctFormatDate); // This var to update in firestore
    hideDatePicker();
  };

  {/* open and close clock time modal */}
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  {/* Change time selected */}
  const handleTimeConfirm = (date) => {
    const dt= new Date(date);
    const timeAlone = dt.toLocaleTimeString();
    const splitTime = timeAlone.split(':');
    const correctFormatTime = splitTime[0] + ':' + splitTime[1];
    setSelectedTime(correctFormatTime);
    setTime(correctFormatTime);  // This var to update in firestore
    hideTimePicker();
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>

          <TouchableOpacity onPress={backButton} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => { showDatePicker()}} style={[styles.button, styles.buttonOutline, styles.dateButtom]}>
            <Text>{selectedDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { showTimePicker()}} style={[styles.button, styles.buttonOutline, styles.timeButtom]}>
            <Text>{selectedTime}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            minimumDate={minimumDate}
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />

          <TextInput
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={AddButton}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddNewMeetingScreen;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#0782F9",
    width: "15%",
    padding: 5, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  backButtonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  //###############################
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: 'center',
  },
  //###############################
  dateButtom: {
    backgroundColor: "white",
    width: '80%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  timeButtom: {
    backgroundColor: "white",
    width: '80%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  }


});
