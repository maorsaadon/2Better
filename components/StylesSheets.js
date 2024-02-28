
import { StyleSheet, Dimensions } from "react-native";

const stylesProfile = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  buttonEditProfile: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 50, // Align to the bottom
    left: -30, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  buttonLogOut: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 50, // Align to the bottom
    left: 310, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  buttonDelete: {
    backgroundColor: "#8B1B1B",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 180,
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
    marginLeft: 35,
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
    top: 44,
    right: 15,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjust as needed
    top: 70,
    left: -10,
  },
  orText: {
    color: 'black',
    paddingHorizontal: 5, // Adjust as needed
    fontSize: 25,
    fontStyle: "italic",
  },
  line: {
    width: "100%",
    flex: 1,
    height: 2,
    backgroundColor: 'black',
    marginHorizontal: 5, // Adjust as needed to create space between the text and the lines
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Adjust the value as needed
  },
});
const stylesAboutUs = StyleSheet.create({
  containerScroll: {
    flexDirection: "row",
    alignItems: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 100,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    bottom: 80,
  },
  container2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    bottom: 80,
    left: 20,
  },
  container3: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 110,
    bottom: 80,
    left: 10,
  },
  containerEnd: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    bottom: 80,
    left: 40,
  },
  defualtTopTextEdit: {
    color: "black",
    fontWeight: "600",
    fontStyle: "italic",
    fontSize: 22,
    right: 65,
    bottom: 90,
  },
  defualtTopTextEdit3: {
    color: "black",
    fontWeight: "600",
    fontStyle: "italic",
    fontSize: 22,
    right: 15,
    bottom: 90,
  },
  topTextEdit: {
    color: "black",
    fontWeight: "700",
    fontSize: 40,
    right: 70,
    bottom: 10,
  },
  defualtTextEdit: {
    color: "black",
    fontSize: 16,
    marginLeft: 40,
    marginBottom: 140,
  },
  defualtTextEdit1: {
    color: "black",
    fontSize: 16,
    marginLeft: 30,
    marginTop: -80,
  },
  defualtTextEdit2: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    marginTop: -80,
  },
  defualtTextEdit3: {
    color: "black",
    fontSize: 16,
    marginLeft: 30,
    marginTop: -80,
  },
  endTextEdit: {
    color: "black",
    fontSize: 17,
    fontWeight: "600",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 30,
    left: -18,
    marginBottom: 10,
    marginLeft: 10,
  },
});

const stylesSupport = StyleSheet.create({
  container: {
    top: 80,
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    left: 100,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    left: 40,
    bottom: 10,
  },
  subTitleEnd: {
    top: 60,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    left: 50,
    bottom: 100,

  },
  contactItemEnd: {
    left: 75,
    top: 70,
    fontSize: 16,
    marginBottom: 8,
    color: '#404040',
    marginBottom: 80,
  },
  contactItem: {
    left: 60,
    fontSize: 16,
    marginBottom: 8,
    color: '#404040',
  },
  textEnd: {
    left: 75,
    fontSize: 16,
    marginBottom: 15,
    color: '#404040',
  },
  editURL: {
    left: 60,
    fontSize: 16,
    marginBottom: 8,
    color: '#0F376D',
  },
  editURLEnd: {
    left: 75,
    fontSize: 16,
    marginBottom: 8,
    color: '#0F376D',
  },
  subEnd: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 50,
    marginBottom: 15,
  },
  rightsEnd: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 180,
    marginBottom: 100,
    marginTop: 20,
  },
  link: {
    color: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    top: 30,
    left: -18,
    marginBottom: 10,
    marginLeft: 10,
  },

});

const stylesHome = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -250,
    marginBottom: -20,
  },
  containerTextSupport: {
    flexDirection: "row",
    marginTop: 100,
    marginBottom: 30,
    marginLeft: -50,
  },
  containerTextUS: {
    flexDirection: "row",
    marginTop: -10,
    marginBottom: 30,
    marginLeft: -50,
  },
  containerScrollers: {
    marginTop: 80,
  },
  containerIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -100,
  },
  notificationBotton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    borderRadius: 50,
  },
  profileButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 280,
    marginTop: 0,
    marginLeft: 280,
    borderRadius: 50,
  },
  badge: {
    position: "absolute",
    top: 20,
    right: -10,
    backgroundColor: "#8B1B1B",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    //justifyContent: "flex-start", // Align items at the top
    alignItems: "center",
    paddingTop: 30, // Add padding to give some space at the top
    flexDirection: "row",
    gap: 35,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    width: "20%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute", // Use absolute positioning
    top: 0, // Align to the bottom
    left: -18, // Align to the left
    marginBottom: 10, // Optional margin to add some space from the bottom
    marginLeft: 10, // Optional margin to add some space from the left
  },
  backButtonText: {
    alignSelf: "center",
    color: "white",
  },
  card: {
    width: "100%",
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
    width: 240,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  iconText: {
    fontWeight: "bold",
    fontSize: 20, // Adjust the font size as needed
  },
  logo: {
    width: 70, // Adjust the width as needed
    height: 70, // Adjust the height as needed
    resizeMode: "contain", // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
  },
  buttonTextPage: {
    alignSelf: "center",
    color: "black",
    fontSize: 20,
    marginLeft: 25,
    marginTop: 300,
    fontStyle: "italic",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  buttomTextPage: {
    alignSelf: "center",
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    letterSpacing: 1,
    marginLeft: 100,
  },
});

const screenWidth = Dimensions.get("window").width;
const stylesHomeCard = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    backgroundColor: "#E9F1E9", // Assuming a white card background
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
    //opacity: 0.7, 
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
    gap: 15,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    backgroundColor: "#366A68",
    width: 120,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    minimumTrackTintColor: "black",
    maximumTrackTintColor: "#C0C0C0", // Color for the remaining track
    thumbTintColor: "white",
  },
  participantText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    // Add margin to the left or right to space the text from the slider
    marginHorizontal: 5,
  },
});

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    left: 10,
  },
  inputContainer: {
    width: "80%",

  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 5,
    zIndex: 1,
  },
  checkShowIcon: {
    position: 'absolute',
    right: 5,
    bottom: -18,
    zIndex: 1,
  },
  input: {
    width: '100%',
    backgroundColor: "white",
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#366A68",
    textAlign: "left",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#366A68",
    width: "100%", // This will make the button fill the container
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 30,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#366A68",
    borderWidth: 2,
    width: "100%", // This ensures the outlined button also fills the container
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },

  backgroundImage: {
    width: "103%",
    height: "101%",
    justifyContent: "center",
    right: 16,

  },
  buttonEdit: {
    position: 'absolute',
    top: 95,
    left: 35,
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonTextEdit: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
    right: 30,
  },
  endTextEdit: {
    color: "#737373",
    fontWeight: "700",
    fontSize: 16,
    top: 110,
    right: 50,

  },
});

const stylesRegister = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "105%",
    top: -30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    gap: 4,
    top: 45,
  },
  input: {
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 35,
    paddingVertical: 5,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    minWidth: "80%",
    color: "#A9A9A9",
    fontSize: 16,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#C3D4D3",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 5,

  },
  icon: {
    position: "absolute",
    left: 5,
    zIndex: 3,
  },
  iconCity: {
    position: "absolute",
    left: -25,
    top: 20,
    zIndex: 3,
  },
  checkIcon: {
    position: "absolute",
    right: 15,
    bottom: 13,
    zIndex: 1,
  },
  checkShowIcon: {
    position: "absolute",
    right: -1,
    bottom: -14,
    zIndex: 1,
  },
  buttonRegister: {
    top: 10,
    backgroundColor: "#366A68",
    width: "100%",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonTextRegister: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonSignIn: {
    position: "absolute",
    left: 25,
    width: "30%",
    padding: 15,
    top: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTextSignIn: {
    color: "#366A68",
    fontWeight: "700",
    fontSize: 16,
  },
  dropContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "70%",
  },
  dropdownStyle: {
    backgroundColor: "#C3D4D3",
    borderColor: "#C3D4D3",
    borderRadius: 10,
    alignSelf: "flex-end",
    zIndex: 1,
    marginTop: 15,
    width: '125%',
    left: 35,
  },
  dropdownItemStyle: {
    justifyContent: "flex-start",
    textAlign: "left",

  },
  dropdownListStyle: {
    borderColor: "#C3D4D3",
    borderWidth: 3,

  },
  placeHolderStyle: {
    color: "#545454",
    textAlign: "left",
    left: 40,
    backgroundColor: "#C3D4D3",
    fontSize: 16,
    zIndex: 1,
    maxWidth: 80,
  },
  endTextEdit: {
    color: "#737373",
    fontWeight: "700",
    fontSize: 16,
    top: 30,
    right: 50,

  },
});

const navigationButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  appName: {
    paddingLeft: 10,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "#366A68",
    paddingVertical: 10,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    top: 3,
  },
  buttonText: {
    color: 'white',
    paddingRight: 10,
  },
});

export const UpcomingStyles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    backgroundColor: "#E9F1E9", // Assuming a white card background
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
    //opacity: 0.7, 
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
    gap: 15,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    backgroundColor: "#366A68",
    width: 110,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
    top: 5,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
    width: 100,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    minimumTrackTintColor: "black",
    maximumTrackTintColor: "#C0C0C0", // Color for the remaining track
    thumbTintColor: "white",
  },
  participantText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    // Add margin to the left or right to space the text from the slider
    marginHorizontal: 5,
  },
  chatButton: {
    backgroundColor: "#366A68",
    paddingVertical: 10,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    top: 5,
  }
});

const ResultStyles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: "#5B8BDF",
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 30,
    gap: 15,
    flex: 1,
  },
  card: {
    width: screenWidth - 32,
    marginTop: -30,
    backgroundColor: 'rgba(233, 241, 233, 0.7)',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderWidth: 1,
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
    gap: 15,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    backgroundColor: "#366A68",
    width: 120,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    minimumTrackTintColor: "black",
    maximumTrackTintColor: "#C0C0C0", // Color for the remaining track
    thumbTintColor: "white",
  },
  participantText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    // Add margin to the left or right to space the text from the slider
    marginHorizontal: 5,
  },
});


const ManagerMeetingCardStyles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
    backgroundColor: "#E9F1E9", // Assuming a white card background
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
    //opacity: 0.7, 
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
    gap: 15,
    alignItems: "center",
  },
  iconAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
    backgroundColor: "#325E54",
    width: 110,
    paddingVertical: 10,
    borderRadius: 10,
    opacity: 1,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  deleteButton: {
    // Move delete button to the top right corner
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    minimumTrackTintColor: "black",
    maximumTrackTintColor: "#C0C0C0", // Color for the remaining track
    thumbTintColor: "white",
  },
  participantText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    // Add margin to the left or right to space the text from the slider
    marginHorizontal: 5,
  },
  //   deleteButton: {
  //     backgroundColor: "#8B1B1B",
  //     width: 150,
  //     height: 50,
  //     padding: 15,
  //     borderRadius: 20,
  //   },
});



const NotificationCardStyles = StyleSheet.create({
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
  acceptText: {
    color: "green",
    fontSize: 18,
    alignSelf: "flex-start",
  },
  rejectText: {
    color: "red",
    fontSize: 18,
    alignSelf: "flex-start",
  },
});


const ManagerGroupCardStyles = StyleSheet.create({
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    marginTop: 10,
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
    backgroundColor: "#E9F1E9", // Assuming a white card background
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
  },
  cardTopRow: {
    marginTop: 0, 
    marginLeft: 0, 
    alignSelf: "flex-start", 
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
    width: 30, 
    height: 30, 
    resizeMode: "contain",
    marginRight: 10, 
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
    backgroundColor: "#325E54",
    padding: 10, 
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  deleteButton: {
    backgroundColor: "#460811",
    padding: 10, 
    borderRadius: 10,
    marginTop: 0,
    width: 70,
    marginLeft: 0,
  },
  editButton: {
    backgroundColor: "#325E54",
    padding: 10,
    borderRadius: 10,
    marginTop: 0,
    width: 80,
    marginLeft: 0,
  },
});


const DatePickerWithTimeStyles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center" 
  },
datePickerContainer: {
  marginup: 30, // Adjust this value as needed for the desired spacing
},
inputContainer: {
      width: "80%",
},
input: {
  backgroundColor: "white",
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 5,
  borderColor: "#0782F9",
  borderWidth: 2,
},
buttonContainer: {
  width: "60%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 60,
},

button: {
  backgroundColor: "rgba(233, 241, 233, 0.7)",
  width: '80%',
  height: 50,
  borderRadius: 20,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  borderWidth: 2,
  borderColor: "#366A68",
  top: 15,
},

});




export {
  stylesProfile, stylesAboutUs, stylesHome,
  stylesHomeCard, stylesLogin, stylesRegister,
  stylesSupport, navigationButtonStyles,
  ResultStyles, ManagerMeetingCardStyles, NotificationCardStyles,
  ManagerGroupCardStyles, DatePickerWithTimeStyles, 
}
