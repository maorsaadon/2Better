import {
  Pressable,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { GroupService } from "../back/GroupService";

const sportIconMapping_FontAwesome5 = {
  Basketball: "basketball-ball",
  Baseball: "baseball-ball",
  Bowling: "bowling-ball",
  Cycling: "biking",
  Football: "football-ball",
  Volleyball: "volleyball-ball",
  Running: "running",
  Swimming: "swimmer",
  Hiking: "hiking",
  Snowboarding: "snowboarding",
};

const sportIconMapping_FontAwesome = {
  Soccer: "soccer-ball-o",
};

const sportIconMapping_MaterialCommunityIcons = {
  Tennis: "tennis-ball",
  Kitesurfing: "kitesurfing",
  Surfing: "surfing",
};


const screenWidth = Dimensions.get("window").width;

const GroupCard = ({ group }) => {
  const navigation = useNavigation();
  const groupName = group?.GroupName ?? "Default Name";
  const totalCapacity = parseInt(group.TotalCapacity, 10);

  const getSportIcon = (sportType) => {
    const iconName = sportIconMapping_FontAwesome5[sportType];
    if (iconName) {
      return <FontAwesome5 name={iconName} size={30} color="black" />;
    }
    const iconNameFA = sportIconMapping_FontAwesome[sportType];
    if (iconNameFA) {
      return <FontAwesome name={iconNameFA} size={30} color="black" />;
    }
    const iconNameMCI = sportIconMapping_MaterialCommunityIcons[sportType];
    if (iconNameMCI) {
      return (
        <MaterialCommunityIcons name={iconNameMCI} size={30} color="black" />
      );
    }

    return null; // Return null if no icon is found
  };

  const handleAddNewMeeting = (groupName) => {
    try {
      navigation.replace("AddNewMeeting", { groupName });
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteButton = (groupName) => {
    try {
      GroupService.handleDeleteGroup(groupName);
      navigation.replace("MyGroups");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditButton = (groupName) => {
    try {
      navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          {getSportIcon(group.SportType)}
          <View>
            <Text style={styles.title}>{groupName}</Text>
            <Text style={styles.subTitle}>{group.SportType}</Text>
          </View>
        </View>
        <View style={styles.cardMiddleRow}>
          <View style={styles.iconAndTextContainer}>
            <MaterialIcons name="location-on" size={22} color="black" />
            <Text>{group.City}</Text>
          </View>
          <View style={styles.iconAndTextContainer}>
            <MaterialCommunityIcons name="email" size={22} color="black" />
            <Text>{group.LeaderEmail}</Text>
          </View>
          <View style={styles.iconAndTextContainer}>
            <AntDesign name="user" size={22} color="black" />
            <Text>{totalCapacity}</Text>
          </View>
        </View>
        <View style={styles.cardBottomRow}>
          <TouchableOpacity
            onPress={() => handleAddNewMeeting(groupName)}
            style={styles.addMeetingButton}
          >
            <Text style={styles.buttonText}>Add new meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEditButton(groupName)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteButton(groupName)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
  },
  container: {
    backgroundColor: "#5B8BDF",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 30,
    gap: 15,
  },
  card: {
    width: screenWidth - 32,
    marginTop: -30,
    backgroundColor: "#FFFFFF", // Assuming a white card background
    borderRadius: 15, // Rounded corners
    marginVertical: 8, // Adds vertical space between items
    marginHorizontal: 16, // Adds horizontal space and centers the card in the view
    padding: 16, // Internal spacing between the border and content
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow position
    shadowOpacity: 0.22, // Shadow opacity
    shadowRadius: 2.22, // Shadow blur radius
    elevation: 3, // Elevation for Android
    borderWidth: 1, // Border width
    borderColor: "#E0E0E0",
    gap: 10,
  },
  cardTopRow: {
    marginTop: 0, // Adjust as needed to move closer to the top
    marginLeft: 0, // Adjust as needed for left alignment
    alignSelf: "flex-start", // Align self to the start of the cross axis
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardMiddleRow: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginLeft: 0,
  },
  sportIcon: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    resizeMode: "contain",
    marginRight: 10, // Add some space between the icon and the text
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 0,
  },
  subTitle: {
    opacity: 0.6,
    alignSelf: "flex-start",
    marginLeft: 0,
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "#3B82F6",
    width: 120,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  addMeetingButton: {
    backgroundColor: "#0782F9",
    padding: 10, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 0,
    width: 80,
    marginLeft: 0,
  },
  editButton: {
    backgroundColor: "green",
    padding: 10, // Adjusted padding to make the button shorter
    borderRadius: 10,
    marginTop: 0,
    width: 80,
    marginLeft: 0,
  },
});
