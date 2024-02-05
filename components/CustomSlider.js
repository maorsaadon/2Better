import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

const CustomSlider = ({ minimumValue, maximumValue, value }) => {
  const trackWidth = (value / maximumValue) * 100;

  return (
    <View style={styles.slider}>
      <View style={[styles.sliderTrack, { width: `${trackWidth}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 10, // Set the height of the line
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#C0C0C0", // Set the background color to black
    borderRadius: 5, // Optional: Add a slight border radius for visual appeal
  },
  sliderTrack: {
    backgroundColor: "black",
    height: 10,
    borderRadius: 5,
    position: "absolute",
    left: 0,
    right: 0,
    width: "50%", // Adjust the width as needed
    top: 0, // Adjust the top position to align with the thumb
  },
  sliderThumb: {
    position: "absolute",
    width: 30,
    height: 10,
    borderRadius: 10,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    right: 0, // Position the thumb at the end of the track
  },
});

export default CustomSlider;
