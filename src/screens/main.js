import React from "react"
import { Button, Text, View } from 'react-native'

const MainScreen = () => {
    const user = 'John Doe'
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text style={{ padding: 15 }}>
                <Text style={{ fontSize: 40, color: 'darkgreen' }}>Welcome, </Text>
                <Text style={{ fontSize: 40 }}>{user}</Text>
            </Text>

            <Text style={{ fontSize: 20, marginTop: 40, textAlign: 'center' }}>Start a new session?</Text>
            
            <View style={{ alignItems: 'center', padding: 15 }}>
                <Button onPress={() => console.log('swingety swungity')} // open camera
                        title='start swinging' 
                        color='darkgreen'>
                </Button>
            </View>
        </View>
    )
}

export default MainScreen