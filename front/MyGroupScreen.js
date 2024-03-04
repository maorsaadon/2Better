import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import myLogoPic from "../assets/default.png";
import { GroupService } from "../back/GroupService";
import { AntDesign } from "@expo/vector-icons";
import ManagerGroupCard from "../components/ManagerGroupCard";
import MemberGroupCard from "../components/MemberGroupCard";
import { stylesGroup } from "../components/StylesSheets";

const MyGroupsScreen = () => {
  const navigation = useNavigation();
  const [isManagerView, setIsManagerView] = useState(true);
  const [ManagerGroups, setManagerGroups] = useState([]);
  const [MemberGroups, setMemberGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isRefreshing, setRefreshing] = useState(true);


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
  useEffect(() => {
    fetchGroups();
  }, [isManagerView]);


  const handleAddNewGroup = () => {
    try {
      navigation.navigate("AddNewGroup");
    } catch (error) {
      alert(error.message);
    }
  };

  const navigateToGroupMeetings = (group) => {
    console.log("go to the group:", group);
    try {
      navigation.replace("GroupMeetings", { group });
    } catch (error) {
      alert(error.message);
    }
  };
  const onRefreshing = () => {
    setRefresh(true);
    setRefreshing(false);
    fetchGroups();
    setTimeout(() => {
      setRefresh(false);
      setRefreshing(true);
    }, 2000)

  };

  return (
    <ImageBackground source={myLogoPic} style={stylesGroup.backgroundImage}>
      <View style={stylesGroup.buttonContainer}>
        <TouchableOpacity
          onPress={() => setIsManagerView(true)}
          style={[
            stylesGroup.toggleButton,
            !isManagerView && stylesGroup.toggleButtonActive,
          ]}
        >
          <Text style={stylesGroup.buttonText}>MY GROUP AS</Text>
          <Text style={stylesGroup.buttonText}>A MANAGER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsManagerView(false)}
          style={[
            stylesGroup.toggleButton,
            isManagerView && stylesGroup.toggleButtonActive,
          ]}
        >
          <Text style={stylesGroup.buttonText}>MY GROUP AS</Text>
          <Text style={stylesGroup.buttonText}>A MEMBER</Text>
        </TouchableOpacity>
      </View>
      <ScrollView refreshControl={ // Notice the correct prop name here: refreshControl instead of RefreshControl
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => onRefreshing()}
          colors={['#366A68', 'black']} // Set the colors of the loading indicator
          progressBackgroundColor='#E9EFE8'
          size="large"
        />
      }
      >
        <View style={stylesGroup.container}>
          {isManagerView
            ? ManagerGroups.map((group, index) => (
              <TouchableOpacity key={index} onPress={() => navigateToGroupMeetings(group)}>
                <ManagerGroupCard key={index} group={group} />
              </TouchableOpacity>
            ))
            : isRefreshing ? MemberGroups.map((group, index) => (
              <MemberGroupCard key={index} group={group} />
            )) : <Text></Text>}
        </View>
      </ScrollView>
      {isManagerView && (
        <View style={stylesGroup.container}>
          <TouchableOpacity
            onPress={handleAddNewGroup}
            style={stylesGroup.addButton}
          >
            <Text style={stylesGroup.buttonText}>Add New Group</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};


export default MyGroupsScreen;
