import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenOne from './screens/RoomOne';
import RoomFan from './screens/RoomFan';
import SplashScreen from './screens/SplashScreen';
const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#009688"
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
    </Tab.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the timeout as needed
  }, []);

  return (
    <NavigationContainer>
      {loading ? <SplashScreen /> : <MyTabs />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
