
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserService } from '../context/UserService';
import { groupService } from '../services/GroupService';

const AddNewGroupScreen = () => {
    const [groupDetails, setGroupDetails] = useState({
        name: '',
        sportType: '',
        city: '',
        maxParticipants: ''
    });
    const { user } = useContext(UserService); // Assuming you have a UserContext

    const handleInputChange = (name, value) => {
        setGroupDetails({ ...groupDetails, [name]: value });
    };

    const handleAddGroup = async () => {
        if (user && user.uid) {
            await groupService.addGroup({ ...groupDetails, leaderId: user.uid });
            // Navigate back to My Groups or show a success message
        } else {
            // Handle user not found case
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add a New Group</Text>
            <TextInput
                style={styles.input}
                placeholder="Group's Name"
                value={groupDetails.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Sport Type"
                value={groupDetails.sportType}
                onChangeText={(text) => handleInputChange('sportType', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={groupDetails.city}
                onChangeText={(text) => handleInputChange('city', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Maximum Number of Participants"
                value={groupDetails.maxParticipants}
                onChangeText={(text) => handleInputChange('maxParticipants', text)}
                keyboardType="numeric"
            />
            <Button title="Create Group" onPress={handleAddGroup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AddNewGroupScreen;
