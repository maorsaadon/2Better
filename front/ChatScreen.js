import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ImageBackground } from 'react-native';
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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { userImageUpload } from "../back/UserService";
import myLogoPic from "../assets/default.png";
import { stylesChat } from '../components/StylesSheets';

const ChatScreen = ({ route }) => {
  const { meeting } = route.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState(null);
  console.log(meeting);

  useEffect(() => {
    // Fetch user's image URL when the component mounts
    getImageURL();
  }, []);


  const getImageURL = async () => {
    const storage = getStorage();
    var storageRef;

    if (userImageUpload == 0) {
      storageRef = ref(storage, 'UsersProfilePics/' + 'defaultProfile.jpeg');
    }
    else {
      storageRef = ref(storage, 'UsersProfilePics/' + auth.currentUser.email);
    }
    try {
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log(url)
    } catch (error) {
      console.error('Error retrieving image:', error);
    }
  }

  const backButton = () => {
    try {
      navigation.replace("Meeting");
    } catch (error) {
      alert(error.message);
    }
  };

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
    getImageURL();
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
    <ImageBackground source={myLogoPic} style={stylesChat.backgroundImage}>
      <View style={stylesChat.container}>
        <View style={stylesChat.backContainer}>
          <TouchableOpacity onPress={backButton} style={stylesChat.backButton}>
            <AntDesign name="back" size={24} color="#366A68" />
          </TouchableOpacity>
        </View>

        {/* GiftedChat */}
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={true}
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
            avatar: imageUrl
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default ChatScreen;

