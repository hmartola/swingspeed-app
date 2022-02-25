import React, { useContext, useState } from "react"
import { View, Text, useWindowDimensions } from "react-native"
import { Button, Input } from "react-native-elements"

import handleLogin from "../components/handleLogin"
import { LoginContext } from "../contexts/loginContext"
import Velofore from '../assets/Velofore.svg'

const LoginScreen = ({ navigation }) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
	const { height, width } = useWindowDimensions()

	const onLogin = async () => {
		try {
			setIsLoading(true)
			const login = await handleLogin(username, password)
			setPassword('')

			if (login) {
				setIsLoading(false)
				setIsLoggedIn(true)
			} else {
				setIsLoading(false)
				setIsLoggedIn(false)
			}

		} catch (e) {
			console.log(e)
		}
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', display: 'flex', marginLeft: width * .05, marginRight: width * .05, marginTop: height * .01 }}>
			<Velofore width={300} height={100} style={{ alignSelf: 'center', marginRight: width * .4 }} />

			<View style={{ alignItems: 'center' }}>
				<Text style={{ padding: 15, marginTop: 30, fontSize: 20, color: 'darkgreen', alignSelf: 'center' }}>Sign in with your account</Text>
				<Input
					placeholder='Enter username or email'
					onChangeText={username => setUsername(username)}
					defaultValue={username}
				/>
				<Input
					placeholder='Enter password'
					onChangeText={password => setPassword(password)}
					defaultValue={password}
					secureTextEntry={true}
				/>
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, alignItems: 'center' }}>
				<Button
					title='Login'
					type='outline'
					raised
					loading={isLoading}
					buttonStyle={{ backgroundColor: '#00bd26' }}
					titleStyle={{ color: 'white' }}
					containerStyle={{ width: '45%' }}
					onPress={() => onLogin()}
				/>
				<Button
					title='Forgot password?'
					type='clear'
					titleStyle={{ color: 'blue' }}
					containerStyle={{ width: '45%' }}
					onPress={() => console.log('pressed forgot password')}
				/>
			</View>

			<View style={{ alignItems: 'center' }}>
				<Text style={{ padding: 15, marginTop: 30, fontSize: 20, color: 'darkgreen', alignSelf: 'center' }}>Don't have an account?</Text>
				<Button
					title='Create account'
					type='outline'
					raised
					buttonStyle={{ backgroundColor: '#00bd26' }}
					titleStyle={{ color: 'white' }}
					containerStyle={{ width: '45%' }}
					onPress={() => navigation.navigate('CreateAccount')}
				/>
			</View>

		</View>
	)

}

export default LoginScreen