import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IotLogo from '../iot.png';
import {Image} from 'react-native';
import display from '../utils/display';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={IotLogo} style={styles.image} />
      <Text style={styles.text}>⚡ SMART EEE ⚡</Text>
      <ActivityIndicator size="large" color="#009688" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#131313',
    width: display.setWidth(100),
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
