// import React from "react";
// import { StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AppScreen from "./front/AppScreen";
// import LoginScreen from "./front/LoginScreen";
// import HomeScreen from "./front/HomeScreen";
// import RegisterScreen from "./front/RegisterScreen";
// import ProfileScreen from "./front/ProfileScreen";
// import EditProfileScreen from "./front/EditProfileScreen";
// import MyGroupScreen from "./front/MyGroupScreen";
// import FindNewGroupsScreen from "./front/FindNewGroupsScreen";
// import NotificationsScreen from "./front/NotificationsScreen";
// import UpcomingMeetingScreen from "./front/UpcomingMeetingScreen";
// import AddNewMeetingScreen from "./front/AddNewMeetingScreen";
// import AddNewGroupScreen from "./front/AddNewGroupScreen";
// import ResultGroupsScreen from "./front/ResultGroupsScreen";
// import EditGroupScreen from "./front/EditGroupScreen";
// import EditMeetingScreen from "./front/EditMeetingScreen";

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Entry" component={AppScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="EditProfile" component={EditProfileScreen} />
//         <Stack.Screen name="MyGroups" component={MyGroupScreen} />
//         <Stack.Screen name="FindNewGroups" component={FindNewGroupsScreen} />
//         <Stack.Screen name="Notifications" component={NotificationsScreen} />
//         <Stack.Screen
//           name="UpComingMeetings"
//           component={UpcomingMeetingScreen}
//         />
//         <Stack.Screen name="AddNewGroup" component={AddNewGroupScreen} />
//         <Stack.Screen name="AddNewMeeting" component={AddNewMeetingScreen} />
//         <Stack.Screen name="ResultGroups" component={ResultGroupsScreen} />
//         <Stack.Screen name="EditGroup" component={EditGroupScreen} />
//         <Stack.Screen name="EditMeetingScreen" component={EditMeetingScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import AppScreen from "./front/AppScreen";
import LoginScreen from "./front/LoginScreen";
import HomeScreen from "./front/HomeScreen";
import RegisterScreen from "./front/RegisterScreen";
import ProfileScreen from "./front/ProfileScreen";
import EditProfileScreen from "./front/EditProfileScreen";
import MyGroupScreen from "./front/MyGroupScreen";
import FindNewGroupsScreen from "./front/FindNewGroupsScreen";
import NotificationsScreen from "./front/NotificationsScreen";
import UpcomingMeetingScreen from "./front/UpcomingMeetingScreen";
import AddNewMeetingScreen from "./front/AddNewMeetingScreen";
import AddNewGroupScreen from "./front/AddNewGroupScreen";
import ResultGroupsScreen from "./front/ResultGroupsScreen";
import EditGroupScreen from "./front/EditGroupScreen";
import EditMeetingScreen from "./front/EditMeetingScreen";


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const GroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyGroups" component={MyGroupScreen} />
      <Stack.Screen name="AddNewGroup" component={AddNewGroupScreen} />
      <Stack.Screen name="AddNewMeeting" component={AddNewMeetingScreen} />
      <Stack.Screen name="EditGroup" component={EditGroupScreen} />
    </Stack.Navigator>
  );
};

const MeetingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Meeting" component={UpcomingMeetingScreen} />
      <Stack.Screen name="EditMeeting" component={EditMeetingScreen} />
    </Stack.Navigator>
  );
};

const FindNewGroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindNewGroups" component={FindNewGroupsScreen} />
      <Stack.Screen name="ResultGroups" component={ResultGroupsScreen} />
    </Stack.Navigator>
  );
};


const HomeStack = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home Page") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "My Groups") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Explore Group") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Meetings") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Log Out") {
            iconName = focused ? "exit" :"exit-outline" ;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#366A68",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home Page" component={HomeScreen} />
      <Tab.Screen name="My Groups" component={GroupsStack} />
      <Tab.Screen name="Explore Group" component={FindNewGroupsStack} />   
      <Tab.Screen name="Meetings" component={MeetingStack} />
      <Tab.Screen name="Log Out" component = {AppScreen}  options={{ tabBarStyle: { display: 'none' } }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Entry" component={AppScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MyGroup" component={MyGroupScreen} />
        <Stack.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
