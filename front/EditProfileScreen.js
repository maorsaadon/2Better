import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, Button, View, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { userFirstName, userLastName, UserCity } from '../back/UserService';
import UserService from '../back/UserService';
import myLogoPic from '../assets/2better-logo.jpg';

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      // Call the updateUserDetails function from UserService to update user data
      await UserService.updateUserDetails(firstName, lastName, city, []);
      navigation.navigate('Home'); // Go back to the Home screen after saving
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };


  //***************** its need to make that all the data will be up to date but its not always work ***********
  // Use useFocusEffect to update the state when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      // Set initial values when the screen gains focus
      setFirstName('');
      setLastName('');
      setCity('');
    }, [])
  );

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />

        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />

        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="City"
        />

        <Button title="Save" onPress={handleSave} style={styles.saveButton} />
      </View>
    </ImageBackground>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  label: {
    backgroundColor: '#0782F9',
    fontSize: 15,
    padding: 15,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  saveButtom: {
    marginTop: 100
  },
});
