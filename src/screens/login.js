import React, { useState } from "react"
import { TextInput, View, Text, Image, Button, TouchableOpacity } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import handleLogin from "../components/handleLogin"

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async () => {
        await handleLogin(username, password)
        setPassword('')
        try {
            const value = await AsyncStorage.getItem('user')
            //if (value !== null) {
                navigation.navigate('Main Menu')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main Menu' }]
                })
            //}
          } catch(e) {
            console.log(e) 
          }
    }
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
            
            <Text style={{ padding: 15, fontSize: 30, color: 'darkgreen', alignSelf: 'center' }}>Choose user to sign in</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => onLogin()}>
                    <Image source={require('../assets/Robert.jpg')} style={{ width: 100, height: 100, borderRadius: 100 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onLogin()} style={{ backgroundColor: 'lightgray', borderRadius: 100, width: 100, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'darkgreen' }}>GUEST</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{ alignItems: 'center' }}>
                <Text style={{ padding: 15, marginTop: 30, fontSize: 20, color: 'darkgreen', alignSelf: 'center' }}>Or sign in with different account</Text>
                <TextInput 
                    placeholder='Enter username or email' 
                    onChangeText={username => setUsername(username)} defaultValue={username}
                    style={{ borderBottomWidth: 1, width: 365, marginBottom: 10 }} />
                <TextInput 
                    placeholder='Enter password' 
                    onChangeText={password => setPassword(password)} defaultValue={password}
                    secureTextEntry={true}
                    style={{ borderBottomWidth: 1, width: 365, marginBottom: 10 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                <Button title='Login' color='darkgreen' onPress={() => onLogin()}/>
                <TouchableOpacity>
                    <Text style={{ textDecorationLine: 'underline', color: 'blue', marginRight: 20, marginLeft: 40 }}>Forgot password?</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ padding: 15, marginTop: 30, fontSize: 20, color: 'darkgreen', alignSelf: 'center' }}>Don't have an account?</Text>
                <Button title='Create account' color='darkgreen' onPress={() => navigation.navigate('CreateAccount')} />
            </View>
            
        </View>
    )

}

export default LoginScreen