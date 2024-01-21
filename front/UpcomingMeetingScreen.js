// src/components/UpcomingMeetingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { groupService } from '../back/GroupService';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';

const UpcomingMeetingScreen = () => {

     //Aviv's Edit:
    /************************************************* */
    const navigation = useNavigation()

    const backButton = () => {
        try {
            navigation.replace("Home");
          } catch (error) {
            alert(error.message);
          }
    }
    /************************************************** */

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            const upcomingMeetings = await groupService.getUpcomingMeetings();
            setMeetings(upcomingMeetings);
        };

        fetchMeetings();
    }, []);

    return (
        <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
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

            {/*Aviv's Edit:
            /**************************************************/}
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={backButton}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            {/************************************************* */}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 22,
    },
    meeting: {
        // Styling for each meeting item
    },
    meetingDetail: {
        // Styling for the meeting details
    },

    //Aviv's Edit:
    /************************************************* */
    button: {
        backgroundColor: '#0782F9',
        width: '20%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      /************************************************* */
});

export default UpcomingMeetingScreen;
