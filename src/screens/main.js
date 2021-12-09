import React from "react"
import { Button, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUser } from '../components/user'

const MainScreen = ({ navigation }) => {
    

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={{ padding: 15 }}>
                <Text style={{ fontSize: 40, color: 'darkgreen' }}>Velofore</Text>
            </Text>

            <Text style={{ fontSize: 20, marginTop: 40, textAlign: 'center' }}>Start a new session?</Text>
            
            <View style={{ alignItems: 'center', padding: 15 }}>
                <Button onPress={() => navigation.navigate('Camera')} // open camera
                        title='start swinging' 
                        color='darkgreen'>
                </Button>
            </View>
        </View>
    )
}

export default MainScreen