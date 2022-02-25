import React, { useState } from "react"
import { View } from "react-native"
import { ListItem } from "react-native-elements"

const UserData = ({ username }) => {

	const [selectedGenderButtonIndex, setSelectedGenderButtonIndex] = useState(0)
	const [selectedHandednessButtonIndex, setSelectedHandednessButtonIndex] = useState(1)
	const [selectedUnitsButtonIndex, setSelectedUnitsButtonIndex] = useState(0)
	const [isLefty, setIsLefty] = useState(false)
	const [isMetric, setIsMetric] = useState(true)
	//const [name, setName] = useState(username)  // TODO: ABLE TO ALSO ASSIGN REAL NAME TO ACCOUNT ?
	const [age, setAge] = useState('')
	const [height, setHeight] = useState('')
	const [hcp, setHcp] = useState('')

	const data = {
		age: age,
		gender: selectedGenderButtonIndex,
		height: height,
		lefty: isLefty,
		units: isMetric,
		hcp: hcp
	}

	const handleSubmit = () => {
		console.log(data)
	}

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
					<ListItem.Title>Name</ListItem.Title>
				</ListItem.Content>
				<ListItem.Title>{username}</ListItem.Title>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Age</ListItem.Title>
				</ListItem.Content>
				<ListItem.Input
					placeholder='Enter your age'
					onChangeText={age => setAge(age)}
					onBlur={() => handleSubmit()} />
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Gender</ListItem.Title>
				</ListItem.Content>
				<ListItem.ButtonGroup
					buttons={['Male', 'Female', 'Other']}
					selectedIndex={selectedGenderButtonIndex}
					onPress={(index) => setSelectedGenderButtonIndex(index)}
					selectedButtonStyle={{ backgroundColor: '#008811' }}
				/>
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Height</ListItem.Title>
				</ListItem.Content>
				<ListItem.Input
					placeholder='Enter your height'
					onChangeText={height => setHeight(height)}
					onBlur={() => handleSubmit()} />
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
					placeholder='Enter your HCP'
					onChangeText={hcp => setHcp(hcp)}
					onBlur={() => handleSubmit()} />
			</ListItem>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>Top swing speed</ListItem.Title>
				</ListItem.Content>
				<ListItem.Title>No recorded data</ListItem.Title>
			</ListItem>
		</View>


	)
}

export default UserData