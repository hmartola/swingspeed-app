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
		<View style={{ flex: 1, justifyContent: 'center', display: 'flex', marginLeft: width * .025, marginRight: width * .025, marginTop: height * .01 }}>

			<Text style={{ fontSize: 40 }}>
				<Text style={{ color: '#008811' }}>Welcome, </Text>
				<Text style={{ color: '#434343' }}>{username}</Text>
			</Text>

			<Text style={{ fontSize: 25, marginTop: 50, textAlign: 'center', color: '#2c2c2c' }}>Start a new session?</Text>
			<Button
				title='OPEN CAMERA'
				type='outline'
				raised
				buttonStyle={{ backgroundColor: '#008811' }}
				titleStyle={{ color: 'white' }}
				containerStyle={{ width: '45%', alignSelf: 'center', marginTop: 15 }}
				onPress={() => navigation.navigate('Camera')}
			/>

		</View>
	)
}

export default MainScreen