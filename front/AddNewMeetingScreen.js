import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import NotificationService from "../back/NotificationsService";
import { AntDesign } from "@expo/vector-icons";
import DatePickerWithTime from "../components/DateTimePicker";
import { serverTimestamp } from "firebase/firestore";
import { stylesNewMeeting } from "../components/StylesSheets";

const AddNewMeetingScreen = ({ route }) => {
  const { groupName } = route.params;
  const [location, setLocation] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(false);

  // const isIphone = Platform.OS === 'ios';

  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const AddButton = async () => {
    try {
      // Check if both date and time are selected
      if (!dateSelected || !timeSelected) {
        alert("Please select both date and time before adding a meeting.");
        return;
      }

      let stringDate;
      let stringTime;

      // timestamp
      const combinedDateTimestamp = new Date(selectedDate);
      combinedDateTimestamp.setHours(
        selectedTime.getHours(),
        selectedTime.getMinutes(),
        0,
        0
      );

      // Await the asynchronous functions
      stringDate = await MeetingService.getDateFromTimestamp(
        combinedDateTimestamp
      );
      stringTime = await MeetingService.getTimeFromTimestamp(
        combinedDateTimestamp
      );

      // stringDate = combinedDateTimestamp.toLocaleDateString('he-IL');
      // stringTime = selectedTime.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' });

      MeetingService.handleAddNewMeeting(
        groupName,
        location,
        stringDate,
        stringTime,
        combinedDateTimestamp,
        totalCapacity
      );

      const content = `${groupName}: at ${stringDate}, ${stringTime} in - ${location}`;

      NotificationService.handleAddNewNotification(
        "",
        groupName,
        content,
        "New Meeting",
        serverTimestamp()
      );
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={myLogoPic}
      style={stylesNewMeeting.backgroundImage}
    >
      <KeyboardAvoidingView
        style={stylesNewMeeting.container}
        behavior="padding"
      >
        <TouchableOpacity
          onPress={backButton}
          style={stylesNewMeeting.backButton}
        >
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <View style={stylesNewMeeting.inputContainer}>
          <DatePickerWithTime
            date={selectedDate}
            setDate={setSelectedDate}
            time={selectedTime}
            setTime={setSelectedTime}
            onDateSelected={setDateSelected}
            onTimeSelected={setTimeSelected}
          />

          <View style={stylesNewMeeting.LocationTextInputContainer}>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={stylesNewMeeting.input}
            />
          </View>

          <View style={stylesNewMeeting.LocationTextInputContainer}>
            <TextInput
              placeholder="Total Capacity"
              value={totalCapacity}
              onChangeText={(text) => setTotalCapacity(text)}
              keyboardType="numeric"
              style={stylesNewMeeting.inputText}
            />
          </View>
        </View>

        <View style={stylesNewMeeting.buttonContainer}>
          <TouchableOpacity
            onPress={AddButton}
            style={[stylesNewMeeting.button, stylesNewMeeting.buttonOutline]}
          >
            <Text style={stylesNewMeeting.buttonOutlineText}>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddNewMeetingScreen;
