/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// 1. npx react-native start
// 2. npx react-native run-android --no-jetifier

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainMenu from './navigation/mainMenu';
import LoginScreen from './screens/login';
import CreateAccountScreen from './screens/createAccount';
//import { getLogin } from './components/loginContext'

const App = () => {

    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        (async () =>  {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                setUserLoggedIn(true)
                console.log(value, 'via useffect')
            } else {
                setUserLoggedIn(false)
                console.log(value, 'via useffect')
            } 
        })()
    })
    
    const Stack = createNativeStackNavigator()
    //console.log('Logged in? ' + getLogin())

    if (userLoggedIn) {
        console.log('user is logged in')
        return (
            <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Main Menu' component={MainMenu}></Stack.Screen>
                        <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
                        <Stack.Screen name='CreateAccount' component={CreateAccountScreen}></Stack.Screen> 
                    </Stack.Navigator>
                </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
                    <Stack.Screen name='CreateAccount' component={CreateAccountScreen}></Stack.Screen>
                    <Stack.Screen name='Main Menu' component={MainMenu}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
    )
    
}


export default App;
