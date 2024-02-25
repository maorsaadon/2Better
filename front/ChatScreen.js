import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { auth, db } from '../back/firebase';
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors';


   const ChatScreen = ({route}) => {
    const {meeting} = route.params;
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    console.log(meeting);

    const backButton = () => {
      try {
        navigation.replace("Meeting");
      } catch (error) {
        alert(error.message);
      }
    };

    const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
      }, [navigation]);

    useLayoutEffect(() => {

      const chatRef = collection(db, 'Meetings', meeting.id, 'chat');
      const q = query(chatRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        const chatRef = collection(db, 'Meetings', meeting.id, 'chat');
        addDoc(chatRef, {
          _id,
          createdAt,
          text,
          user
        });
      }, []);

      return (
        <View style={styles.container}>
          {/* Back button */}
          <View style={styles.backContainer}>
            <TouchableOpacity onPress={backButton} style={styles.backButton}>
              <AntDesign name="back" size={24} color="#366A68" />
            </TouchableOpacity>
          </View>
    
          {/* GiftedChat */}
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            messagesContainerStyle={{
              backgroundColor: 'white', // Make it transparent
            }}
            textInputStyle={{
              backgroundColor: '#fff',
              borderRadius: 20,
            }}
            user={{
              _id: auth?.currentUser?.email,
              avatar: 'https://i.pravatar.cc/300'
            }}
          />
        </View>
      );
    };

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(233, 240, 233, 0.7)', // Adjust the opacity as needed
  },
  backContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
});