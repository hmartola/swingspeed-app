import React, { useContext, useEffect, useState } from "react"
import { Image, Text, View, useWindowDimensions } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from "react-native-elements"

import userService from '../service/users'
import { LoginContext } from "../contexts/loginContext"
import { getUser } from "../components/user"

const ProfileScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

    const { height, width } = useWindowDimensions()

    useEffect(() => {
        (async () => {
          const name = await getUser()
          setUsername(name)  
        })() 
     }, [])

    const signOut = async () => {
        setIsLoading(true)
        try {
            await userService.logoutUser()
        }
        catch(error) {
            console.log(error)
        }

        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        setIsLoading(false)
        setIsLoggedIn(false)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', display: 'flex', marginLeft: width*.025, marginRight: width*.025, marginTop: height*.01 }}>
            
            <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 25, color: '#434343' }}>Profile</Text>
                <Ionicons 
                    name='md-settings-outline' 
                    size={35} 
                    onPress={() => navigation.navigate('Settings')}
                    style={{ alignSelf: 'flex-end', color: '#434343' }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 3, borderBottomColor: '#008811', padding: 15 }}>
                <Image 
                    source={require('../assets/Robert.jpg')} 
                    style={{ width: 125, height: 125, borderRadius: 100, alignSelf: 'center', marginTop: 10 }} 
                />
                <Text style={{ fontSize: 20, color: '#434343', alignSelf: 'center', }}>{username}</Text>
            </View>

            <View>

            </View>
            
            <View style={{ alignItems: 'center', padding: 15 }}>
                <Button 
                    title='Sign out'
                    type='outline' 
                    raised
                    loading={isLoading}
                    buttonStyle={{ backgroundColor: '#00bd26' }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ width: '45%'}} 
                    onPress={() => signOut()}></Button>
            </View>
        
        </View>
    )
}


export default ProfileScreen