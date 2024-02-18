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
// import DatePickerWithTime from '../components/DateTimePicker';

// const AddNewMeetingScreen = ({ route }) => {
//   const { groupName } = route.params;
//   // const [date, setDate] = useState(new Date());
//   // const [time, setTime] = useState(new Date()); 
//   const [location, setLocation] = useState("");
//   const userEmail = auth.currentUser.email;
//   // const content = "" + groupName + ": at " + date + ", "  + time + " in - " + location;

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//   const [selectedDate, setSelectedDate] = useState('Select Date');
//   const [selectedTime, setSelectedTime] = useState('Select Time');

//   const [selectedDate1, setSelectedDate1] = useState(new Date());
//   // const [selectedDate2, setSelectedDate2] = useState(new Date());
//   const [selectedTime1, setSelectedTime1] = useState(new Date());
//   // const [selectedTime2, setSelectedTime2] = useState(new Date());

//   const content = "" + groupName + ": at " + selectedDate + ", "  + selectedTime + " in - " + location;

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

//   const GetTimeStamp = () => {
//     const dt= new Date(selectedDate);
//     const dateAlone = dt.toISOString().split('T');
//     const splitDate= dateAlone[0].split('-');

//     // this vars to timestamp
//     setYear(splitDate[0]); 
//     setMonth(splitDate[1]);
//     setDay(splitDate[2]);

//     const time= new Date(date);
//     const timeAlone = time.toLocaleTimeString();
//     const splitTime = timeAlone.split(':');

//     // this vars to timestamp
//     setHours(splitTime[0]);
//     setMinutes(splitTime[1]);
//     setSeconds(splitTime[2]);


//   }

//   const AddButton = () => {
//     try {
//       // handleDateConfirm;
//       // handleTimeConfirm;
//       const combinedDate = new Date(year, month - 1, day, hours, minutes, seconds);

//       MeetingService.handleAddNewMeeting(groupName, location, selectedDate, selectedTime , combinedDate);
//       NotificationService.handleAddNewNotification(groupName,  content, "New Meeting", serverTimestamp())
//       navigation.replace("MyGroups");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   {/* open and close calander modal */}
//   // const showDatePicker = () => {
//   //   setDatePickerVisibility(true);
//   // };

//   // const hideDatePicker = () => {
//   //   setDatePickerVisibility(false);
//   // };

//   {/* Change date selected */}
//   const handleDateConfirm = (date) => {
//     const dt= new Date(date);
//     const dateAlone = dt.toISOString().split('T');
//     const splitDate= dateAlone[0].split('-');

//     // this vars to timestamp
//     setYear(splitDate[0]); 
//     setMonth(splitDate[1]);
//     setDay(splitDate[2]);

//     const correctFormatDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
//     setSelectedDate(correctFormatDate);
//     // setDate(correctFormatDate); // This var to update in notification
//     //hideDatePicker();
//   };

//   {/* open and close clock time modal */}
//   // const showTimePicker = () => {
//   //   setTimePickerVisibility(true);
//   // };

//   // const hideTimePicker = () => {
//   //   setTimePickerVisibility(false);
//   // };

//   {/* Change time selected */}
//   const handleTimeConfirm = (date) => {
//     const dt= new Date(date);
//     const timeAlone = dt.toLocaleTimeString();
//     const splitTime = timeAlone.split(':');

//     // this vars to timestamp
//     setHours(splitTime[0]);
//     setMinutes(splitTime[1]);
//     setSeconds(splitTime[2]);

//     const correctFormatTime = splitTime[0] + ':' + splitTime[1];
//     setSelectedTime(correctFormatTime);
//     // setTime(correctFormatTime);  // This var to update in notification
//     //hideTimePicker();
//   };

//   return (
//     <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//       <KeyboardAvoidingView style={styles.container} behavior="padding">
//         <View style={styles.inputContainer}>

//           <TouchableOpacity onPress={backButton} style={styles.backButton}>
//             <MaterialIcons name="chevron-left" size={30} color="white" />
//           </TouchableOpacity>
          
//           {/* <TouchableOpacity onPress={() => { showDatePicker()}} style={[styles.button, styles.buttonOutline, styles.dateButtom]}>
//             <Text>{selectedDate}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => { showTimePicker()}} style={[styles.button, styles.buttonOutline, styles.timeButtom]}>
//             <Text>{selectedTime}</Text>
//           </TouchableOpacity> */}

//           {/* <DateTimePickerModal
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
//           /> */}

//           <DatePickerWithTime 
//             date={selectedDate1}
//             setDate={setSelectedDate1} 
//             time={selectedTime1} 
//             setTime={setSelectedTime1} 
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

// export default AddNewMeetingScreen;

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());


  const isIphone = Platform.OS === 'ios';

  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to return the date alone
  function getDateFromTimestamp(timestamp) {
    const date = timestamp.toISOString().split('T')[0].split("-");
    const correctDate = date[2] + "/" + date[1] + "/" + date[0];
    return correctDate;
  };

  // Function to return the time alone
  function getTimeFromTimestamp(timestamp) {
    const time = timestamp.toTimeString().split(' ')[0].split(':');
    const correctTime = time[0] + ":" + time[1];
    return correctTime;
  };

  // const handleDateConfirm = (selectedDate) => {
  //   // const dt= new Date(selectedDate);
  //   console.log(selectedDate);
  //   const dateAlone = selectedDate.toLocaleDateString();
  //   const splitDate = dateAlone.split('.');
  //   const correctFormatDate = splitDate[0] + "/" + splitDate[1]+ "/" + splitDate[2];
  //   return correctFormatDate;
  // };
  
  // const handleTimeConfirm = (selectedTime) => {
  //   // const dt= new Date(selectedTime);
  //   const timeAlone = selectedTime.toLocaleTimeString();
  //   const splitTime = timeAlone.split(':');
  //   const correctFormatTime = splitTime[0] + ':' + splitTime[1];
  //   return correctFormatTime;
  // };

  const handleDateConfirmIphone = (selectedDate) => {
    // const dt= new Date(selectedDate);
    const dateAlone = selectedDate.toLocaleDateString();
    return dateAlone;
  };
  
  const AddButton = () => {
    try {

      let stringDate;
      let stringTime;

      // if(isIphone){
      //   // string of date and time
      //   stringDate = handleDateConfirmIphone(selectedDate);
      //   stringTime = handleTimeConfirm(selectedTime);
      // }
      // else{
      //   // string of date and time
      //   stringDate = handleDateConfirm(selectedDate);
      //   stringTime = handleTimeConfirm(selectedTime);
      // }
  
      // timestamp
      const combinedDateTimestamp = new Date(selectedDate);
      combinedDateTimestamp.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

      stringDate = getDateFromTimestamp(combinedDateTimestamp);
      stringTime = getTimeFromTimestamp(combinedDateTimestamp);
  
      MeetingService.handleAddNewMeeting(groupName, location, stringDate, stringTime, combinedDateTimestamp);

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
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
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
