import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import { MaterialCommunityIcons } from '@expo/vector-icons';{}
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenOne from './screens/RoomOne';
import FanSpeedControl from './components/FanSpeedControl';
import RegularSpeed from './components/RegularSpeed';
import Slider from '@react-native-community/slider';
import RoomFan from './screens/RoomFan';

function Notifications() {
  const [sliderValue, setSliderValue] = React.useState(0);

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#000',
      }}>
      <Text style={{marginBottom: 10}}>{formatSliderValue(sliderValue)}</Text>
      <Slider
        style={{width: 200, height: 50}}
        minimumValue={0}
        maximumValue={3}
        value={sliderValue}
        onValueChange={value => setSliderValue(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={1}
      />
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      style={{backgroundColor: 'tomato'}}>
      <Tab.Screen
        name="Feed"
        component={ScreenOne}
        options={{
          tabBarLabel: 'ROOM 1',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={RoomFan}
        options={{
          tabBarLabel: 'ROOM 2',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
