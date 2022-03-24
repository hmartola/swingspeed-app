import React, { useEffect, useState } from "react"
import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import { Card } from "react-native-elements"
import { useIsFocused } from "@react-navigation/native"

import userService from '../service/users'


const StatsScreen = () => {

	const [swingData, setSwingData] = useState([])

	const { height, width } = useWindowDimensions()
	const isFocused = useIsFocused()

	useEffect(() => {
		(async () => {
			const swings = await userService.getUserSwings()
			setSwingData(swings)
		})()
	}, [isFocused])

	const trimDate = (timestamp) => {
		let date = `${new Date(timestamp).getDate()}/${new Date(timestamp).getMonth()}/${new Date(timestamp).getFullYear()}`	  
		let time = `${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`
		return `${date} at ${time}`
	}

	return (
		<ScrollView 
			style={{ 
				flex: 1, 
				display: 'flex', 
				marginLeft: width*.025, 
				marginRight: width*.025, 
				marginTop: height*.01, 
				marginBottom: height*.01 
			}}>
			
			<View style={{ marginTop: 30 }}>
					<Text style={{ color: '#008811', fontSize: 40, textAlign: 'center' }}>Your swings</Text>
			</View>

			{swingData.length !== 0 ? (
				<View style={{ marginTop: 20 }}>
					{[...swingData].reverse().map((swing) => 
						<Card key={swing.id}>
							<Card.Title>{trimDate(swing.date_created)}</Card.Title>
							<Card.Divider />
							<Text style={{ textAlign: 'center', color: '#434343', fontSize: 15 }}>{swing.speed} kph</Text>
						</Card>
					)}
				</View>		
			) : (
				<Text style={{ fontSize: 20, marginTop: 50, color: '#434343' }}>
					Could not find previous swings :-( 
				</Text>
			)}
				
		</ScrollView>
	)
}

export default StatsScreen