import React from "react"
import { Text, View } from "react-native"
import { Button } from "react-native-elements"

import { getAuthToken } from "../components/user"
import userService from '../service/users'

const SettingsScreen = () => {

	const test = async () => {
		const abc = await userService.uploadProfilePicture()
		console.log(abc)
	}

	return (
		<View style={{ flex: 1 }}>
			<Text>Settings</Text>
			<Button title='Press' onPress={() => test()} />
		</View>
	)
}

export default SettingsScreen