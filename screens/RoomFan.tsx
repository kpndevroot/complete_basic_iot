import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const RoomFan = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const formatSliderValue = (value: number) => {
    // Convert the numeric value to text as desired
    switch (value) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      case 3:
        return 'Very High';
      default:
        return '';
    }
  };

  const functionForStep = (value: number) => {
    // Array of functions corresponding to each step
    const functions = [
      functionForStep0,
      functionForStep1,
      functionForStep2,
      functionForStep3,
    ];

    // Call the appropriate function based on the slider value
    if (value >= 0 && value < functions.length) {
      functions[value]();
    }
  };

  const functionForStep0 = () => {
    // Function for step 0
    console.log('Function for step 0');
  };

  const functionForStep1 = () => {
    // Function for step 1
    console.log('Function for step 1');
  };

  const functionForStep2 = () => {
    // Function for step 2
    console.log('Function for step 2');
  };

  const functionForStep3 = () => {
    // Function for step 3
    console.log('Function for step 3');
  };

  return (
    <View style={styles.container}>
      <View style={styles.fanBox}>
        <Icon2 name="fan" size={100} color="white" />
      </View>
      <Text style={styles.sliderText}>{formatSliderValue(sliderValue)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3}
        value={sliderValue}
        onValueChange={value => {
          setSliderValue(value);
          functionForStep(value); // Call the appropriate function for the step
        }}
        minimumTrackTintColor="#009688"
        maximumTrackTintColor="#BDBDBD"
        thumbTintColor="#009688"
        step={1}
      />
    </View>
  );
};

export default RoomFan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fanBox: {
    width: 250,
    height: 250,
    backgroundColor: '#009688',
    borderRadius: 250 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009688',
  },
  slider: {
    width: 300,
    height: 40,
  },
});
