// import { Pressable, Text, View } from "react-native";
// import { StyleSheet } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const MeetingCard = ({ data }) => {
//   return (
//     <View style={styles.card}>
//       <View style={styles.cardTopRow}>
//         <View style={styles.businessLogo} />
//         <View>
//           <Text style={styles.title}>{data.GroupName}</Text>
//           <Text style={styles.subTitle}>{data.SportType}</Text>
//         </View>
//       </View>
//       <View style={styles.cardMiddleRow}>
//         <View style={styles.iconAndTextContainer}>
//           <FontAwesome name="calendar" size={22} color="black" />
//           {/* Assuming you want to display the city here */}
//           <Text>{data.City}</Text>
//         </View>
//         <View style={styles.iconAndTextContainer}>
//           <MaterialCommunityIcons name="email" size={22} color="black" />
//           <Text>{data.LeaderEmail}</Text>
//         </View>
//         <View style={styles.iconAndTextContainer}>
//           <AntDesign name="user" size={22} color="black" />
//           {/* Display participants detail */}
//           <Text>{`Participants: ${data.Participants}`}</Text>
//         </View>
//       </View>
//       <View style={styles.cardBottomRow}>
//         <Pressable style={styles.button}>
//           <Text style={styles.buttonText}>Edit</Text>
//         </Pressable>
//         <Pressable style={styles.button}>
//           <Text style={styles.buttonText}>Navigate</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default MeetingCard;

// const styles = StyleSheet.create({
//   cardBottomRow: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//     justifyContent: "space-around", // Updated for better spacing
//   },
//   container: {
//     backgroundColor: "#5B8BDF",
//     alignItems: "center",
//     paddingBottom: 40,
//     paddingTop: 20,
//     gap: 15,
//   },
//   card: {
//     width: "90%",
//     backgroundColor: "rgba(255, 255, 255 , 0.4)",
//     borderRadius: 20,
//     paddingVertical: 20,
//     paddingHorizontal: 30,
//     flexDirection: "column",
//     gap: 10,
//   },
//   cardTopRow: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },
//   cardMiddleRow: {
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   iconAndTextContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   businessLogo: {
//     height: 50,
//     backgroundColor: "rgba(255, 255, 255, 0.3)",
//     width: 50,
//     borderRadius: 15,
//   },
//   title: {
//     fontWeight: "800",
//     alignSelf: "flex-start",
//   },
//   subTitle: {
//     opacity: 0.6,
//     alignSelf: "flex-start",
//   },
//   button: {
//     backgroundColor: "#3B82F6",
//     width: 120,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     alignSelf: "center",
//     color: "white",
//   },
// });

import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const MeetingCard = ({ group }) => {
    const groupName = group?.GroupName ?? 'Default Name';
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.businessLogo} />
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
          <Text>{`Participants: ${group.Participants}`}</Text>
        </View>
      </View>
      <View style={styles.cardBottomRow}>
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
  cardBottomRow: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#5B8BDF",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 20,
    gap: 15,
  },
  card: {
    width: "90%",
    // backgroundColor: "rgba(255, 255, 255 , 0.4)",
    backgroundColor: "white",
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
