import React, { useEffect, useState } from "react"
import { Text, View, useWindowDimensions } from 'react-native'
import { Button } from "react-native-elements";

import { getUser } from '../components/user'

const MainScreen = ({ navigation }) => {

	const [username, setUsername] = useState('')

	const { height, width } = useWindowDimensions()

	useEffect(() => {
		(async () => {
			const name = await getUser()
			setUsername(name)
		})()
	}, [])

	return (
		<View style={{ flex: 1, justifyContent: 'flex-start', display: 'flex', marginLeft: width * .025, marginRight: width * .025, marginTop: height * .01 }}>

		<View style={{ marginTop: 30 }}>
			<Text style={{ fontSize: 40 }}>
				<Text style={{ color: '#008811' }}>Hello </Text>
				<Text style={{ color: '#434343' }}>{username} &#x1F44B;</Text>
			</Text>
		</View>

		<View style={{ borderWidth: 1, marginTop: 50, padding: 20 }}>
			<Text style={{ fontSize: 22, textAlign: 'center', color: '#2c2c2c' }}>
				Start a new session?
			</Text>
			
			<Button
				title='OPEN CAMERA'
				type='outline'
				raised
				buttonStyle={{ backgroundColor: '#008811', borderRadius: 3 }}
				titleStyle={{ color: 'white' }}
				containerStyle={{ width: '45%', alignSelf: 'center', marginTop: 15 }}
				onPress={() => navigation.navigate('Camera')}
			/>
		</View>

		</View>
	)
}

export default MainScreen