import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';
import { userFirstName, userLastName, UserCity } from '../back/UserService'
import UserService from '../back/UserService';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setFirstName(userFirstName);
        setLastName(userLastName);
        setCity(UserCity);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    navigation.navigate('EditProfile', {
      userFirstName,
      userLastName,
      UserCity,
      onSave: (updatedFirstName, updatedLastName, updatedCity) => {
        setFirstName(updatedFirstName);
        setLastName(updatedLastName);
        setCity(updatedCity);
        setIsEditing(false);
      },
    });
  };

  const handleSave = async () => {
    try {
      await UserService.updateUserDetails(firstName, lastName, city, ['group1', 'group2']);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const navigation = useNavigation();

  const backButton = () => {
    try {
      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{userFirstName}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{userFirstName}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{userLastName}</Text>

        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{UserCity}</Text>

        {isEditing ? (
          <Button title="Save" onPress={handleSave} />
        ) : (
          <Button title="Edit" onPress={handleEdit} />
        )}

        <TouchableOpacity onPress={backButton} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -150,
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
