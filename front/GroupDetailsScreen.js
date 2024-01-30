// src/components/GroupDetailScreen.js
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, View, ImageBackground } from 'react-native'
import myLogoPic from '../assets/2better-logo.jpg';
// import {_groupName, _leaderEmail, _participants, _city, _sportType} from '../back/GroupService';
import GroupService from '../back/GroupService';

var groupName = ""
var leaderEmail = ""
var participants = ""
var city = ""
var sportType = ""

const GroupDetailsScreen = ({ route }) => {
  const { groupName } = route.params;


  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [groupDetails, setGroupDetails] = useState({
    groupName: '',
    leaderEmail: '',
    participants: '',
    city: '',
    sportType: '',
  });

  // const [group_name, setGroupName] = useState('');
  // const [leader_email, setLeaderEmail] = useState('');
  // const [participants, setParticipants] = useState('');
  // const [city, setCity] = useState('');
  // const [sport_type, setSportType] = useState('');  
  
  // var group_name = "";
  // var leader_email = "";
  // var participants = "";
  // var city = "";
  // var sport_type = "";

  // const {group_name, leader_email, participants, city, sport_type} = GroupService.getGroup(groupName);
  // console.log(group_name, leader_email, participants, city, sport_type);

  
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await GroupService.getGroup(groupName);
        if (data) {
          setGroupDetails(data); // Use the data directly as it matches the state structure
        } else {
          // Handle the case where the group data is not found
          console.log('No group data found for:', groupName);
        }
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };
    fetchGroupDetails();
  }, [groupName]);

  const handleEditGroup = () => {
    navigation.navigate('EditGroup');
  };

  const handleSaveGroup = async () => {
    try {
      await GroupService.updateGroupDetails(group_name, city, sport_type, participants);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating group details:', error);
    }
  };

  const backButton = () => {
    try {
      navigation.replace('MyGroups');
    } catch (error) {
      alert(error.message);
    }
  };

 

  // Render group details and update button
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.label}>Group Name:</Text>
        <Text style={styles.value}>{groupDetails.groupName}</Text>

        <Text style={styles.label}>Leader Email:</Text>
        <Text style={styles.value}>{groupDetails.leaderEmail}</Text>

        <Text style={styles.label}>Participants:</Text>
        <Text style={styles.value}>{groupDetails.participants}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{groupDetails.city}</Text>

        <Text style={styles.label}>Sport Type:</Text>
        <Text style={styles.value}>{groupDetails.sportType}</Text>

        {isEditing ? (
          <Button title="Save" onPress={handleSaveGroup} />
        ) : (
          <Button title="Edit" onPress={handleEditGroup} />
        )}

        <TouchableOpacity onPress={backButton} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  label: {
    backgroundColor: '#0782F9',
    color: 'black',
    fontSize: 18,
    padding: 5,
    borderRadius: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#0782F9',
    borderWidth: 2,
  }
});


export default GroupDetailsScreen;