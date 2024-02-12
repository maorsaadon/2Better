// import React, { useState, useEffect } from 'react';
// import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';
// import { DataTable } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/core';
// import { db } from "../back/firebase";
// import myLogoPic from '../assets/2better-logo.jpeg';
// import '../back/MeetingService'
// import MeetingService from '../back/MeetingService';
// import MeetingCard from "../components/MeetingCard";


// const UpcomingMeetingsScreen = () => {
//   const navigation = useNavigation();

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);

//   const [memberMeetings, setMemberMeetings] = useState([]);
//   const [leaderMeetings, setLeaderMeetings] = useState([]);

    
//     useEffect(() => {
//       const fetchMeetings = async () => {
//         const { memberMeetings, leaderMeetings } = await MeetingService.fetchMeetingsByUserRole();
//         setMemberMeetings(memberMeetings);
//         setLeaderMeetings(leaderMeetings);
//       };
  
//       fetchMeetings();
//     }, []);

//   const backButton = () => {
//     try {
//       navigation.replace("Home");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handlePress = (meeting) => {
//     setSelectedMeeting(meeting);
//     setModalVisible(true);
//   };

//   return (
//     <ImageBackground source={myLogoPic} style={styles.backgroundImage}>

//       <TouchableOpacity onPress={backButton} style={styles.backButton}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//       <View>
//         <Text style={styles.title}>Group as a leader</Text>
//       </View>
//         <View style={styles.container}>
//           <ScrollView>
//             <View style={styles.container}>
//               {/* Map over the groups array to render AppointmentCards */}
//               {leaderMeetings.map((meeting, index) => (
//                 <MeetingCard key={index} meeting={meeting} isLeader={1} />
//               ))}
//             </View>
//           </ScrollView>
//         </View>
    
//         <View>
//           <Text style={styles.title}>Group as a member</Text>
//         </View>
//         <View style={styles.container}>
//           <ScrollView>
//             <View style={styles.container}>
//               {/* Map over the groups array to render AppointmentCards */}
//               {leaderMeetings.map((meeting, index) => (
//                 <MeetingCard key={index} meeting={meeting} isLeader={0} />
//               ))}
//             </View>
//           </ScrollView>
//         </View>

//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-start", // Align items at the top
//     alignItems: "center",
//     paddingTop: 40, // Add padding to give some space at the top
//     flexDirection: "column",
//     gap: 35,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
//   backButton: {
//     backgroundColor: "#3B82F6",
//     width: "20%",
//     padding: 15,
//     borderRadius: 50,
//     alignItems: "center",
//     marginTop: 6,
//   },
//   backButtonText: {
//     alignSelf: "center",
//     color: "white",
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "rgba(255, 255, 255 , 0.4)",
//     borderRadius: 20,
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     flexDirection: "column",
//     gap: 10,
//   },
//   cardTopRow: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },
//   cardMiddleRow: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   iconAndTextContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   businessLogo: {
//     height: 50,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     width: 50,
//     borderRadius: 15,
//   },
//   title: {
//     fontWeight: "800",
//     alignSelf: "flex-start",
//   },
//   subTitle: {
//     opacity: 0.6,
//     alignSelf: "flex-start",
//   },
//   button: {
//     backgroundColor: "#3B82F6",
//     width: 240,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     alignSelf: "center",
//     color: "white",
//   },
//   iconText: {
//     fontWeight: "bold",
//     fontSize: 20, // Adjust the font size as needed
//   },
//   logo: {
//     width: 70, // Adjust the width as needed
//     height: 70, // Adjust the height as needed
//     resizeMode: "contain", // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
//   },
// });

// export default UpcomingMeetingsScreen;

//###################################################################################################33
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from "@expo/vector-icons";
import myLogoPic from '../assets/default.png';
import MeetingService from '../back/MeetingService';
import MeetingCard from "../components/MeetingCard";
import HomeCard from "../components/HomeCard";



const UpcomingMeetingsScreen = () => {
  const navigation = useNavigation();
  const [leaderMeetings, setLeaderMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    
    // useEffect(() => {
    //   const fetchMeetings = async () => {
    //     const {leaderMeetings } = await MeetingService.fetchMeetingsByUserRole();
    //     setLeaderMeetings(leaderMeetings);
    //   };
    //   // try{
    //   //   fetchMeetings();
    //   // }
    //   // catch (error) {
    //   //   console.error("Error fetching Meetings:", error);
    //   // } finally {
    //   //   setIsLoading(false);
    //   // }
    //   fetchMeetings();
    //   setIsLoading(false);
    // }, []);

    useEffect(() => {
      const fetchMeetings = async () => {
        try {
          // const { leaderMeetings } = await MeetingService.fetchMeetingsByUserRole();
          const { leaderMeetings } = await MeetingService.functionToHomeScreen();
          setLeaderMeetings(leaderMeetings);
        } catch (error) {
          console.error("Error fetching Meetings:", error);
        } finally {
          setIsLoading(false); // This ensures isLoading is set to false after fetching is done
        }
      };
  
      fetchMeetings();
    }, []);

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={backButton} style={styles.backButton}>
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>

          {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
            <ScrollView>
              <View style={styles.container}>
                {/* Map over the groups array to render AppointmentCards */}
                {leaderMeetings.map((meeting, index) => (
                  // <MeetingCard key={index} meeting={meeting} />
                  <HomeCard key={index} meeting={meeting} />
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

export default UpcomingMeetingsScreen;