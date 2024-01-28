import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import myLogoPic from '../assets/2better-logo.jpg';
import GroupService from '../back/GroupService';

const AddNewGroupScreen = () => {
  const [groupName, setGroupName] = useState('')
  const [participants, setParticipants] = useState('')
  const [city, setCity] = useState('')
  const [sportType, setSportType] = useState('')

  const navigation = useNavigation()

  const backButton = () => {
    try {
        navigation.replace("MyGroups");
    } catch (error) {
        alert(error.message);
    }

    const handleCreate = async () => {
      try {
        await GroupService.handleAddNewGroup(groupName, city, sportType, participants);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    };
  
}


  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.inputContainer}>

           {/* Back Button */}
           <TouchableOpacity
                onPress={backButton}
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>Back</Text>
           </TouchableOpacity>

          <TextInput
            placeholder="Group name"
            value={groupName}
            onChangeText={text => setGroupName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Maximum num of participants"
            value={participants}
            onChangeText={text => setParticipants(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Sport Type"
            value={sportType}
            onChangeText={text => setSportType(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={city}
            onChangeText={text => setCity(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCreate}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Add</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default AddNewGroupScreen

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#0782F9',
    width: '15%',
    padding: 5, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
  },
  backButtonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
    
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  //###############################
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  //###############################
})

