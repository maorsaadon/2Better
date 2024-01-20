import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleMyProfile = () =>{
    auth
      .signOut()
      .then(() => {
        navigation.replace("Profile")
      })
      .catch(error => alert(error.message))
  }

  const handleMyGroups = () =>{
    auth
    .signOut()
    .then(() => {
      navigation.replace("MyGroups")
    })
    .catch(error => alert(error.message))
  }

  const handleFindNewGroup = () =>{
    auth
    .signOut()
    .then(() => {
      navigation.replace("FindNewGroups")
    })
    .catch(error => alert(error.message))
  }
  
  const handleNotifications = () =>{
    auth
    .signOut()
    .then(() => {
      navigation.replace("Notifications")
    })
    .catch(error => alert(error.message))

  }

  const handleUpcomingMeetings = () =>{
    auth
    .signOut()
    .then(() => {
      navigation.replace("UpcomingMeetings")
    })
    .catch(error => alert(error.message))

  }
  
  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleMyProfile}
            style={styles.button}
          >
            <Text style={styles.buttonText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleMyGroups}
            style={styles.button}
          >
            <Text style={styles.buttonText}>My Groups</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleFindNewGroup}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Find a New Group</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleNotifications}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleUpcomingMeetings}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Upcoming Meetings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
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
})

//#################################################################

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Homescreen = () => {
//   return (
//     <View>
//       <Text>Homescreen</Text>
//     </View>
//   )
// }

// export default Homescreen

// const styles = StyleSheet.create({})