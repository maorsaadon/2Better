
import React from "react";
import { StyleSheet,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./front/LoginScreen";
import HomeScreen from "./front/HomeScreen";
import RegisterScreen from "./front/RegisterScreen";
import ProfileScreen from "./front/ProfileScreen";
import EditProfileScreen from "./front/EditProfileScreen";
import MyGroupScreen from "./front/MyGroupScreen";
import FindNewGroupScreen from "./front/FindNewGroupScreen";
import NotificationsScreen from "./front/NotificationsScreen";
import UpcomingMeetingScreen from "./front/UpcomingMeetingScreen";
import AddNewMeetingScreen from "./front/AddNewMeetingScreen";
import AddNewGroupScreen from "./front/AddNewGroupScreen";
import ResultGroupsScreen from "./front/ResultGroupsScreen";
import EditGroupScreen from "./front/EditGroupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyGroups" component={MyGroupScreen} />
        <Stack.Screen name="FindNewGroups" component={FindNewGroupScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen
          name="UpComingMeetings"
          component={UpcomingMeetingScreen}
        />
        <Stack.Screen name="AddNewGroup" component={AddNewGroupScreen} />
        <Stack.Screen name="AddNewMeeting" component={AddNewMeetingScreen} />
        <Stack.Screen name="ResultGroups" component={ResultGroupsScreen} />
        <Stack.Screen name="EditGroup" component={EditGroupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
