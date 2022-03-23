import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ListItem } from "react-native-elements"

import userService from '../service/users'
import { storeUserData, getUserData } from "./user"

const UserData = ({ username }) => {

	const [selectedGenderButtonIndex, setSelectedGenderButtonIndex] = useState(0)
	const [selectedHandednessButtonIndex, setSelectedHandednessButtonIndex] = useState(1)
	const [selectedUnitsButtonIndex, setSelectedUnitsButtonIndex] = useState(0)
	const [isLefty, setIsLefty] = useState(false)
	const [isMetric, setIsMetric] = useState(true)
	//const [name, setName] = useState(username)  // TODO: ABLE TO ALSO ASSIGN REAL NAME TO ACCOUNT ?
	const [age, setAge] = useState('Type your age')
	const [height, setHeight] = useState('Type your height')
	const [hcp, setHcp] = useState('Type your HCP')
	const [topSpeed, setTopSpeed] = useState('No recorded data')

	useEffect(() => {
		(async () => {
			const userData = await getUserData()
			if (userData !== null) {
				console.log('local data', userData)
				setData(userData)
			} 
			else {
				const userObj = await userService.getUserData()
				console.log('api data', userObj)
				if (userObj !== null) {
					setData(userObj)
				}
			}
		})()
	}, [])

	const data = {
		age: age,
		gender: selectedGenderButtonIndex,
		height: height,
		lefty: isLefty,
		units: isMetric,
		handicap: hcp
	}

	const setData = (userObj) => {
		console.log(userObj)
		if (userObj.age !== null) {
			setAge(userObj.age)
		}
		if (userObj.height !== null) {
			setHeight(userObj.height)
		}
		if (userObj.handicap !== null) {
			setHcp(userObj.handicap)
		}
		if (userObj.lefty) {
			handleHandedness(0)
		}
		if (userObj.top_speed !== null) {
			setTopSpeed(userObj.top_speed)
		}
		if (userObj.gender !== null) {
			setSelectedGenderButtonIndex(userObj.gender)
		}
	}

	const handleSubmit = async () => {
		await storeUserData(data)
		console.log('submit', data)
	}

/* 	const handleGender = (index) => {
		setSelectedGenderButtonIndex(index)
		handleSubmit()
	} */

	const handleHandedness = (index) => {
		setSelectedHandednessButtonIndex(index)
		if (index === 0) {
			setIsLefty(true)
		} else {
			setIsLefty(false)
		}
		handleSubmit()
	}

	const handleUnits = (index) => {
		setSelectedUnitsButtonIndex(index)
		if (index === 0) {
			setIsMetric(true)
		} else {
			setIsMetric(false)
		}
		handleSubmit()
	}

	return (
		<View style={{ marginTop: 15 }}>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Username</ListItem.Title>
				</ListItem.Content>
				<ListItem.Title style={{ width: 180, textAlign: 'right' }}>{username}</ListItem.Title>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Age</ListItem.Title>
				</ListItem.Content>
				<ListItem.Input
					defaultValue={age.toString()}
					keyboardType='number-pad'
					onChangeText={age => setAge(age)}
					onFocus={() => setAge('')}
					onBlur={() => handleSubmit()} 
					containerStyle={{ textAlign: 'right', paddingHorizontal: 0 }}/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Gender</ListItem.Title>
				</ListItem.Content>
				<ListItem.ButtonGroup
					buttons={['Male', 'Female', 'Other']}
					selectedIndex={selectedGenderButtonIndex}
					onPress={(index) => { setSelectedGenderButtonIndex(index), handleSubmit() }}
					selectedButtonStyle={{ backgroundColor: '#008811' }}
				/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Height (cm)</ListItem.Title>
				</ListItem.Content>
				<ListItem.Input
					defaultValue={height.toString()}
					keyboardType='number-pad'
					onChangeText={height => setHeight(height)}
					onFocus={() => setHeight('')}
					onBlur={() => handleSubmit()} 
					containerStyle={{ textAlign: 'right', paddingHorizontal: 0 }}/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Handedness</ListItem.Title>
				</ListItem.Content>
				<ListItem.ButtonGroup
					buttons={['Left', 'Right']}
					selectedIndex={selectedHandednessButtonIndex}
					onPress={(index) => handleHandedness(index)}
					selectedButtonStyle={{ backgroundColor: '#008811' }}
				/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Units</ListItem.Title>
				</ListItem.Content>
				<ListItem.ButtonGroup
					buttons={['Metric', 'Imperial']}
					selectedIndex={selectedUnitsButtonIndex}
					onPress={(index) => handleUnits(index)}
					selectedButtonStyle={{ backgroundColor: '#008811' }}
				/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>HCP</ListItem.Title>
				</ListItem.Content>
				<ListItem.Input
					defaultValue={hcp.toString()}
					keyboardType='number-pad'
					onChangeText={hcp => setHcp(hcp)}
					onFocus={() => setHcp('')}
					onBlur={() => handleSubmit()} 
					containerStyle={{ textAlign: 'right', paddingHorizontal: 0 }}/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Top swing speed</ListItem.Title>
				</ListItem.Content>
				<ListItem.Title>{topSpeed}</ListItem.Title>
			</ListItem>
		</View>


	)
}

export default UserData