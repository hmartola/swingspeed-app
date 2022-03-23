import React, { useContext, useEffect, useState } from "react"
import { Image, Text, ScrollView, View, useWindowDimensions, Pressable, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button, BottomSheet, Overlay, ListItem } from "react-native-elements"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

import UserData from "../components/userData"
import userService from '../service/users'
import { LoginContext } from "../contexts/loginContext"
import { getUser, storeProfilePictureFilePath, getProfilePictureFilePath, getAuthToken } from "../components/user"
import { BASE_URL } from "../utils/config"
import { 
	requestCameraPermission, 
	requestWriteExternalStoragePermission, 
	requestReadExternalStoragePermission 
} from "../components/permissions"
import { errorMessage } from "../components/message"


const ProfileScreen = ({ navigation }) => {

	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false)
	const [isSideMenuVisible, setSideMenuVisible] = useState(false)
	const [isLogoutAlertVisible, setLogoutAlertVisible] = useState(false)
	const [username, setUsername] = useState('')
	const [profilePicture, setProfilePicture] = useState('')

	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

	const { height, width } = useWindowDimensions()

	const cameraOptions = {
		mediaType: 'photo',
		quality: 1,
		cameraType: 'front',
		includeExtra: false,
		saveToPhotos: true
	}

	const galleryOptions = {
		mediaType: 'photo',
		quality: 1,
	}
//
	useEffect(() => {
		(async () => {
			const name = await getUser()
			setUsername(name)
			console.log(await getAuthToken())
			//setUserDataObj(userObj.data)
			try {
				const picture = await userService.getProfilePicture()
				if (picture.data.profile_picture !== null) {
					console.log('granted - api')
					setProfilePicture(`${BASE_URL}${picture.data.profile_picture}`)
				}
			} 
			catch (err) {
				if (await requestReadExternalStoragePermission()) {
					const localProfilePicture = await getProfilePictureFilePath()
					if (localProfilePicture !== undefined) {
						console.log('local')
						setProfilePicture(localProfilePicture)
					} 
					else {
						console.log('granted - no image available, defaulting to ionicon')
					}  
				} // If user denied access to storage	
				else {
					console.log('denied - no image available, defaulting to ionicon')
				}
			}
		})()
	}, [])

	const signOut = async () => {
		setLogoutAlertVisible(true)
 		try {
			await userService.logoutUser()
		}
		catch (error) {
			console.warn(error)
		}
		await AsyncStorage.removeItem('user')
		await AsyncStorage.removeItem('token')
		setLogoutAlertVisible(false)
		setIsLoggedIn(false)
	}

	const deleteAccount = async () => {

	}

	const handleEditProfilePicture = async (action) => {
		if (action === 'gallery') {
			try {
				const response = await launchImageLibrary(galleryOptions)
				if (response.didCancel) {
					return;
				} else if (response.errorCode === 'others') {
					errorMessage('An unexpected error occurred, please try again')
					console.warn(response.errorMessage)
				} else {
					console.log(response.assets)
					setProfilePicture(response.assets[0].uri)
					setBottomSheetVisible(false)
					await storeProfilePictureFilePath(response.assets[0].uri)
					await userService.uploadProfilePicture(response.assets[0])
				}
			} catch (err) {
				console.warn(err)
			}

		} else if (action === 'camera') {
			try {
				if (await requestCameraPermission() && await requestWriteExternalStoragePermission()) {
					const response = await launchCamera(cameraOptions)
					if (response.didCancel) {
						return;
					} else if (response.errorCode === 'camera_unavailable') {
						errorMessage('Could not open camera')
					} else if (response.errorCode === 'others') {
						errorMessage('An unexpected error occurred, please try again')
						console.warn(response.errorMessage)
					} else {
						setProfilePicture(response.assets[0].uri)
						setBottomSheetVisible(false)
						await storeProfilePictureFilePath(response.assets[0].uri)
						await userService.uploadProfilePicture(response.assets[0])
					}
				} else {
					errorMessage('App needs permission to use the camera and write to external storage.' +
												'\n\nPlease grant the required permissions in your settings.')
				}
			} catch (err) {
				console.warn(err)
			}
		}
	}

	return (
		<ScrollView style={{ flex: 1, display: 'flex', marginLeft: width * .025, marginRight: width * .025, marginTop: height * .01 }}>

			<View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={{ fontSize: 25, color: '#434343' }}>Profile</Text>
				<Ionicons
					name='menu'
					size={35}
					onPress={() => setSideMenuVisible(true)}
					style={{ alignSelf: 'flex-end', color: '#434343' }}
				/>
			</View>

			<Overlay isVisible={isSideMenuVisible} onBackdropPress={() => setSideMenuVisible(false)} overlayStyle={{ height: '100%', width: '50%', alignSelf: 'flex-end' }}>
				<ListItem onPress={() => { setSideMenuVisible(false), setBottomSheetVisible(true) } } style={{ margin: 5 }} topDivider bottomDivider>
					<ListItem.Title style={{ fontSize: 16 }}>Change profile picture</ListItem.Title>
					<ListItem.Chevron />
				</ListItem>
				<ListItem onPress={() => console.log('aint no help coming')} style={{ margin: 5 }} bottomDivider>
					<ListItem.Title style={{ fontSize: 16 }}>Help</ListItem.Title>
					<ListItem.Content right>
						<ListItem.Chevron />
					</ListItem.Content>
				</ListItem>
				<ListItem onPress={() => deleteAccount()} style={{ margin: 5 }} bottomDivider>
					<ListItem.Title style={{ fontSize: 16 }}>Delete account</ListItem.Title>
					<ListItem.Chevron />
				</ListItem>
				<ListItem onPress={() =>  signOut()} style={{ bottom: 0, position: 'absolute', width: '100%', margin: 5 }} topDivider bottomDivider>
					<ListItem.Title style={{ fontSize: 16 }}>Sign out</ListItem.Title>
					<ListItem.Content right>
						<ListItem.Chevron />
					</ListItem.Content>
				</ListItem>
			</Overlay>

			<Overlay isVisible={isLogoutAlertVisible} overlayStyle={{ height: '15%', width: '50%', alignItems: 'center' }}>
				<Text style={{ color: '#434343', fontSize: 20, padding: 10 }}>Signing out...</Text>
				<ActivityIndicator animating={isLogoutAlertVisible} size='large' />
			</Overlay>

			<View style={{ flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 3, borderBottomColor: '#008811', padding: 15 }}>
				<Pressable onLongPress={() => setBottomSheetVisible(true)}>
					{profilePicture !== '' ? (
						<Image
						source={{ uri: profilePicture }}
						style={{ width: 125, height: 125, borderRadius: 100, alignSelf: 'center', marginTop: 10 }}
						/>
					) : (
						<Ionicons
						name='person-circle-outline'
						size={125}
						style={{ color: '#434343' }}
						/>
					)}
				</Pressable>
			</View>

			<UserData username={username} />

			<BottomSheet modalProps={{}} isVisible={isBottomSheetVisible}>
				<Button 
					title='Choose from library' 
					buttonStyle={{ backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: 'black' }} 
					titleStyle={{ color: 'black', fontSize: 18, margin: 15 }}
					onPress={() => handleEditProfilePicture('gallery')}
				/>
				<Button 
					title='Take new photo' 
					buttonStyle={{ backgroundColor: 'white' }} 
					titleStyle={{ color: 'black', fontSize: 18, margin: 15 }}
					onPress={() => handleEditProfilePicture('camera')}
				/>
				<Button 
					title='Cancel' 
					onPress={() => setBottomSheetVisible(false)} 
					buttonStyle={{ backgroundColor: 'red' }}
					titleStyle={{ fontSize: 18, margin: 15 }}/>
			</BottomSheet>

		</ScrollView>
	)
}


export default ProfileScreen