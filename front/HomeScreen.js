import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import UserService from "../back/UserService";
import { doc, onSnapshot } from "firebase/firestore";
import MeetingService from "../back/MeetingService";
import HomeCard from "../components/HomeCard";
import { db } from "../back/firebase";
import { sportIconMapping_FontAwesome5 } from "../back/DataBase";
import { FontAwesome5 } from '@expo/vector-icons';
import { stylesHome } from "../components/StylesSheets"

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userNotificationCounter, setNotificationCounter] = useState(0);
  const [homeMeetings, setHomeMeetings] = useState([]);
  const [homeMeetingsSuggestions, setHomeMeetingsSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSugg, setIsLoadingSugg] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // console.log(`NotificationCounter = ${userNotificationCounter}`);

  const notificationCounterField = "NotificationCounter";

  const fetchData = async () => {
    await UserService.getUserDetails();
  };

  const userRef = doc(db, "Users", auth.currentUser.email);

  const unsubscribe = onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      // Check if the NotificationCounter field exists in the document
      if (data && notificationCounterField in data) {
        setNotificationCounter(data[notificationCounterField]);
      } else {
        // Handle the case where the NotificationCounter field is missing
        console.log("NotificationCounter field is missing from the document.");
      }
    }else{
      // Handle the case where the document does not exist
      console.log("User document does not exist.");
    }
  });

  const fetchMeetings = async () => {
    try {
      const { homeMeetings } = await MeetingService.functionToHomeScreen();
      setHomeMeetings(homeMeetings);
      // const { homeMeetingsSuggestions } = await MeetingService.functionToHomeScreenS();
      // setHomeMeetingsSuggestions(homeMeetingsSuggestions);
    } catch (error) {
      console.error("Error fetching Meetings:", error);
    } finally {
      setIsLoading(false); // This ensures isLoading is set to false after fetching is done
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await MeetingService.getSeuggestions(); // Assuming MeetingService.getSeuggestions() returns an object with a key 'homeMeetingsSuggestions'
      const { homeMeetingsSuggestions } = response;
      setHomeMeetingsSuggestions(homeMeetingsSuggestions);
      // console.log(homeMeetingsSuggestions)
    } catch (error) {
      console.error("Error fetching Meetings:", error);
    } finally {
      setIsLoadingSugg(false); // This ensures isLoading is set to false after fetching is done
    }
  };

  useEffect(() => {

    fetchMeetings();
    fetchSuggestions();
    fetchData();
    return () => unsubscribe();
  }, []);

  const handleNotifications = () => {
    try {
      navigation.replace("Notifications");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSupport = () => {
    try {
      navigation.replace("Support");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAboutUs = () => {
    try {
      navigation.replace("AboutUs");
    } catch (error) {
      alert(error.message);
    }
  };

  const onRefreshing = () => {
    setRefresh(true);
    setIsLoading(true);
    setIsLoadingSugg(true);
    fetchMeetings();
    fetchSuggestions();
    fetchData();

    setTimeout(() => {
      setRefresh(false);
      setIsLoading(false);
      setIsLoadingSugg(false);
    }, 3000)

  };

  return (
    <ImageBackground source={myLogoPic} style={stylesHome.backgroundImage}>
      <ScrollView style={{ backgroundColor: "rgba(233, 240, 233, 0.7)" }} refreshControl={ // Notice the correct prop name here: refreshControl instead of RefreshControl
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => onRefreshing()}
          colors={['#366A68', 'black']} // Set the colors of the loading indicator
          progressBackgroundColor='#E9EFE8'
          size="large"
        />
      }>
        <View style={stylesHome.container}>
          <TouchableOpacity
            onPress={handleNotifications}
            style={stylesHome.notificationBotton}
          >
            <Entypo name="bell" size={30} color="black" />

            {/* Badge view */}
            {userNotificationCounter > 0 && (
              <View style={stylesHome.badge}>
                <Text style={stylesHome.badgeText}>
                  {userNotificationCounter}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={stylesHome.containerIcons}>
          {Object.entries(sportIconMapping_FontAwesome5).map(([sport, iconName]) => (
            <View key={sport} style={{ alignItems: 'center', margin: 5 }}>
              <FontAwesome5 name={iconName} size={40} color="#193735" />
            </View>
          ))}
          <TouchableOpacity
            onPress={handleNotifications}
            style={stylesHome.notificationBotton}
          >
            <Entypo name="bell" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={stylesHome.containerScrollers}>
          <View style={stylesHome.containerText}>
            <Text style={stylesHome.buttonTextPage}>Your groups activities</Text>
          </View>
          <View style={stylesHome.scrollContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <ScrollView horizontal={true} >
                <View style={stylesHome.scrollContainer}>
                  {Array.isArray(homeMeetings) &&
                    homeMeetings.map((meeting, index) => (
                      <HomeCard key={index} meeting={meeting} />
                    ))}
                </View>
              </ScrollView>
            )}
          </View>
          <View style={stylesHome.containerText}>
            <Text style={stylesHome.buttonTextPage}>Explore new groups activities</Text>
          </View>
          <View style={stylesHome.scrollContainer}>
            {isLoadingSugg ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <ScrollView horizontal={true} >
                <View style={stylesHome.scrollContainer}>
                  {Array.isArray(homeMeetingsSuggestions) &&
                    homeMeetingsSuggestions.map((meeting, index) => (
                      <HomeCard key={index} meeting={meeting} />
                    ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleSupport} style={stylesHome.containerTextSupport}>
          <Text style={stylesHome.buttomTextPage}>Customer support                       </Text>
          <Entypo name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAboutUs} style={stylesHome.containerTextUS}>
          <Text style={stylesHome.buttomTextPage}>About us                                    </Text>
          <Entypo name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
