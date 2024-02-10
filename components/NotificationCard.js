import {
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

const screenWidth = Dimensions.get("window").width;

const NotificationCard = ({ notification }) => {
   const navigation = useNavigation();
    const addressee = notification?.Addressee ?? "Default Addressee"
    const content = notification?.Content ?? "Default Content"
    const type = notification?.Type ?? "Default Type"
    const groupName = notification?.groupName ?? "Default Name"
    const request = type == "Group subscribe request" ? true : false;

    const handleAcceptButton = () => {
      try {
          GroupService.handleSubscribeGroup(false, groupName);
      } catch (error) {
        alert(error.message);
      }
    };

    return (
        <SafeAreaView>
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <Text style={styles.title}>{type}</Text>
            </View>
            <View style={styles.cardMiddleRow}>
                <Text>{content}</Text>
            </View>
            {request && (
            <View style={styles.cardBottomRow}>
          <TouchableOpacity
            onPress={() => handleAcceptButton(groupName)}
            style={styles.acceptButton}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRejectButton}
            style={styles.rejectButton}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
          </View>
            )}
          </View>
        </SafeAreaView>
      );
    };
    
    export default NotificationCard;

    const styles = StyleSheet.create({
        card: {
          width: screenWidth - 32,
          marginTop: 10,
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
        cardBottomRow: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 10,
        },
        title: {
          fontWeight: "bold",
          fontSize: 18,
          alignSelf: "flex-start",
          marginLeft: 0,
        },
        acceptButton: {
          backgroundColor: "green",
          padding: 10, // Adjusted padding to make the button shorter
          borderRadius: 10,
          marginTop: 0,
          marginLeft: 0,
        },
        rejectButton: {
          backgroundColor: "red",
          padding: 10, // Adjusted padding to make the button shorter
          borderRadius: 10,
          marginTop: 0,
          marginLeft: 0,
        },
      });
      