import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Text,
} from "react-native";
import myLogoPic from "../assets/default.png";
import MeetingService from "../back/MeetingService";
import UpcomingMeetingCard from "../components/UpcomingMeetingCard";
import { stylesUpcome } from "../components/StylesSheets";

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
    }, 2000);
  };

  return (
    <ImageBackground source={myLogoPic} style={stylesUpcome.backgroundImage}>
      <View style={stylesUpcome.container}>
        <ScrollView
          refreshControl={
            // Notice the correct prop name here: refreshControl instead of RefreshControl
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => onRefreshing()}
              colors={["#366A68", "black"]} // Set the colors of the loading indicator
              progressBackgroundColor="#E9EFE8"
              size="large"
            />
          }
        >
          <Text style={{ color: "#E9EFE8" }}>The need for the refresh</Text>
          {isLoading ? (
            <Text></Text>
          ) : (
            <View style={stylesUpcome.container}>
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

export default UpcomingMeetingsScreen;
