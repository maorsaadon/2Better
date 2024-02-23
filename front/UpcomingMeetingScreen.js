import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ImageBackground,
  Text,
  ActivityIndicator
} from 'react-native';
import myLogoPic from '../assets/default.png';
import MeetingService from '../back/MeetingService';
import UpcomingMeetingCard from "../components/UpcomingMeetingCard";




const UpcomingMeetingsScreen = () => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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
  useEffect(() => {
    fetchMeetings();
  }, []);

  const onRefreshing = () => {
    setRefresh(true);
    setIsLoading(true);
    fetchMeetings();
    setTimeout(() => {
      setRefresh(false);
      setIsLoading(false);
    }, 2000)

  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView
          refreshControl={ // Notice the correct prop name here: refreshControl instead of RefreshControl
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => onRefreshing()}
              colors={['#366A68', 'black']} // Set the colors of the loading indicator
              progressBackgroundColor='#E9EFE8'
              size="large"
            />
          }
        >
          <Text style={{ color: '#E9EFE8' }}>bla bla</Text>
          {isLoading ? (
            <Text></Text>
            //<ActivityIndicator size="large" color="black" />
          ) : (
            <View style={styles.container}>
              {upcomingMeetings.map((meeting, index) => (
                <UpcomingMeetingCard key={index} meeting={meeting} />
              ))}
            </View>
          )}
        </ScrollView>
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