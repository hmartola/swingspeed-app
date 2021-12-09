import React, { useEffect } from "react"
import { Button, Text, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"

import { setLoggedOut } from "../components/loginContext"

const ProfileScreen = ({ navigation }) => {

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            //TODO call /token/logout
            await AsyncStorage.removeItem('token')
            setLoggedOut()
            navigation.navigate('Login')
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile</Text>
            <Button title='Sign out of account' onPress={() => signOut()}></Button>
        </View>
    )
}


export default ProfileScreen