// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { groupService } from '../back/GroupService';
// import { useNavigation } from '@react-navigation/core'
// import { auth } from '../back/firebase'
// import myLogoPic from '../assets/2better-logo.jpg';

// // Screen for finding and joining new groups
// const FindNewGroupScreen = () => {

//     //#######################################################
//     // const [city, setCity] = useState('');
//     // const [sportType, setSportType] = useState('');
//     // const [dayOfWeek, setDayOfWeek] = useState('');
//     // const [groups2, setGroups] = useState([]);

//     // const findGroups = () => {
//     //     // Implement the logic to find groups based on the criteria
//     //     // This is a placeholder for your fetching logic
//     //     console.log(city, sportType, dayOfWeek);
//     //     // Assume we fetch and set the groups to the state
//     //     // setGroups(fetchedGroups);
//     //   };


//     //#######################################################
//      //Aviv's Edit:
//     /************************************************* */
//     const navigation = useNavigation()

//     const backButton = () => {
//         try {
//             navigation.replace("Home");
//           } catch (error) {
//             alert(error.message);
//           }
//     }
//     /************************************************** */


//     const [groups, setGroups] = useState([]);

//     // Fetch all groups when the component is mounted
//     useEffect(() => {
//         const fetchGroups = async () => {
//             const allGroups = await groupService.getAllGroups();
//             setGroups(allGroups);
//         };

//         fetchGroups();
//     }, []);

//     // Function to handle joining a group
//     const handleJoinGroup = (groupId) => {
//         // Placeholder for join group logic
//         console.log('Join group:', groupId);
//     };

//     // Render each group as a touchable list item
//     const renderGroupItem = ({ item }) => (
//         <TouchableOpacity style={styles.groupItem} onPress={() => handleJoinGroup(item.id)}>
//             <Text style={styles.groupName}>{item.name}</Text>
//             {/* Display other details and add join button */}
//         </TouchableOpacity>
//     );

//     return (
//         <ImageBackground source={myLogoPic} style={styles.backgroundImage}>
//         <View style={styles.container}>
//             <FlatList
//                 data={groups}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={renderGroupItem}
//             />

//             {/*Aviv's Edit:
//             /**************************************************/}
//             <View style={styles.container}>
//                 <TouchableOpacity
//                     onPress={backButton}
//                     style={styles.button}
//                     >
//                     <Text style={styles.buttonText}>Back</Text>
//                 </TouchableOpacity>
//             </View>
//             {/************************************************* */}

//         </View>
//         </ImageBackground>
//     );
// };

// // Styles for the FindNewGroupScreen
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     groupItem: {
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     groupName: {
//         fontSize: 18,
//     },

//     //Aviv's Edit:
//     /************************************************* */
//     button: {
//         backgroundColor: '#0782F9',
//         width: '20%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 40,
//       },
//       buttonText: {
//         color: 'white',
//         fontWeight: '700',
//         fontSize: 16,
//       },
//       backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//       },
//       /************************************************* */
// });

// export default FindNewGroupScreen;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Modal, FlatList, Image, LogBox, Pressable, TouchableWithoutFeedback, Platform } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from "react-native";

const sportType_data = [
    { label: "Basketball", value: "Basketball" },
    { label: "Cycling", value: "Cycling" },
    { label: "Football", value: "Football" },
    { label: "Kitesurfing", value: "Kitesurfing" },
    { label: "Running", value: "Running" },
    { label: "Tennis", value: "Tenni" },
    { label: "Swimming", value: "Swimming" },
];
const city_data = [
  { label: "Tel-Aviv", value: "Tel-Aviv" },
  { label: "Ariel", value: "Ariel" },
  { label: "Jerusalem", value: "Jerusalem" },
  { label: "Beer-Sheva", value: "Beer-Sheva" }
];

const FindNewGroupScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [currentValueCity, setCurrentValueCity] = useState([]);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [currentValueCategories, setCurrentValueCategories] = useState([]);

  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());

  const handleCategoryPress = (item) => {
    setIsOpenCity(false);
    setCategory(item);
    setIsOpenCategories(true);
  };

  const handleCityPress = (item) => {
    setIsOpenCategories(false);
    setCity(item);
    setIsOpenCity(true);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => { setIsOpenCity(false); setIsOpenCategories(false) }}>
      <View style={styles.container}>
        
        <Text style={[styles.searchtext, { textAlign: 'right' }]}>Type of sport:</Text>

        <DropDownPicker
          items={sportType_data}
          open={isOpenCategories}
          setOpen={setIsOpenCategories}
          value={currentValueCategories}
          setValue={setCurrentValueCategories}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="Select"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={styles.dropdownContainer}
          style={[styles.dropdownStyle, { zIndex: isOpenCategories ? 2 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="Search..."
          onSelectItem={handleCategoryPress}
        />
        <Text style={styles.searchtext}>City:</Text>

        <DropDownPicker
          items={city_data}
          open={isOpenCity}
          setOpen={setIsOpenCity}
          value={currentValueCity}
          setValue={setCurrentValueCity}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="Select"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={[styles.dropdownContainer,{ zIndex: isOpenCity ? 1 : 0 }]}
          style={[styles.dropdownStyle, { zIndex: isOpenCity ? 1 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="Search..."
          onSelectItem={handleCityPress}
        />

        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.searchtext}>From..</Text>
            <DateTimePicker
              value={selectedDate2}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setSelectedDate2(selectedDate)}
            />
          </View>
        
          <View>
            <Text style={styles.searchtext}>Until..</Text>
            <DateTimePicker
              value={selectedDate1}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setSelectedDate1(selectedDate)}
            />
          </View>
        </View>
    
        <Pressable
        
          style={[styles.button, styles.pressableWithMargin]}
          onPress={() => navigation.navigate('ResultScreen')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              <FontAwesome name="search" size={24} color="white" /> serch meeting
            </Text>
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FindNewGroupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingTop: 40, // Add padding to give some space at the top
        flexDirection: 'column',
        gap: 17
        
    },
    container_text: {
      flex: 1,
      justifyContent: 'flex-start', // Align items at the top
      backgroundColor: '#5B8BDF',
      alignItems: 'right',
      paddingTop: 40, // Add padding to give some space at the top
      flexDirection: 'column',
      gap: 20
    },
    logo: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
    button: {
        backgroundColor: '#2C64C6',
        width: 300,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    pressableWithMargin:{
        marginRight: 25
    },
    iconTextContainer: {
        flexDirection: 'colomn',
        justifyContent: 'flex-start',  
        alignItems: 'center',    
      },

      input: {
        height: 50,
        width: '75%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 16,
        paddingLeft: 8,
        textAlign: 'right',
        fontSize: 18,     
        fontWeight: 'bold',  
      },
      inputWithMargin: {
        marginTop: 30, // Adjust the margin based on your design
        // Add other styles for the input with margin if needed
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // or 'space-around'
        alignItems: 'center',
        marginVertical: 20, // Adjust as needed
      },
      pressableContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
      },
      serchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      calendarIcon: {
        marginTop: 10, // Adjust the space between text and icon
      },
      categoryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        
      },
    
      modalCloseButton: {
        backgroundColor: '#2C64C6',
        padding: 10,
        marginBottom: 30,
        marginRight:10,
        borderRadius: 10,
        alignSelf: 'flex-end',
      },
      categoryInputContainer: {
        marginBottom: 16,
        width: '80%',
        borderColor: '#2C64C6',
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 3,
        paddingLeft: 10,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 40,
      },
    
      categoryInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    
      categoryInputText: {
        color: '#2C64C6',
        fontSize: 16,
      },
    
      categoryButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
      },
    
      inputPlaceholder: {
        height: 40,
        textAlign: 'right',
        color: '#CCCCCC',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      selectedCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C64C6',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 15,
      },
    
      selectedCategoryText: {
        color: 'white',
        fontSize: 16,
        padding: 5,
      },
    
      removeCategoryButton: {
        color: 'white',
        marginLeft: 50,
        marginRight: 50,
        fontWeight: 'bold',
      },
    
      chooseButton: {
        color: 'blue',
      },
      container_icon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
      },
      iconContainer_icon: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon_icon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50, // Adjust padding as needed
        height: 120,
        paddingVertical: -100
      },
      searchtext:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
      },
      
  loginContainer: {
    flexDirection: 'row', // Ensure items are in the same row
    alignItems: 'center', // Align items vertically in the center
    marginTop: 16,
  },

  loginText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8, // Add margin to separate text and button
     marginBottom: 12,
  },
  dropdownContainer: {
    height: 40,
    width: '80%',
    marginBottom: 16,
    textAlign: 'right',
    zIndex: 2,
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderColor: '#2C64C6',
    borderWidth: 3,
    borderRadius: 10,
    textAlign: 'right',
    
    
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
    textAlign: 'right',
  },
  dropdownListStyle: {
    borderColor: '#2C64C6',
    borderWidth: 3,
    textAlign: 'right',
  },
  placeHolderStyle :{
    color: "#A9A9A9",
    textAlign: 'right'
  },
  datePickerContainer: {
    marginup: 30, // Adjust this value as needed for the desired spacing
  },
  

});

