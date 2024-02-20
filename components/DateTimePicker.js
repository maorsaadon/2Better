import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { StyleSheet, Platform, TouchableOpacity, Pressable, Text, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';


const DatePickerWithTime = ({meeting, date, setDate, time, setTime }) => {

    const isIphone = Platform.OS === 'ios';

    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);

    // Define a function to get the current date without time
    const getToday = () => {
        const today = new Date(); // This creates a new Date object representing the current date and time
        today.setHours(0, 0, 0, 0); // This sets the time part of the today object to midnight
        return today;
    };

    const minimumDate = getToday();

    const [selectedStringDate, setSelectedStringDate] = useState(meeting ? meeting.Date : "Select Date");
    const [selectedStringTime, setSelectedStringTime] = useState(meeting ? meeting.Time : "select time");

    const handleChangeAndroid = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);

        const dateAlone = selectedDate.toLocaleDateString('he-IL').replace(/\./g, '/');
        setSelectedStringDate(dateAlone);
    }

    const handleTimeChange = (event, selectedTime) => {
        setShowTime(false);
        const newDate = new Date(selectedTime);
        newDate.setDate(date.getDate());
        newDate.setSeconds(0);
        setTime(newDate);

        setSelectedStringTime(selectedTime.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' }));
    }

    const handleChangeIphone = (event, selectedDate) => {
      setShow(false);
      setDate(selectedDate);

      const dateAlone = selectedDate.toLocaleDateString('he-IL', { minute: '2-digit', hour: '2-digit' });
      setSelectedStringDate(dateAlone);
  }

    const renderAndroid = () => 
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShow(true)} style={[styles.button, styles.buttonOutline, styles.dateButtom]}>
                {/* <View style={[styles.button, styles.buttonOutline, styles.dateButtom]}> */}
                    <Text >{selectedStringDate}</Text>
                {/* </View> */}
            </TouchableOpacity>
            {show && <DateTimePicker
                mode="date"
                value={date}
                minimumDate={minimumDate}
                display='default'
                onChange={handleChangeAndroid}
            />}
            <TouchableOpacity onPress={() => setShowTime(true)} style={[styles.button, styles.buttonOutline, styles.timeButtom]}>
                {/* <View style={[styles.button, styles.buttonOutline, styles.timeButtom]}> */}
                    <Text >{selectedStringTime}</Text>
                {/* </View> */}
            </TouchableOpacity>
            {showTime && <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />}
        </View>
    </View>

    const renderIOS = () =>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={[styles.button, styles.buttonOutline, styles.dateButtom]}>
          <Text>{selectedStringDate}</Text>
      </TouchableOpacity>
      {show && (
          <DateTimePicker
              mode="date"
              value={date}
              minimumDate={minimumDate}
              display="default"
              onChange={handleChangeIphone}
          />
      )}
      <TouchableOpacity onPress={() => setShowTime(true)} style={[styles.button, styles.buttonOutline, styles.timeButtom]}>
          <Text>{selectedStringTime}</Text>
      </TouchableOpacity>
      {showTime && (
          <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />
      )}
    </View>

    return isIphone ? renderIOS() : renderAndroid();
}

export default DatePickerWithTime;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    },
    // container_text: {
    //   flex: 1,
    //   justifyContent: 'flex-start', // Align items at the top
    //   backgroundColor: '#5B8BDF',
    //   alignItems: 'right',
    //   paddingTop: 40, // Add padding to give some space at the top
    //   flexDirection: 'column',
    //   gap: 20
    // },
    // logo: {
    //     width: 100, // Adjust the width as needed
    //     height: 100, // Adjust the height as needed
    //     resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    // },
    // button: {
    //     backgroundColor: '#2C64C6',
    //     width: 300,
    //     paddingVertical: 12,
    //     borderRadius: 20,
    // },
    // buttonText: {
    //     fontWeight: 'bold',
    //     fontSize: 18,
    //     textAlign: 'center',
    //     color: 'white'
    // },
    // iconText: {
    //     fontWeight: 'bold',
    //     fontSize: 20,
    //     textAlign: 'center',
    //     color: 'white'
    // },
    // pressableWithMargin:{
    //     marginRight: 25
    // },
    // iconTextContainer: {
    //     flexDirection: 'colomn',
    //     justifyContent: 'flex-start',  
    //     alignItems: 'center',    
    //   },

    //   input: {
    //     height: 50,
    //     width: '75%',
    //     borderColor: '#2C64C6',
    //     borderRadius: 10,
    //     backgroundColor: 'white',
    //     borderWidth: 3,
    //     marginBottom: 16,
    //     paddingLeft: 8,
    //     textAlign: 'right',
    //     fontSize: 18,     
    //     fontWeight: 'bold',  
    //   },
    //   inputWithMargin: {
    //     marginTop: 30, // Adjust the margin based on your design
    //     // Add other styles for the input with margin if needed
    //   },
    //   rowContainer: {
    //     // flexDirection: 'row',
    //     width: '100%',
    //     justifyContent: 'space-evenly', // or 'space-around'
    //     alignItems: 'center',
    //     marginVertical: 5, // Adjust as needed
    //   },
    //   pressableContainer: {
    //     alignItems: 'center',
    //     marginHorizontal: 15,
    //   },
    //   serchText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: 'white',
    //   },
    //   calendarIcon: {
    //     marginTop: 10, // Adjust the space between text and icon
    //   },
    //   categoryItem: {
    //     padding: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //     width: '100%',
        
    //   },
    
    //   modalCloseButton: {
    //     backgroundColor: '#2C64C6',
    //     padding: 10,
    //     marginBottom: 30,
    //     marginRight:10,
    //     borderRadius: 10,
    //     alignSelf: 'flex-end',
    //   },
    //   categoryInputContainer: {
    //     marginBottom: 16,
    //     width: '80%',
    //     borderColor: '#2C64C6',
    //     borderRadius: 20,
    //     backgroundColor: 'white',
    //     borderWidth: 3,
    //     paddingLeft: 10,
    //     paddingRight: 8,
    //     justifyContent: 'center',
    //     alignItems: 'flex-end',
    //     height: 40,
    //   },
    
    //   categoryInput: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //   },
    
    //   categoryInputText: {
    //     color: '#2C64C6',
    //     fontSize: 16,
    //   },
    
    //   categoryButton: {
    //     padding: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //     width: '100%',
    //   },
    
    //   inputPlaceholder: {
    //     height: 40,
    //     textAlign: 'right',
    //     color: '#CCCCCC',
    //     fontSize: 14,
    //     alignItems: 'center',
    //     justifyContent: 'center'
    //   },
    
    //   selectedCategoryContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#2C64C6',
    //     borderRadius: 20,
    //     marginRight: 15,
    //     marginBottom: 15,
    //   },
    
    //   selectedCategoryText: {
    //     color: 'white',
    //     fontSize: 16,
    //     padding: 5,
    //   },
    
    //   removeCategoryButton: {
    //     color: 'white',
    //     marginLeft: 50,
    //     marginRight: 50,
    //     fontWeight: 'bold',
    //   },
    
    //   chooseButton: {
    //     color: 'blue',
    //   },
    //   container_icon: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: 20
    //   },
    //   iconContainer_icon: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    //   icon_icon: {
    //     position: 'absolute',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
    //   iconScrollView: {
    //     flexGrow: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingHorizontal: 50, // Adjust padding as needed
    //     height: 120,
    //     paddingVertical: -100
    //   },
    //   searchtext:{
    //     fontWeight: 'bold',
    //     fontSize: 20,
    //     textAlign: 'center',
    //     color: 'white'
    //   },
      
//   loginContainer: {
//     flexDirection: 'row', // Ensure items are in the same row
//     alignItems: 'center', // Align items vertically in the center
//     marginTop: 16,
//   },

//   loginText: {
//     color: 'white',
//     fontSize: 16,
//     marginRight: 8, // Add margin to separate text and button
//      marginBottom: 12,
//   },
//   dropdownContainer: {
//     height: 40,
//     width: '80%',
//     marginBottom: 16,
//     textAlign: 'right',
//     zIndex: 2,
//   },
//   dropdownStyle: {
//     backgroundColor: 'white',
//     borderColor: '#2C64C6',
//     borderWidth: 3,
//     borderRadius: 10,
//     textAlign: 'right',
    
    
//   },
//   dropdownItemStyle: {
//     justifyContent: 'flex-start',
//     textAlign: 'right',
//   },
//   dropdownListStyle: {
//     borderColor: '#2C64C6',
//     borderWidth: 3,
//     textAlign: 'right',
//   },
//   placeHolderStyle :{
//     color: "#A9A9A9",
//     textAlign: 'left'
//   },
  datePickerContainer: {
    marginup: 30, // Adjust this value as needed for the desired spacing
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
    marginTop: 60,
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

  dateButtom: {
    backgroundColor: "white",
    width: '80%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
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
  },



});