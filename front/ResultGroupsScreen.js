import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ResultGroupCard from "../components/ResultGroupCard";
import GroupService from "../back/GroupService";
import myLogoPic from "../assets/default.png";
import { stylesResult } from "../components/StylesSheets";

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
    <ImageBackground source={myLogoPic} style={stylesResult.backgroundImage}>         
    <ScrollView>
    <View style={{backgroundColor: 'rgba(233, 240, 233, 0.7)'} }> 
      <TouchableOpacity onPress={backButton} style={stylesResult.backButton}>
        <AntDesign name="back" size={30} color="#366A68" />
      </TouchableOpacity>
      <View style={stylesResult.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#366A68" />
        ) : (

            <View style={stylesResult.container}>
              {groups.map((group, index) => (
                <ResultGroupCard key={index} group={group} />
              ))}
            </View>
          
        )}
      </View>
    </View>
    </ScrollView>
    </ImageBackground>
  );
};

export default ResultGroupScreen;


