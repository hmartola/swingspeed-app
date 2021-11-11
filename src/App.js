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
import React from 'react';
import { View, Text } from 'react-native'

import MainMenu from './navigation/mainMenu';

const App = () => {
    return (
    
        <NavigationContainer>
            <MainMenu />
        </NavigationContainer>


    )
}


export default App;
