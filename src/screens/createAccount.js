import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from 'react-native' 

import userService from '../service/users'
import { storeUser } from "../components/user"


const CreateAccountScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const createAccount = async () => {
        const userInfo = {
            username: username,
            password: password,
            re_password: rePassword
        }
        try {
           //await userService.createUser(userInfo)
           storeUser(userInfo.username)
           navigation.navigate('Main Menu')
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
            <Text style={{ padding: 15, fontSize: 20, color: 'darkgreen', alignSelf: 'center', borderWidth: 2, marginBottom: 50 }}>Sign up</Text>
            <Text style={{ alignSelf: 'center', marginBottom: 50, width: 300 }}>A personal account is required if you wish to save your data and statistics. No sensitive data will be processed by the Veloforce app.</Text>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ paddingLeft: 25, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: 'red', alignSelf: 'flex-start' }}>Username or email</Text>
                <TextInput  
                    onChangeText={username => setUsername(username)} defaultValue={username}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 350, marginBottom: 10 }} />
                <Text style={{ paddingLeft: 25, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: 'red', alignSelf: 'flex-start' }}>Password</Text>
                <TextInput  
                    onChangeText={password => setPassword(password)} defaultValue={password}
                    secureTextEntry={true}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 350, marginBottom: 10 }} />
                <Text style={{ paddingLeft: 25, marginTop: 15, fontSize: 16, fontWeight: 'bold', color: 'red', alignSelf: 'flex-start' }}>Confirm password</Text>
                <TextInput  
                    onChangeText={password => setRePassword(password)} defaultValue={rePassword}
                    secureTextEntry={true}
                    style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: 350, marginBottom: 10 }} />
                <TouchableOpacity style={{ backgroundColor: 'darkgreen', borderRadius: 5, padding: 15, width: 200, marginTop: 30 }} onPress={() => createAccount()}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateAccountScreen