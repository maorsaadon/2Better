import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Animated,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import UserService from "../back/UserService";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import MeetingService from "../back/MeetingService";
import HomeCard from "../components/HomeCard";
import { db } from "../back/firebase";
import { sportIconMapping_FontAwesome5 } from "../back/DataBase";
import { FontAwesome5 } from '@expo/vector-icons';
import { stylesHome } from "../components/StylesSheets"
import { NotificationService } from "../back/NotificationsService";
import NotificationCard from "../components/NotificationCard";
// import { pressedNotification } from "../front/NotificationsScreen"

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userNotificationCounter, setNotificationCounter] = useState(0);
  const [homeMeetings, setHomeMeetings] = useState([]);
  const [homeMeetingsSuggestions, setHomeMeetingsSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSugg, setIsLoadingSugg] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const userRef = doc(db, "Users", auth.currentUser.email);
  const [notifications, setNotifications] = useState([]);
  const [latestNotification, setLatestNotification] = useState(null);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  
  useEffect(() => {

    fetchMeetings();
    fetchSuggestions();
    fetchData();
    fetchNotifications()
    return () => unsubscribe(), notificationUnsubscribe();
  }, [latestNotification]);
  
  const slideNotification = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 6000);
    });
  };

  const fetchData = async () => {
    await UserService.getUserDetails();
  };

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

  const fetchNotifications = async () => {
    try {
      const userNotifications = await NotificationService.getUserNotifications();
      if (userNotifications && userNotifications.length > 0) {
        setNotifications(userNotifications);
      } else {
        console.log("No Notifications found for the given criteria.");
      }
    } catch (error) {
      console.error("Error fetching Notifications:", error);
    } finally {
      setIsLoading(false); // This ensures isLoading is set to false after fetching is done
    }
  };

  const unsubscribe = onSnapshot(userRef, (doc) => {
    const data = doc.data();
    setNotificationCounter(data.NotificationCounter);
  });

  const notificationUnsubscribe = onSnapshot(
    query(collection(db, 'Notifications'), where('Addressee', '==', auth.currentUser.email)),
    (snapshot) => {
      const updatedNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(updatedNotifications);
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
        setLatestNotification(notifications[notifications.length - 1]);
      });
    }
  );

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

  const pressedNotification = (notification) => {
    if (notification.Type === "New Meeting") {
      try {
        navigation.navigate('Home', { screen: 'Meetings' });
      } catch (error) {
        alert(error.message);
      }
    }

    if (notification.Type === "Request accepted") {
      try {
        navigation.navigate('Home', { screen: 'My Groups' });
      } catch (error) {
        alert(error.message);
      }
    }
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
            <Text style={stylesHome.buttonTextPage}>Explore new activities</Text>
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
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 50, // Adjust as needed
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          {latestNotification ? (
            <TouchableOpacity onPress={() => pressedNotification(notifications[notifications.length - 1])}>
              <NotificationCard notification={notifications[notifications.length - 1]} />
            </TouchableOpacity>
          ) : null}
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default HomeScreen;

