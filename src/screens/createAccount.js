import React, { useState } from "react"
import { View, Text, TextInput, useWindowDimensions } from 'react-native' 
import { Button, Input } from "react-native-elements"

import userService from '../service/users'
import { storeUser } from "../components/user"
import { errorMessage, successMessage } from "../components/message"

const CreateAccountScreen = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const { height, width } = useWindowDimensions()

    const userInfo = {
        username: username,
        password: password,
        re_password: rePassword
    }

    const createAccount = async () => {
        
        try {
           const newUser = await userService.createUser(userInfo)
           if ('id' in newUser) {
            storeUser(userInfo.username)
            setUsername('')
            setPassword('')
            setRePassword('')
            successMessage('Account created')

           } else {
            setRePassword('')
            errorMessage(JSON.stringify(newUser))
           }
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', display: 'flex', marginLeft: width*.025, marginRight: width*.025, marginTop: height*.01 }}>
            <Text style={{ padding: 15, fontSize: 20, color: 'darkgreen', alignSelf: 'center', borderWidth: 2, marginBottom: 50 }}>Sign up</Text>
            <Text style={{ alignSelf: 'center', marginBottom: 50, width: 250, color: '#2c2c2c' }}>A personal account is required if you wish to save your data and statistics. No sensitive data will be processed by the Veloforce app.</Text>
            <View style={{ alignItems: 'center', marginLeft: width*.05, marginRight: width*.05 }}>
                <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'darkgreen', alignSelf: 'flex-start' }}>Username</Text>
                <Input onChangeText={username => setUsername(username)} defaultValue={username} />
                
                <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'darkgreen', alignSelf: 'flex-start' }}>Password</Text>
                <Input onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={true} />
                
                <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold', color: 'darkgreen', alignSelf: 'flex-start' }}>Confirm password</Text>
                <Input onChangeText={password => setRePassword(password)} defaultValue={rePassword} secureTextEntry={true} />
            </View>
            <View style={{ alignSelf: 'center', marginTop: 30 }}>
                <Button
                    title='Continue'  
                    type='outline' 
                    raised
                    buttonStyle={{ backgroundColor: 'darkgreen' }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ width: 150 }}  
                    onPress={() => createAccount()} 
                />
            </View>
        </View>
    )
}

export default CreateAccountScreen