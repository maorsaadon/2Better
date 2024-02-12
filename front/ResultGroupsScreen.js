import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ResultGroupCard from "../components/ResultGroupCard";
import myLogoPic from "../assets/default.png";
import GroupService from "../back/GroupService";

const ResultGroupScreen = ({ route, navigation }) => {
  const { selectedCity, selectedTypeOfSport } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      console.log(
        `Fetching groups for sport: ${selectedTypeOfSport}, city: ${selectedCity}`
      );
      try {
        const fetchedGroups = await GroupService.getGroupsBySort(
          selectedTypeOfSport,
          selectedCity
        );

        console.log("Fetched Groups:", fetchedGroups);

        if (fetchedGroups && fetchedGroups.length > 0) {
          setGroups(fetchedGroups);
          console.log("Fetched Groups:", groups);
        } else {
          console.log("No groups found for the given criteria.");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [selectedCity, selectedTypeOfSport]); // Depend on selectedCity and selectedTypeOfSport

  const backButton = () => {
    try {
      navigation.replace("FindNewGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backContainer}>
      <TouchableOpacity onPress={backButton} style={styles.backButton}>
        <AntDesign name="back" size={30} color="#366A68" />
      </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#366A68" />
        ) : (
          <ScrollView style={{ paddingTop: 10 }}>
            <View style={styles.container}>
              {groups.map((group, index) => (
                <ResultGroupCard key={index} group={group} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
      </SafeAreaView>
  );
};

export default ResultGroupScreen;

export const styles = StyleSheet.create({
  backContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingBottom: 40,
    backgroundColor: "rgba(233, 240, 233, 0.7)",
  },
  safeArea: {
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "rgba(233, 240, 233, 0.7)", // Adjust the opacity as needed
  },
  container: {
    justifyContent: "flex-start",
    paddingTop: 30,
    flexDirection: "column",
    gap: 35,
    backgroundColor: "rgba(233, 240, 233, 0.7)",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255 , 0.4)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "column",
    gap: 10,
    marginTop: 1,
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
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: -15,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
