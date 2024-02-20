import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import myLogoPic from '../assets/default.png';
import MeetingService from '../back/MeetingService';
import UpcomingMeetingCard from "../components/UpcomingMeetingCard";




const UpcomingMeetingsScreen = () => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchMeetings = async () => {
        try {
          const { upcomingMeetings } = await MeetingService.fetchUpcomingMeetings();
          setUpcomingMeetings(upcomingMeetings);
        } catch (error) {
          console.error("Error fetching Meetings:", error);
        } finally {
          setIsLoading(false); 
        }
      };
  
      fetchMeetings();
    }, []);

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
          {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
            <ScrollView>
              <View style={styles.container}>
                {upcomingMeetings.map((meeting, index) => (
                  <UpcomingMeetingCard key={index} meeting={meeting} />
                ))}
              </View>
            </ScrollView>
            )}
        </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingTop: 40, 
    flexDirection: "column",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default UpcomingMeetingsScreen;