import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { auth } from "../back/firebase";
import myLogoPic from "../assets/default.png";
import UserService from "../back/UserService";
import { doc, onSnapshot } from "firebase/firestore";
import MeetingService from "../back/MeetingService";
import HomeCard from "../components/HomeCard";
import { db } from "../back/firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userNotificationCounter, setNotificationCounter] = useState(0);
  const [homeMeetings, setHomeMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(`NotificationCounter = ${userNotificationCounter}`);

  useEffect(() => {
    const fetchData = async () => {
      await UserService.getUserDetails();
    };

    const userRef = doc(db, "Users", auth.currentUser.email);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      setNotificationCounter(data.NotificationCounter);
    });

    const fetchMeetings = async () => {
      try {
        const { homeMeetings } = await MeetingService.functionToHomeScreen();
        setHomeMeetings(homeMeetings);
      } catch (error) {
        console.error("Error fetching Meetings:", error);
      } finally {
        setIsLoading(false); // This ensures isLoading is set to false after fetching is done
      }
    };

    fetchMeetings();
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

  return (
    <ImageBackground source={myLogoPic} style={stylesHome.backgroundImage}>
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

        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView>
            <View style={stylesHome.scrollContainer}>
              {Array.isArray(homeMeetings) &&
                homeMeetings.map((meeting, index) => (
                  <HomeCard key={index} meeting={meeting} />
                ))}
            </View>
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const stylesHome = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 600,
  },
  // backgroundImage: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "center",
  // },
  notificationBotton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 50,
  },
  profileButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 280,
    marginTop: 0,
    marginLeft: 280,
    borderRadius: 50,
  },
  badge: {
    position: "absolute",
    top: 20,
    right: -10,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    alignItems: "center",
    paddingTop: 40, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 0, // Align to the bottom
    left: -18, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  backButtonText: {
    alignSelf: "center",
    color: "white",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255 , 0.4)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "column",
    gap: 10,
  },
  cardTopRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardMiddleRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  businessLogo: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    borderRadius: 15,
  },
  title: {
    fontWeight: "800",
    alignSelf: "flex-start",
  },
  subTitle: {
    opacity: 0.6,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#3B82F6",
    width: 240,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 20, // Adjust the font size as needed
  },
  logo: {
    width: 70, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    resizeMode: "contain", // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
  },
});
