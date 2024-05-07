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
    } else {
      setSpeed(0);
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
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSpeedChange(speed - 1)}>
          <Text style={styles.buttonText}>-</Text>
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

    color: '#fff',
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
    color: '#fff',
  },
  speedPercentage: {
    fontSize: 24,
  },
  knobContainer: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'lightblue',
    borderColor: '#fff',
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
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,

    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '800',
  },
});

export default RegularSpeed;
