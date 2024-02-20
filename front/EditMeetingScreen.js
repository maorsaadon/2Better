// import { useNavigation } from "@react-navigation/core";
// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   ImageBackground,
// } from "react-native";
// import myLogoPic from "../assets/default.png";
// import MeetingService from "../back/MeetingService";
// import NotificationService from "../back/NotificationsService";
// import { auth, db } from "../back/firebase";
// import { MaterialIcons } from "@expo/vector-icons";
// import { serverTimestamp } from "firebase/firestore";
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// const EditMeetingScreen = ({ meeting }) => {
//   const { MeetingID } = route.params;
//   const [date, setDate] = useState(""); // var to firestore
//   const [time, setTime] = useState(""); // var to firestore
//   const [location, setLocation] = useState("");
//   const userEmail = auth.currentUser.email;
//   const content = "" + groupName + ": at " + date + ", "  + time + " in - " + location;

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('Select Date');
//   const [selectedTime, setSelectedTime] = useState('Select Time');

//   const [year, setYear] = useState("");
//   const [month, setMonth] = useState("");
//   const [day, setDay] = useState("");
//   const [hours, setHours] = useState("");
//   const [minutes, setMinutes] = useState("");
//   const [seconds, setSeconds] = useState("");
  

//   // Define a function to get the current date without time
//   const getToday = () => {
//     const today = new Date(); // This creates a new Date object representing the current date and time
//     today.setHours(0, 0, 0, 0); // This sets the time part of the today object to midnight
//     return today;
//   };

//   const minimumDate = getToday();

//   const navigation = useNavigation();

//   const backButton = () => {
//     try {
//       navigation.replace("MyGroups");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const AddButton = () => {
//     try {
//       const combinedDate = new Date(year, month - 1, day, hours, minutes, seconds);

//       MeetingService.handleAddNewMeeting(MeetingID, location, date, time , combinedDate);
//       NotificationService.handleAddNewNotification(MeetingID,  content, "New Meeting", serverTimestamp())
//       navigation.replace("MyGroups");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   {/* open and close calander modal */}
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   {/* Change date selected */}
//   const handleDateConfirm = (date) => {
//     const dt= new Date(date);
//     const dateAlone = dt.toISOString().split('T');
//     const splitDate= dateAlone[0].split('-');

//     setYear(splitDate[0]); 
//     setMonth(splitDate[1]);
//     setDay(splitDate[2]);

//     const correctFormatDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
//     setSelectedDate(correctFormatDate);
//     setDate(correctFormatDate); // This var to update in firestore
//     hideDatePicker();
//   };

//   {/* open and close clock time modal */}
//   const showTimePicker = () => {
//     setTimePickerVisibility(true);
//   };

//   const hideTimePicker = () => {
//     setTimePickerVisibility(false);
//   };

//   {/* Change time selected */}
//   const handleTimeConfirm = (date) => {
//     const dt= new Date(date);
//     const timeAlone = dt.toLocaleTimeString();
//     const splitTime = timeAlone.split(':');

//     setHours(splitTime[0]);
//     setMinutes(splitTime[1]);
//     setSeconds(splitTime[2]);

//     const correctFormatTime = splitTime[0] + ':' + splitTime[1];
//     setSelectedTime(correctFormatTime);
//     setTime(correctFormatTime);  // This var to update in firestore
//     hideTimePicker();
//   };

//   return (
//     <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//       <KeyboardAvoidingView style={styles.container} behavior="padding">
//         <View style={styles.inputContainer}>

//           <TouchableOpacity onPress={backButton} style={styles.backButton}>
//             <MaterialIcons name="chevron-left" size={30} color="white" />
//           </TouchableOpacity>
          
//           <TouchableOpacity onPress={() => { showDatePicker()}} style={[styles.button, styles.buttonOutline, styles.dateButtom]}>
//             <Text>{selectedDate}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { showTimePicker()}} style={[styles.button, styles.buttonOutline, styles.timeButtom]}>
//             <Text>{selectedTime}</Text>
//           </TouchableOpacity>

//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             minimumDate={minimumDate}
//             onConfirm={handleDateConfirm}
//             onCancel={hideDatePicker}
//           />

//           <DateTimePickerModal
//             isVisible={isTimePickerVisible}
//             mode="time"
//             onConfirm={handleTimeConfirm}
//             onCancel={hideTimePicker}
//           />

//           <TextInput
//             placeholder="Location"
//             value={location}
//             onChangeText={(text) => setLocation(text)}
//             style={styles.input}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={AddButton}
//             style={[styles.button, styles.buttonOutline]}
//           >
//             <Text style={styles.buttonOutlineText}>Add</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// };

// export default EditMeetingScreen;

// const styles = StyleSheet.create({
//   backButton: {
//     backgroundColor: "#0782F9",
//     width: "15%",
//     padding: 5, // Adjusted padding to make the button shorter
//     borderRadius: 10,
//     marginTop: 10,
//     marginLeft: 5,
//   },
//   backButtonText: {
//     color: "black",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inputContainer: {
//     width: "80%",
//   },
//   input: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginTop: 5,
//     borderColor: "#0782F9",
//     borderWidth: 2,
//   },
//   buttonContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonOutline: {
//     backgroundColor: "white",
//     marginTop: 5,
//     borderColor: "#0782F9",
//     borderWidth: 2,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   buttonOutlineText: {
//     color: "#0782F9",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   //###############################
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     // alignItems: 'center',
//   },
//   //###############################
//   dateButtom: {
//     backgroundColor: "white",
//     width: '80%',
//     height: 50,
//     borderWidth: 0.5,
//     borderRadius: 20,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   timeButtom: {
//     backgroundColor: "white",
//     width: '80%',
//     height: 50,
//     borderWidth: 0.5,
//     borderRadius: 20,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//     marginBottom: 50,
//   }


// });

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
  console.log(meeting);
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [totalCapacity, setTotalCapacity] = useState("");
  // const [selectedDate, setSelectedDate] = useState(meeting.Date);
  // const [selectedTime, setSelectedTime] = useState(meeting.Time);

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

  // const handleMembersListButton = () => {
  //   console.log("Click on members list");
  //   navigation.navigate("MeetingMembersList" , {meeting} );
  // };

  const handleDeletePress = () =>{

    GroupService.removeGroupMeeting(meeting.id ,meeting.GroupName);

    MeetingService.handleDeleteMeeting(meeting.id);

    console.log('Click on Delete!');

    navigation.replace("MyGroups");
    
  };

  return (
      <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
        <SafeAreaView style={styles.safeArea} behavior="padding">
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
                placeholder="Total Capacity"
                value={totalCapacity}
                onChangeText={(text) => setTotalCapacity(text)}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
              <Text style={styles.buttonText}>Delete meeting</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
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
  LocationTextInputContainer:{
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
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    top: -20,
  },
  Memberbutton:{
    backgroundColor: "white",
    width: 150,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
    top: -30,
  },
  MemberButtonOutline: {
    backgroundColor: "white",
    marginTop: 1,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  MemberButtonOutlineText:{
    color: "black",
    fontWeight: "700",
    fontSize: 16,
    alignSelf: 'center',
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 150,
    height: 50,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
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
    top: 180,
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
