// LoadingScreen.tsx
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Modal} from 'react-native';

interface LoadingScreenProps {
  visible: boolean;
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({visible, message}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#009688" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default LoadingScreen;
