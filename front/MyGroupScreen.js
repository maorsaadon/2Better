import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import myLogoPic from "../assets/default.png";
import { GroupService } from "../back/GroupService";
import { AntDesign } from "@expo/vector-icons";
import ManagerGroupCard from "../components/ManagerGroupCard";
import MemberGroupCard from "../components/MemberGroupCard";

const MyGroupsScreen = () => {
  const navigation = useNavigation();
  const [isManagerView, setIsManagerView] = useState(true);
  const [ManagerGroups, setManagerGroups] = useState([]);
  const [MemberGroups, setMemberGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        if (isManagerView) {
          const fetchManagerGroups = await GroupService.getManagerGroups();
          if (Array.isArray(fetchManagerGroups)) {
            setManagerGroups(fetchManagerGroups);
          } else {
            setManagerGroups([]);
          }
        } else {
          const fetchMemberGroups = await GroupService.getMemberGroups();
          if (Array.isArray(fetchMemberGroups)) {
            setMemberGroups(fetchMemberGroups);
          } else {
            setMemberGroups([]);
          }
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, [isManagerView]);

  const backButton = () => {
    console.log("Add New Group button pressed");
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setIsManagerView(true)}
          style={[
            styles.toggleButton,
            isManagerView && styles.toggleButtonActive,
          ]}
        >
          <Text style={styles.buttonText}>MY GROUP AS</Text>
          <Text style={styles.buttonText}>A MANAGER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsManagerView(false)}
          style={[
            styles.toggleButton,
            !isManagerView && styles.toggleButtonActive,
          ]}
        >
          <Text style={styles.buttonText}>MY GROUP AS</Text>
          <Text style={styles.buttonText}>A MEMBER</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {isManagerView
            ? ManagerGroups.map((group, index) => (
                <ManagerGroupCard key={index} group={group} />
              ))
            : MemberGroups.map((group, index) => (
                <MemberGroupCard key={index} group={group} />
              ))}
        </View>
      </ScrollView>
      {isManagerView && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleAddNewGroup}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Add New Group</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  addContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the top
    flexDirection: "column",
  },
  container: {
    justifyContent: "flex-start",
    paddingVertical: 40,
    flexDirection: "column",
    gap: 40,
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
  toggleButton: {
    flex: 1,
    backgroundColor: "#366A68",
    paddingVertical: 10,
    borderBottomWidth: 2, // Add underline to indicate this part can be tapped
    borderBottomColor: "black", // Make the underline transparent initially
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    opacity: 0.5,
    flex: 1,
    backgroundColor: "#366A68",
    paddingVertical: 10,
    borderBottomWidth: 2, // Add underline to indicate this part can be tapped
    borderBottomColor: "black", // Make the underline transparent initially
    alignItems: "center",
    justifyContent: "center",
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
    top: 5,
    left: -15,
  },
  addButton: {
    backgroundColor: "#273B35",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default MyGroupsScreen;
