import React, { useEffect, useState } from "react"
import { Text, View, useWindowDimensions } from 'react-native'
import { Button, Card } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";

import { getUser } from '../components/user'
import userService from '../service/users'

const MainScreen = ({ navigation }) => {

	const [username, setUsername] = useState('')
	const [swingData, setSwingData] = useState([])

	const { height, width } = useWindowDimensions()
	const isFocused = useIsFocused()

	useEffect(() => {
		(async () => {
			const name = await getUser()
			setUsername(name)
			const swings = await userService.getUserSwings()
			setSwingData(swings)
		})()
	}, [isFocused])

	const getLatestSwing = () => {
		try {
			const latestSwing = swingData.slice(-1)
			return latestSwing[0].speed
		} catch (err) {
			console.warn(err)
		}
	}

	const getTopSwing = () => {
		try {
			const swings = swingData.map(swings => {
				return swings.speed
			})
			const topSwing = Math.max(...swings)
			return topSwing
		} catch (err) {
			console.warn(err)
		}
	}

	return (
		<View 
			style={{ 
				flex: 1, 
				justifyContent: 'flex-start', 
				display: 'flex', 
				marginLeft: width * .025, 
				marginRight: width * .025, 
				marginTop: height * .01 
			}}>

		<View style={{ marginTop: 30 }}>
			<Text style={{ fontSize: 40, textAlign: 'center' }}>
				<Text style={{ color: '#008811' }}>Hello </Text>
				<Text style={{ color: '#434343' }}>{username} &#x1F44B;</Text>
			</Text>
		</View>

		<View style={{ marginTop: 50 }}>
			<Card>
				<Card.Title style={{ fontSize: 25 }}>Start a new session?</Card.Title>
				<Button
				title='OPEN CAMERA'
				type='outline'
				raised
				buttonStyle={{ backgroundColor: '#008811', borderRadius: 3 }}
				titleStyle={{ color: 'white' }}
				containerStyle={{ width: '45%', alignSelf: 'center', marginTop: 15 }}
				onPress={() => navigation.navigate('Camera')}
			/>
			</Card>
		</View>

		<View style={{ marginTop: 5 }}>
			<Card>
				<Card.Title style={{ fontSize: 20 }}>Your latest swing speed</Card.Title>
				<Card.Divider />
				{swingData.length !== 0 ? (
					<Text style={{ textAlign: 'center', color: '#434343' }}>{getLatestSwing()} m/s</Text>
				) : (
					<Text style={{ textAlign: 'center', color: '#434343' }}>0 m/s</Text>
				)}
			</Card>
		</View>

		<View style={{ marginTop: 5 }}>
			<Card>
				<Card.Title style={{ fontSize: 20 }}>Your top swing speed</Card.Title>
				<Card.Divider />
				{swingData.length !== 0 ? (
					<Text style={{ textAlign: 'center', color: '#434343' }}>{getTopSwing()} m/s</Text>
				) : (
					<Text style={{ textAlign: 'center', color: '#434343' }}>0 m/s</Text>
				)}
			</Card>
		</View>

		</View>
	)
}

export default MainScreen