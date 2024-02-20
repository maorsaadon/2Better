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
  Platform,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import NotificationService from "../back/NotificationsService";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import DatePickerWithTime from '../components/DateTimePicker';
import { serverTimestamp } from "firebase/firestore";

const AddNewMeetingScreen = ({ route }) => {
  const { groupName } = route.params;
  const [location, setLocation] = useState("");
  const [totalCapacity, setTotalCapacity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());


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

      let stringDate;
      let stringTime;
  
      // timestamp
      const combinedDateTimestamp = new Date(selectedDate);
      combinedDateTimestamp.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

      // Await the asynchronous functions
      stringDate = await MeetingService.getDateFromTimestamp(combinedDateTimestamp);
      stringTime = await MeetingService.getTimeFromTimestamp(combinedDateTimestamp);

      // stringDate = combinedDateTimestamp.toLocaleDateString('he-IL');
      // stringTime = selectedTime.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' });
  
      MeetingService.handleAddNewMeeting(groupName, location, stringDate, stringTime, combinedDateTimestamp, totalCapacity);

      const content = `${groupName}: at ${stringDate}, ${stringTime} in - ${location}`;

      NotificationService.handleAddNewNotification(groupName, content, "New Meeting", serverTimestamp());
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>

          <TouchableOpacity onPress={backButton} style={styles.backButton}>
            <AntDesign name="back" size={30} color="black" />
          </TouchableOpacity>

          <DatePickerWithTime
            date={selectedDate}
            setDate={setSelectedDate}
            time={selectedTime}
            setTime={setSelectedTime}
          />
          
          <View style={styles.LocationTextInputContainer}>
            <TextInput
              placeholder="Location"
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.input}
            />
          </View>

          <View style={styles.LocationTextInputContainer}>
            <TextInput
              placeholder="user"
              value={totalCapacity}
              onChangeText={(text) => setTotalCapacity(text)}
              style={styles.input}
            />
          </View>
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
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: -250, // Align to the bottom
    left: -40, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  backButtonText: {
    alignSelf: "center",
    
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
    backgroundColor: "#366A68",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#E9F1E9",
    borderWidth: 2,
  },
  LocationTextInputContainer:{
    color: "#E9F1E9",
    bottom: -150,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    bottom: -180,
  },
  button: {
    backgroundColor: "#366A68",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#366A68",
    marginTop: 5,
    borderColor: "#E9F1E9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
