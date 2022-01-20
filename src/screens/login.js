import React, { useContext, useState } from "react"
import { TextInput, View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native"
import { Button } from "react-native-elements"

import handleLogin from "../components/handleLogin"
import { LoginContext } from "../contexts/loginContext"

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
    const { height, width } = useWindowDimensions()

    const onLogin = async () => {
        try {
            const login = await handleLogin(username, password)
            setPassword('')
            
            if (login) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }

          } catch(e) {
            console.log(e) 
          }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', display: 'flex', marginLeft: width*.05, marginRight: width*.05 }}>
            
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
                    style={{ borderBottomWidth: 1, width: '95%', marginBottom: 10 }} />
                <TextInput 
                    placeholder='Enter password' 
                    onChangeText={password => setPassword(password)} defaultValue={password}
                    secureTextEntry={true}
                    style={{ borderBottomWidth: 1, width: '95%', marginBottom: 10 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15 }}>
                <Button 
                    title='Login'  
                    type='outline' 
                    raised
                    buttonStyle={{ backgroundColor: 'darkgreen' }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ width: '45%'}}  
                    onPress={() => onLogin()}
                />
                <Button 
                    title='Forgot password?'  
                    type='clear' 
                    titleStyle={{ color: 'blue' }}
                    containerStyle={{ width: '45%'}}  
                    onPress={() => console.log('pressed forgot password')}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ padding: 15, marginTop: 30, fontSize: 20, color: 'darkgreen', alignSelf: 'center' }}>Don't have an account?</Text>
                <Button 
                    title='Create account' 
                    type='outline' 
                    raised
                    buttonStyle={{ backgroundColor: 'darkgreen' }}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ width: '45%'}}
                    onPress={() => navigation.navigate('CreateAccount')} 
                />
            </View>
            
        </View>
    )

}

export default LoginScreen