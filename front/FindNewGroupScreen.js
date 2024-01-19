import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { groupService } from '../services/GroupService';

// Screen for finding and joining new groups
const FindNewGroupScreen = () => {
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
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderGroupItem}
            />
        </View>
    );
};

// Styles for the FindNewGroupScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    groupItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    groupName: {
        fontSize: 18,
    },
});

export default FindNewGroupScreen;
