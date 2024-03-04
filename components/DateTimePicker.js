import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import {Platform, TouchableOpacity, Text, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerWithTimeStyles } from './StylesSheets';

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
    <View style={DatePickerWithTimeStyles.container}>
        <View style={DatePickerWithTimeStyles.inputContainer}>
            <TouchableOpacity onPress={() => setShow(true)} style={DatePickerWithTimeStyles.button}>
                {/* <View style={[DatePickerWithTimeStyles.button, DatePickerWithTimeStyles.buttonOutline, DatePickerWithTimeStyles.dateButtom]}> */}
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
            <TouchableOpacity onPress={() => setShowTime(true)} style={DatePickerWithTimeStyles.button}>
                {/* <View style={[DatePickerWithTimeStyles.button, DatePickerWithTimeStyles.buttonOutline, DatePickerWithTimeStyles.timeButtom]}> */}
                    <Text >{selectedStringTime}</Text>
                {/* </View> */}
            </TouchableOpacity>
            {showTime && <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />}
        </View>
    </View>

    const renderIOS = () =>
    <View style={DatePickerWithTimeStyles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={DatePickerWithTimeStyles.button}>
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
      <TouchableOpacity onPress={() => setShowTime(true)} style={DatePickerWithTimeStyles.button}>
          <Text>{selectedStringTime}</Text>
      </TouchableOpacity>
      {showTime && (
          <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />
      )}
    </View>

    return isIphone ? renderIOS() : renderAndroid();
}

export default DatePickerWithTime;

