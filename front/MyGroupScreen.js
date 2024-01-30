import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { GroupService } from '../back/GroupService';
import { useNavigation } from '@react-navigation/core'
import myLogoPic from '../assets/2better-logo.jpg';
import { userMyGroups } from '../back/UserService';

const MyGroupsScreen = () => {
    
    const navigation = useNavigation()

    const backButton = () => {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    }

    const detailsButton = (groupName) => {
        try {
            navigation.navigate('GroupDetails',{ groupName });
        } catch (error) {
            alert(error.message);
        }
    };

    function meetingButton() {
        try {
            navigation.replace("Home");
        } catch (error) {
            alert(error.message);
        }
    }


    // useEffect(() => {
    //     // Fetch groups from the service
    //     const fetchGroups = async () => {
    //         await GroupService.getGroup();
    //     };

    //     fetchGroups();
    // }, []);


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

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Group Name</Text>
                </View>

                {/* Table Rows */}
                {userMyGroups.map((item) => (
                    <View key={item.groupId} style={styles.groupItem}>
                        <Text style={styles.groupName}>{item}</Text>
                        {/* Group Details */}
                        <TouchableOpacity
                            onPress={() => detailsButton(item)}
                            style={styles.detailsButton}
                        >
                            <Text style={styles.buttonText}>Group Details</Text>
                        </TouchableOpacity>
                        {/* Add a group meeting  */}
                        <TouchableOpacity
                            onPress={meetingButton}
                            style={styles.addMeetingButton}
                        >
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* "Add a New Group" Button */}
                <TouchableOpacity
                    onPress={handleAddNewGroup}
                    style={styles.addButton}
                >
                    <Text style={styles.buttonText}>Add New Group</Text>
                </TouchableOpacity>

            </View>

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
        borderRadius: 10,
        marginVertical: 5, // Adjusted margin for better spacing
        marginHorizontal: 5, // Adjusted margin for better spacing
        borderWidth: 2,
        borderColor: '#ddd',
        height: 55, // Set the desired height
    },
    groupName: {
        color: 'green',
        fontSize: 17,
        marginRight: 300,
    },
    backButton: {
        backgroundColor: '#0782F9',
        width: '15%',
        padding: 10, // Adjusted padding to make the button shorter
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 5,
    },
    addButton: {
        backgroundColor: '#0782F9',
        padding: 15,
        marginTop: 200,
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
    detailsButton: {
        backgroundColor: '#0782F9',
        padding: 10, // Adjusted padding to make the button shorter
        borderRadius: 10,
        marginTop: -30,
        marginLeft: 190,
    },
    addMeetingButton: {
        backgroundColor: '#0782F9',
        padding: 10, // Adjusted padding to make the button shorter
        borderRadius: 10,
        marginTop: -42,
        marginLeft: 350,
    },

    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f0f0f0',
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: '700',
    },
});

export default MyGroupsScreen;