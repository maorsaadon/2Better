import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
  ActionSheetIOS,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { navigationButtonStyles } from "./StylesSheets";
const NavigationButton = ({ destination }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const NameToIcon = {
    Waze: <FontAwesome5 name="waze" size={24} color="black" />,
    "Google Maps": (
      <MaterialCommunityIcons name="google-maps" size={24} color="black" />
    ),
    Moovit: (
      <MaterialCommunityIcons
        name="map-marker-account"
        size={24}
        color="black"
      />
    ),
  };

  const NameToURL = {
    Waze: `https://www.waze.com/ul?q=${encodeURIComponent(destination)}`,
    "Google Maps":
      Platform.OS === "ios"
        ? `http://maps.apple.com/?q=${encodeURIComponent(destination)}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`,
    Moovit: `moovit://directions?dest_lat=0&dest_lon=0&dest_name=${encodeURIComponent(destination)}`,
  };

  const openNavigationApp = (app) => {
    const url = NameToURL[app];
    console.log(url);
    Linking.openURL(url).catch((err) =>
      console.error("Error opening Waze:", err)
    );
  };

  const openAppChooser = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Waze", "Google Maps", "Moovit"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            openNavigationApp("Waze");
          } else if (buttonIndex === 2) {
            openNavigationApp("Google Maps");
          } else if (buttonIndex === 3) {
            openNavigationApp("Moovit");
          }
        }
      );
    } else {
      setModalVisible(true);
    }
  };

  const closeAppChooser = () => setModalVisible(false);

  const renderAndroidModal = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={closeAppChooser}
    >
      <View style={navigationButtonStyles.container}>
        <View style={navigationButtonStyles.modal}>
          {Object.keys(NameToIcon).map((key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                closeAppChooser();
                openNavigationApp(key);
              }}
            >
              <View style={navigationButtonStyles.appRow}>
                {NameToIcon[key]}
                <Text style={navigationButtonStyles.appName}>{key}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <TouchableOpacity onPress={openAppChooser}>
      <View style={navigationButtonStyles.button}>
        <MaterialCommunityIcons
          name="map-marker-outline"
          size={24}
          color="white"
        />
      </View>
      {Platform.OS === "android" && renderAndroidModal()}
    </TouchableOpacity>
  );
};

export default NavigationButton;
