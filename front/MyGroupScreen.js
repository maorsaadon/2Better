
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

    const handleAddGroup = () => {
        // Navigate to Add Group Screen
        navigation.navigate('AddGroupScreen');
    };

    const handleViewGroupMeetings = (groupId) => {
        // Navigate to Group Meetings Screen with groupId
        navigation.navigate('GroupMeetingsScreen', { groupId });
    };

    return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
    <View style={styles.container}>
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
            <Button title="Add a New Group" onPress={handleAddGroup} />

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    groupItem: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
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

export default MyGroupsScreen;
