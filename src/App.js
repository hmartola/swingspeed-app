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
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainMenu from './navigation/mainMenu';
import LoginScreen from './screens/login';
import CreateAccountScreen from './screens/createAccount';
import SettingsScreen from './screens/settings';
import { LoginContext } from './contexts/loginContext';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        (async () =>  {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            } 
        })()
    }, [])
    
    const Stack = createNativeStackNavigator()

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                    {isLoggedIn ? (
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='Main Menu' component={MainMenu} />
                            <Stack.Screen name='Settings' component={SettingsScreen} />
                        </Stack.Navigator>
                    ) : (
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='Login' component={LoginScreen} />
                            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
                        </Stack.Navigator>
                    )}
                </LoginContext.Provider>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}


export default App;
