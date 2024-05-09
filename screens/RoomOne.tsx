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
    componentFive,
    componentSix,
    componentSeven,
    componentEight,
    editComponent,
  }: any = useRoomStore();
  const [deviceOne, setDeviceOne] = useState<Boolean>();
  const [deviceTwo, setDeviceTwo] = useState<Boolean>();
  const [deviceThree, setDeviceThree] = useState<Boolean>();
  const [deviceFour, setDeviceFour] = useState<Boolean>();
  const [deviceFive, setDeviceFive] = useState<Boolean>();
  const [deviceSix, setDeviceSix] = useState<Boolean>();
  const [deviceSeven, setDeviceSeven] = useState<Boolean>();
  const [deviceEight, setDeviceEight] = useState<Boolean>();
  const colorScheme = useColorScheme(); // 'light', 'dark', or null
  // const url = 'http://192.168.1.2:3000';
  const url = 'http://0.tcp.in.ngrok.io:15531';

  const [editDevice, setEditDevice] = useState(1);
  const handleEdit = (componentName: string, componentType: string) => {
    editComponent(editDevice, componentName, componentType);
    // console.log('handleEdit', {componentName: componentName});
    setModalVisible(false);
  };
  useEffect(() => {
    // Additional initialization or side effects based on colorScheme
    // console.log({componentTwo: componentTwo});
  }, [colorScheme, editDevice]);
  const handleButtonPress = async (deviceId: number) => {
    console.log({deviceId: deviceId});
    switch (deviceId) {
      case 1:
        try {
          let response: any;
          setDeviceOne(prev => !prev);
          if (deviceOne) {
            response = await axios.get(`${url}/relay1/off`);
            console.log('response sended');
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
          setDeviceTwo(prev => !prev);
          if (deviceTwo) {
            response = await axios.get(`${url}/relay2/off`);
            console.log('response sended relay2');

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
          setDeviceThree(prev => !prev);
          if (deviceThree) {
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
          setDeviceFour(prev => !prev);
          if (deviceFour) {
            response = await axios.get(`${url}/relay4/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay4/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
      case 5:
        try {
          let response: any;
          setDeviceFive(prev => !prev);
          if (deviceFive) {
            response = await axios.get(`${url}/relay5/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay5/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case 6:
        try {
          let response: any;
          setDeviceSix(prev => !prev);
          if (deviceSix) {
            response = await axios.get(`${url}/relay6/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay6/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
        break;
      case 7:
        try {
          let response: any;
          setDeviceSeven(prev => !prev);
          if (deviceSeven) {
            response = await axios.get(`${url}/relay7/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay7/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
      case 8:
        try {
          let response: any;
          setDeviceEight(prev => !prev);
          if (deviceEight) {
            response = await axios.get(`${url}/relay8/off`);
            // response = Request('/led/on');
          } else {
            response = await axios.get(`${url}/relay8/on`);
          }
          console.log(response.data);
        } catch (error: any) {
          console.log(error.message);
        }
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
      {/* <TouchableOpacity
        style={{backgroundColor: 'white'}}
        onPress={() => setModalVisible(true)}>
        <Text>Edit Component</Text>
      </TouchableOpacity> */}
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
            : editDevice == 5
            ? componentFive
            : editDevice == 6
            ? componentSix
            : editDevice == 7
            ? componentSeven
            : editDevice == 8
            ? componentEight
            : componentOne
        }
        onSave={handleEdit}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.button,
            deviceOne ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(1);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(1)}>
          {componentOne?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceOne ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceOne ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentOne.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceTwo ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(2);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(2)}>
          {componentTwo?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceTwo ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceTwo ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentTwo.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceThree ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(3);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(3)}>
          {componentThree?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceThree ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceThree ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentThree.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceFour ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(4);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(4)}>
          {componentFour?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceFour ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceFour ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentFour.name}</Text>
        </TouchableOpacity>

        {/* next four devices */}
        <TouchableOpacity
          style={[
            styles.button,
            deviceFive ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(5);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(5)}>
          {componentFive?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceFive ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceFive ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentFive.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceSix ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(6);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(6)}>
          {componentSix?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceSix ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceSix ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentSix.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceSeven ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(7);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(7)}>
          {componentSeven?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceSeven ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceSeven ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentSeven.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            deviceEight ? styles.buttonOn : styles.buttonOff,
          ]}
          onLongPress={() => {
            setEditDevice(8);
            setModalVisible(true);
          }}
          onPress={() => handleButtonPress(8)}>
          {componentEight?.type === 'light' ? (
            <Icon
              name="lightbulb-outline"
              size={24}
              color={deviceEight ? 'green' : 'red'}
            />
          ) : (
            <Icon2 name="fan" size={24} color={deviceEight ? 'green' : 'red'} />
          )}
          <Text style={styles.buttonText}>{componentEight.name}</Text>
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
    backgroundColor: '#009688',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ff00', // Neon color
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // For Android
  },
  buttonOn: {
    borderWidth: 5,
    borderColor: 'green',
    shadowColor: '#00ff00', // Neon color
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // For Android
  },
  buttonOff: {
    borderWidth: 5,
    // borderColor: 'red',
    // shadowColor: '#ff0000', // Neon color
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // For Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    textTransform: 'uppercase',
  },
});

export default ScreenOne;
