import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
// import {FontAwesome} from '@expo/vector-icons'; // Import FontAwesome icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const RegularSpeed: React.FC = () => {
  const [speed, setSpeed] = useState<number>(0); // Initial speed
  const knobRef = useRef<View>(null);

  const increaseSpeed = () => {
    const newSpeed = speed < 3 ? speed + 1 : 3;
    setSpeed(newSpeed);
  };

  const decreaseSpeed = () => {
    const newSpeed = speed > 0 ? speed - 1 : 0;
    setSpeed(newSpeed);
  };

  // Calculate speed percentage
  const speedPercentage = Math.floor((speed / 3) * 100);
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (newSpeed === 1) {
      // Call function for speed 1
      functionForSpeed1();
    } else if (newSpeed === 2) {
      // Call function for speed 2
      functionForSpeed2();
    } else if (newSpeed === 3) {
      // Call function for speed 3
      functionForSpeed3();
    }
  };

  const functionForSpeed1 = () => {
    console.log('Function for speed 1 called');
    // Do something for speed 1
  };

  const functionForSpeed2 = () => {
    console.log('Function for speed 2 called');
    // Do something for speed 2
  };

  const functionForSpeed3 = () => {
    console.log('Function for speed 3 called');
    // Do something for speed 3
  };
  return (
    <View style={styles.container}>
      <Text style={styles.speedText}>Fan Speed</Text>
      <View style={styles.speedContainer}>
        <Text style={styles.speedNumber}>{speed}</Text>
        {/* <Text style={styles.speedPercentage}>{speedPercentage}%</Text> */}
      </View>
      <View style={styles.knobContainer}>
        <View style={styles.knob}>
          <MaterialCommunityIcons name="fan" size={60} color="white" />
          <Text style={styles.speedNumber}>{speedPercentage}%</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSpeedChange(speed + 1)}>
          <Text style={styles.buttonText}>Increase Speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSpeedChange(speed - 1)}>
          <Text style={styles.buttonText}>Decrease Speed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedText: {
    fontSize: 20,
    marginBottom: 5,
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  speedNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
  speedPercentage: {
    fontSize: 24,
  },
  knobContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'lightblue',
  },
  knob: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default RegularSpeed;
