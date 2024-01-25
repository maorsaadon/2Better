
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { groupService } from '../back/GroupService';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';

const MyGroupsScreen = ({ navigation }) => {

    //Aviv's Edit:
    /************************************************* */
    const navigate = useNavigation()

    const backButton = () => {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    }

    
    /************************************************** */

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch groups from the service
        const fetchGroups = async () => {
            const userGroups = await groupService.getMyGroups();
            setGroups(userGroups);
        };

        fetchGroups();
    }, []);

    const handleAddNewGroup = () => {
      try {
        navigation.replace("AddNewGroup");
      } catch (error) {
        alert(error.message);
      }
    };

    const handleViewGroupMeetings = (groupId) => {
        // Navigate to Group Meetings Screen with groupId
        navigation.navigate('GroupMeetingsScreen', { groupId });
    };

    return (
        <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity
                    onPress={backButton}
                    style={styles.backButton}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                {/* FlatList of Groups */}
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.groupItem}>
                            <Text style={styles.groupName}>{item.name}</Text>
                            <Button
                                title="Group Meetings"
                                onPress={() => handleViewGroupMeetings(item.id)}
                            />
                            </View>
                            )}
                            />



  {/* "Add a New Group" Button (Center) */}
  <TouchableOpacity
    onPress={handleAddNewGroup}
    style={styles.addButton}
  >
    <Text style={styles.buttonText}>Add a New Group</Text>
  </TouchableOpacity>
</View>
                {/************************************************* */}
            
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    groupItem: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    groupName: {
      fontSize: 18,
    },
    backButton: {
      backgroundColor: '#0782F9',
      width: '15%',
      padding: 10, // Adjusted padding to make the button shorter
      borderRadius: 10,
      marginTop: 20,
      marginLeft: 10,
    },
    addButton: {
      backgroundColor: '#0782F9',
      padding: 15,
      borderRadius: 10,
      alignSelf: 'center',
      marginVertical: 20,
    },
    buttonText: {
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: '700',
  },
  });

export default MyGroupsScreen;
