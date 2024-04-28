import React from 'react';
import {View, StyleSheet, PanResponder} from 'react-native';

interface KnobProps {
  value: number;
  onValueChange: (newValue: number) => void;
}

const Knob: React.FC<KnobProps> = ({value, onValueChange}) => {
  const handlePanResponderMove = (evt: any, gestureState: any) => {
    const {moveX, moveY} = gestureState;
    const {width, height} = styles.knobContainer;
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = moveX - centerX;
    const dy = moveY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    let newValue = Math.round(angle / 60); // Dividing the circle into 6 equal parts

    if (newValue < 0) newValue += 6; // Ensure positive value
    if (newValue > 5) newValue = 5; // Cap the value to 5 (maximum)

    onValueChange(newValue);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  const knobStyle = {
    transform: [{rotate: `${value * 60}deg`}],
  };

  const lineStyle = {
    left: `${50 + 40 * Math.sin((value * 60 * Math.PI) / 180)}%`,
    top: `${50 - 40 * Math.cos((value * 60 * Math.PI) / 180)}%`,
  };

  return (
    <View style={styles.knobContainer} {...panResponder.panHandlers}>
      <View style={[styles.startingLine, lineStyle]} />
      <View style={[styles.knob, knobStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  knobContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startingLine: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: 'red',
    zIndex: 2,
  },
  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#666',
  },
});

export default Knob;
