import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import GroupCard from "../components/GroupCard";
import { useNavigation } from "@react-navigation/core";
import myLogoPic from "../assets/default.png";
import { GroupService } from "../back/GroupService";
import { MaterialIcons } from "@expo/vector-icons";

const MyGroupsScreen = () => {
  const navigation = useNavigation();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const fetchedGroups = await GroupService.getGroups();
        if (fetchedGroups && fetchedGroups.length > 0) {
          setGroups(fetchedGroups);
        } else {
          console.log("No groups found for the given criteria.");
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroup();
  }, []);

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddNewGroup = () => {
    try {
      navigation.replace("AddNewGroup");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.back_container}>
          <TouchableOpacity onPress={backButton} style={styles.backButton}>
            <MaterialIcons name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
          <ScrollView style={{paddingTop: 30}}>
            <View style={styles.container}>
              {groups.map((group, index) => (
                <GroupCard key={index} group={group} />
              ))}
            </View>
          </ScrollView>
        <TouchableOpacity onPress={handleAddNewGroup} style={styles.addButton}>
          <Text style={styles.buttonText}>Add New Group</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  back_container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    paddingTop: 30, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 35,
    paddingTop: 300,
  },
  container: {
    justifyContent: "flex-start", // Align items at the top
    paddingVertical: 30, // Add padding to give some space at the top
    flexDirection: "column",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
    width: 70, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    resizeMode: "contain", // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
  },
  backButton: {
    backgroundColor: "#0782F9",
    width: 50,
    height: 50,
    padding: 10, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 50,
    opacity: 0.7
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default MyGroupsScreen;
