// src/components/UpcomingMeetingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { groupService } from '../services/GroupService';

const UpcomingMeetingScreen = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            const upcomingMeetings = await groupService.getUpcomingMeetings();
            setMeetings(upcomingMeetings);
        };

        fetchMeetings();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={meetings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.meeting}>
                        <Text style={styles.meetingDetail}>{item.title}</Text>
                        {/* Display other meeting details */}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    meeting: {
        // Styling for each meeting item
    },
    meetingDetail: {
        // Styling for the meeting details
    },
    // Add more styles as needed
});

export default UpcomingMeetingScreen;
