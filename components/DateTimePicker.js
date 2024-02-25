import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { StyleSheet, Platform, TouchableOpacity, Pressable, Text, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';


const DatePickerWithTime = ({date, setDate, time, setTime, onDateSelected , onTimeSelected }) => {

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

    const [selectedStringDate, setSelectedStringDate] = useState("Select Date");
    const [selectedStringTime, setSelectedStringTime] = useState("select time");

    const handleChangeAndroid = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);

        const dateAlone = selectedDate.toLocaleDateString('he-IL').replace(/\./g, '/');
        setSelectedStringDate(dateAlone);

        onDateSelected(true);
    }

    const handleTimeChange = (event, selectedTime) => {
        setShowTime(false);
        const newDate = new Date(selectedTime);
        newDate.setDate(date.getDate());
        newDate.setSeconds(0);
        setTime(newDate);

        setSelectedStringTime(selectedTime.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' }));

        onTimeSelected(true);
    }

    const handleChangeIphone = (event, selectedDate) => {
      setShow(false);
      setDate(selectedDate);

      const dateAlone = selectedDate.toLocaleDateString('he-IL', { minute: '2-digit', hour: '2-digit' });
      setSelectedStringDate(dateAlone);

      onDateSelected(true);
  }

    const renderAndroid = () => 
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
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
            <TouchableOpacity onPress={() => setShowTime(true)} style={styles.button}>
                {/* <View style={[styles.button, styles.buttonOutline, styles.timeButtom]}> */}
                    <Text >{selectedStringTime}</Text>
                {/* </View> */}
            </TouchableOpacity>
            {showTime && <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />}
        </View>
    </View>

    const renderIOS = () =>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
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
      <TouchableOpacity onPress={() => setShowTime(true)} style={styles.button}>
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
    backgroundColor: "rgba(233, 241, 233, 0.7)",
    width: '80%',
    height: 50,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#366A68",
    top: 15,
  },

});