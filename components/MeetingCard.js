import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MeetingCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.businessLogo} />
        <View>
          <Text style={styles.title}>{group}</Text>
          <Text style={styles.subTitle}>{group.sportType}</Text>
        </View>
      </View>
      <View style={styles.cardMiddleRow}>
        <View style={styles.iconAndTextContainer}>
          <FontAwesome name="calendar" size={22} color="black" />
          <Text>{group.participants.toLocaleDateString("he-IL")}</Text>
        </View>
        <View style={styles.iconAndTextContainer}>
          <MaterialCommunityIcons name="currency-ils" size={22} color="black" />
          <Text>{group.leaderEmail}</Text>
        </View>
        <View style={styles.iconAndTextContainer}>
          <AntDesign name="clockcircleo" size={22} color="black" />
          <Text>{`${appointment.startTime} - ${appointment.endTime}`}</Text>
        </View>
      </View>
      <View style={styles.cardMiddleRow}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Navigate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MeetingCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5B8BDF",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 20,
    gap: 15,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255 , 0.4)",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "column",
    gap: 10,
  },
  cardTopRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  cardMiddleRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  businessLogo: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 50,
    borderRadius: 15,
  },
  title: {
    fontWeight: "800",
    alignSelf: "flex-start",
  },
  subTitle: {
    opacity: 0.6,
    alignSelf: "flex-start",
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
});
