
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginLeft: 20,
  },
  buttonLogOut: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 50, // Align to the bottom
    left: 300, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  buttonDelete: {
    backgroundColor: "#990000",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextEdit: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  label: {
    backgroundColor: "#366A68",
    color: "black",
    fontSize: 18,
    padding: 5,
    borderRadius: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  valueName: {
    fontWeight: "bold",
    fontSize: 16,
    flexDirection: "row",
    fontSize: 28,
    marginLeft: 4,
  },
  valueNew: {
    fontSize: 16,
    flexDirection: "row",
    fontSize: 22,
    marginLeft: 4,
  },
  buttonEdit: {
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 50,
  }
});

export {styles}
// const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         },
//         inputContainer: {
//           width: "60%",
//         },
//         input: {
//           backgroundColor: "white",
//           paddingHorizontal: 15,
//           paddingVertical: 10,
//           borderRadius: 10,
//           marginTop: 5,
//           borderWidth: 2,
//           borderColor: "#366A68",
//         },
//         buttonContainer: {
//           width: "60%",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop: 40,
//         },
//         button: {
//           backgroundColor: "#366A68",
//           width: "100%", // This will make the button fill the container
//           padding: 15,
//           borderRadius: 10,
//           alignItems: "center",
//         },
//         buttonOutline: {
//           backgroundColor: "white",
//           marginTop: 5,
//           borderColor: "#366A68",
//           borderWidth: 2,
//           width: "100%", // This ensures the outlined button also fills the container
//         },
//         buttonText: {
//           color: "white",
//           fontWeight: "700",
//           fontSize: 16,
//         },
//         buttonOutlineText: {
//           color: "#366A68",
//           fontWeight: "700",
//           fontSize: 16,
//         },
//         //###############################
//         backgroundImage: {
//           flex: 1,
//           width: "100%",
//           height: "100%",
//           justifyContent: "center",
//         },
//         //###############################
//       });


// const stylesHome = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "60%",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
// });

// export { stylesHome , styles};