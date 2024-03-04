import { View, StyleSheet} from "react-native";

const CustomSlider = ({maximumValue, value }) => {
  const trackWidth = (value / maximumValue) * 100;

  return (
    <View style={styles.slider}>
      <View style={[styles.sliderTrack, { width: `${trackWidth}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 10, 
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#C0C0C0", 
    borderRadius: 5, 
  },
  sliderTrack: {
    backgroundColor: "black",
    height: 10,
    borderRadius: 5,
    position: "absolute",
    left: 0,
    right: 0,
    width: "50%", 
    top: 0,
  },
  sliderThumb: {
    position: "absolute",
    width: 30,
    height: 10,
    borderRadius: 10,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    right: 0, 
  },
});

export default CustomSlider;
