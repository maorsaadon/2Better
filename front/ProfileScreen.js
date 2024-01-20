import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth } from '../back/firebase'
import myLogoPic from '../assets/2better-logo.jpg';

const ProfileScreen = () => {

    const navigation = useNavigation()

    const backButton = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
  }

  return (
    <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
    <View style={styles.container}>
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
})