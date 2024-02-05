import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import GroupCard from "../components/ResultGroupCard";
import myLogoPic from "../assets/2better-logo.jpg";
import GroupService from "../back/GroupService";

const ResultGroupScreen = ({ route, navigation }) => {
  const { selectedCity, selectedTypeOfSport } = route.params;

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      console.log(`Fetching groups for sport: ${selectedTypeOfSport}, city: ${selectedCity}`);
      try {
        const fetchedGroups = await GroupService.getGroupsBySort(
          selectedTypeOfSport,
          selectedCity
        );
  
        console.log("Fetched Groups:", fetchedGroups); // Log the fetched groups
  
        if (fetchedGroups && fetchedGroups.length > 0) {
          setGroups(fetchedGroups);
          console.log("Fetched Groups:", groups);
        } else {
          console.log("No groups found for the given criteria.");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
  
    fetchGroups();
  }, [selectedCity, selectedTypeOfSport]); // Depend on selectedCity and selectedTypeOfSport

  useEffect(() => {
    console.log("Updated groups state:", groups);
  }, [groups]);
  

  const backButton = () => {
    try {
      navigation.replace("FindNewGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {/* Map over the groups array to render AppointmentCards */}
            {groups.map((group, index) => (
              <GroupCard key={index} group={group} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default ResultGroupScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    alignItems: "center",
    paddingTop: 40, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 17,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "#3B82F6",
    width: "20%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 6,
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
