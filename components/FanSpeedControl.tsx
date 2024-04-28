import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Knob from './Knob';

const FanSpeedController: React.FC = () => {
  const [speed, setSpeed] = useState<number>(0);

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.speedText}>Speed: {speed}</Text>
      <Knob value={speed} onValueChange={handleSpeedChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default FanSpeedController;
