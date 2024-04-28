import axios from 'axios';
import React, {useState, useEffect} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Request} from './utils/agent';
// import display from './utils/display';
import {Request} from '../utils/agent';
import display from '../utils/display';
interface AppProps {}
import useRoomStore, {RoomState} from '../store/RoomOneStore';
import EditComponentModal from './EditComponentModal';

const ScreenOne: React.FC<AppProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    componentOne,
    componentTwo,
    componentThree,
    componentFour,
    editComponent,
  }: any = useRoomStore();
  const [deviceOne, setDeviceOne] = useState<Boolean>(false);
  const colorScheme = useColorScheme(); // 'light', 'dark', or null
  const url = 'http://192.168.1.2:3000';
  const [editDevice, setEditDevice] = useState(1);
  const handleEdit = (componentName: string, componentType: string) => {
    editComponent(editDevice, componentName, componentType);
    console.log('handleEdit', {componentName: componentName});
    setModalVisible(false);
  };
  useEffect(() => {
    // Additional initialization or side effects based on colorScheme
  }, [colorScheme, editDevice]);
  const handleButtonPress = async (deviceId: number) => {
    switch (deviceId) {
      case 1:
        try {
          let response: any;
          setDeviceOne(prev => !prev);
          if (deviceOne) {
            response = await axios.get(`${url}/relay1/off`);
            console.log('response sented');
            if (response) {
              console.log('Relay 1 is off');
            }
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay1/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case 2:
        try {
          let response: any;
          setDeviceOne(prev => !prev);
          if (deviceOne) {
            response = await axios.get(`${url}/relay2/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay2/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case 3:
        try {
          let response: any;
          setDeviceOne(prev => !prev);
          if (deviceOne) {
            response = await axios.get(`${url}/relay3/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay3/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case 4:
        try {
          let response: any;
          setDeviceOne(prev => !prev);
          if (deviceOne) {
            response = await axios.get(`${url}/relay4/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay4/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      default:
        break;
    }
    // Implement the logic to control the IoT device with the given deviceId
    console.log(`Button ${deviceId} pressed`);
    // Add your IoT control logic here
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colorScheme === 'dark' ? '#131313' : '#131313'} // Dark mode: black, Light mode: white
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} // Dark mode: light text, Light mode: dark text
      />
      <TouchableOpacity
        style={{backgroundColor: 'white'}}
        onPress={() => setModalVisible(true)}>
        <Text>Edit Component</Text>
      </TouchableOpacity>
      <EditComponentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        component={
          editDevice == 1
            ? componentOne
            : editDevice == 2
            ? componentTwo
            : editDevice == 3
            ? componentThree
            : editDevice == 4
            ? componentFour
            : componentOne
        }
        onSave={handleEdit}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onLongPress={() => {
            setEditDevice(1);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(1)}>
          <Icon name="lightbulb-outline" size={24} color="black" />
          <Text style={styles.buttonText}>{componentOne.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onLongPress={() => {
            setEditDevice(2);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(2)}>
          <Icon name="lightbulb-outline" size={24} color="black" />
          <Text style={styles.buttonText}>{componentTwo.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onLongPress={() => {
            setEditDevice(3);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(3)}>
          <Icon2 name="fan" size={24} color="black" />
          <Text style={styles.buttonText}>{componentThree.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onLongPress={() => {
            setEditDevice(4);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(4)}>
          <Icon2 name="fan" size={24} color="black" />
          <Text style={styles.buttonText}>{componentFour.name}</Text>
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
    backgroundColor: '#131313',
    width: display.setWidth(100),
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
    width: display.setWidth(95),
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    width: 160, // Set a fixed width for the round button
    height: 160, // Set a fixed height for the round button
    borderRadius: 160 / 2, // Make the button round
    backgroundColor: '#f1f1f1',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    textTransform: 'uppercase',
  },
});

export default ScreenOne;
