import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { groupService } from '../back/GroupService';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';

// Screen for finding and joining new groups
const FindNewGroupScreen = () => {

    //#######################################################
    // const [city, setCity] = useState('');
    // const [sportType, setSportType] = useState('');
    // const [dayOfWeek, setDayOfWeek] = useState('');
    // const [groups2, setGroups] = useState([]);

    // const findGroups = () => {
    //     // Implement the logic to find groups based on the criteria
    //     // This is a placeholder for your fetching logic
    //     console.log(city, sportType, dayOfWeek);
    //     // Assume we fetch and set the groups to the state
    //     // setGroups(fetchedGroups);
    //   };


    //#######################################################
     //Aviv's Edit:
    /************************************************* */
    const navigation = useNavigation()

    const backButton = () => {
        try {
            navigation.replace("Home");
          } catch (error) {
            alert(error.message);
          }
    }
    /************************************************** */


    const [groups, setGroups] = useState([]);

    // Fetch all groups when the component is mounted
    useEffect(() => {
        const fetchGroups = async () => {
            const allGroups = await groupService.getAllGroups();
            setGroups(allGroups);
        };

        fetchGroups();
    }, []);

    // Function to handle joining a group
    const handleJoinGroup = (groupId) => {
        // Placeholder for join group logic
        console.log('Join group:', groupId);
    };

    // Render each group as a touchable list item
    const renderGroupItem = ({ item }) => (
        <TouchableOpacity style={styles.groupItem} onPress={() => handleJoinGroup(item.id)}>
            <Text style={styles.groupName}>{item.name}</Text>
            {/* Display other details and add join button */}
        </TouchableOpacity>
    );

    return (
        <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGroupItem}
            />

            {/*Aviv's Edit:
            /**************************************************/}
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={backButton}
                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            {/************************************************* */}

        </View>
        </ImageBackground>
    );
};

// Styles for the FindNewGroupScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    groupName: {
        fontSize: 18,
    },

    //Aviv's Edit:
    /************************************************* */
    button: {
        backgroundColor: '#0782F9',
        width: '20%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
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
      /************************************************* */
});

export default FindNewGroupScreen;
