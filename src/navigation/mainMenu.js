import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import MainScreen from '../screens/main';
import CameraScreen from '../screens/camera';
import StatsScreen from '../screens/stats';
import ProfileScreen from '../screens/profile';


const Tab = createBottomTabNavigator();

const MainMenu = () => {
  return (
    <Tab.Navigator
        initialRouteName='Main'
        screenOptions={{
            tabBarActiveTintColor: 'green',
            tabBarShowLabel: false,
        }}>
      <Tab.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ 
            tabBarIcon: ({ color }) => (
                <Ionicons name='md-home-outline' color={color} size={27} />
            ),
            headerShown: false, 
        }} />
      <Tab.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{  
            tabBarIcon: ({ color }) => (
                <Ionicons name='md-videocam-outline' color={color} size={27} />
            ),
            headerShown: false, 
        }}/>
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen} 
        options={{  
            tabBarIcon: ({ color }) => (
                <Ionicons name='md-stats-chart-outline' color={color} size={27} />
            ), 
            headerShown: false,
        }}/>
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{  
            tabBarIcon: ({ color }) => (
                <Ionicons name='md-person-outline' color={color} size={27} />
            ), 
            headerShown: false,
        }}/>
    </Tab.Navigator>
  );
}

export default MainMenu