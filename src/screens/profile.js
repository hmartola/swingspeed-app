import React, { useContext } from "react"
import { Button, Image, Text, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from 'react-native-vector-icons/Ionicons'

import userService from '../service/users'
import { LoginContext } from "../contexts/loginContext"

const ProfileScreen = ({ navigation }) => {

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

    const signOut = async () => {
        try {
            await userService.logoutUser()
        }
        catch(error) {
            console.log(error)
        }

        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        setIsLoggedIn(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', marginTop: 30 }}>
            <Ionicons name='md-settings-outline' 
                      size={35} 
                      onPress={() => navigation.navigate('Settings')}
                      style={{ alignSelf: 'flex-end', marginRight: 15 }}/>
            <Image source={require('../assets/Robert.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
            
            <View style={{ alignItems: 'center', padding: 15 }}>
                <Button title='Sign out of account' onPress={() => signOut()}></Button>
            </View>
        </View>
    )
}


export default ProfileScreen