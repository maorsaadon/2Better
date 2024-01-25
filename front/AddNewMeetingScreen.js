// src/components/AddNewMeetingScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { groupService } from '../back/GroupService';
import { UserService } from '../back/UserService';

const AddNewMeetingScreen = ({ route }) => {
    const { groupId } = route.params;
    const [meetingDetails, setMeetingDetails] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
    });
    const { user } = useContext(UserContext);

    const handleInputChange = (name, value) => {
        setMeetingDetails({ ...meetingDetails, [name]: value });
    };

    const handleAddMeeting = async () => {
        if (user && user.uid) {
            // Assuming a method addMeeting exists in GroupService
            await groupService.addMeeting(groupId, meetingDetails);
            Alert.alert('Meeting Added', 'The new meeting has been scheduled.');
        } else {
            Alert.alert('Error', 'User must be logged in to add meetings.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Input fields for meeting title, date, time, location */}
            <Button title="Schedule Meeting" onPress={handleAddMeeting} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    // Add styles for input fields and button
});

export default AddNewMeetingScreen;
