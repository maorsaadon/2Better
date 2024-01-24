import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState  } from 'react'
import { StyleSheet, Text, TextInput, Button, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';
import { userFirstName, userLastName, UserCity} from '../back/UserService'
import UserService from '../back/UserService';



const ProfileScreen = () => {
    // UserService.updateUserDetails('John', 'Doe', 'New York', ['group1', 'group2']); // This is example of updating the data!!!!!

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    // Fetch user details and initialize fields
    const fetchUserDetails = async () => {
      try {
        // const userDetails = await UserService.getUserDetails();
        setFirstName(userFirstName);
        setLastName(userLastName);
        setCity(UserCity);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    try {
      await UserService.updateUserDetails(firstName, lastName, city, ['group1', 'group2']);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const navigation = useNavigation()

  const backButton = () => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  }

  // const nameButton = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Home")
  //     })
  //     .catch(error => alert(error.message))
  // }

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>

      <View style={styles.container}>
      <TouchableOpacity
        onPress={()=> { } }
        style={styles.button}
      >
        <Text style={styles.buttonText}>{userFirstName}</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.container}>
      {/* ############################## */}

      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        editable={isEditing}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        editable={isEditing}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        editable={isEditing}
        placeholder="City"
      />
      {isEditing ? (
        <Button title="Save" onPress={handleSave} />
      ) : (
        <Button title="Edit" onPress={() => setIsEditing(true)} />
      )}
      {/* ##############################3 */}

      <TouchableOpacity
        onPress={backButton}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>

    </ImageBackground>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,
      },
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
      input: {
        width: '100%',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
      },
})