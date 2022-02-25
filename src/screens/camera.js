import React, { useState, useEffect, useRef } from "react"
import {
	View, Text, useWindowDimensions, Linking, StyleSheet, ActivityIndicator
} from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import { Button, Overlay } from "react-native-elements"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import RNFS from 'react-native-fs'

import videoService from '../service/video'


const CameraScreen = () => {

	const [isPermitted, setIsPermitted] = useState(false)
	const [isRecording, setIsRecording] = useState(false)
	const [visible, setVisible] = useState(false)
	const [notification, setNotification] = useState('')

	const { height, width } = useWindowDimensions()
	const isFocused = useIsFocused()

	const devices = useCameraDevices()
	const device = devices.back
	const camera = useRef(null)
	//console.log(devices)

	// iOS has a 'restricted' alternative but it's not currently relevant --> check in future? 
	useEffect(() => {
		(async () => {
			switch (await Camera.getCameraPermissionStatus()) {
				case 'authorized':
					setIsPermitted(true)
					console.log('auth')
					break
				case 'not-determined':
					await handlePermissionRequest()
					console.log('non-det')
					break
				case 'denied':
					setIsPermitted(false)
					console.log('denied')
					break
			}
		})()
	}, [])

	const handlePermissionRequest = async () => {
		const newCameraPermission = await Camera.requestCameraPermission()
		if (newCameraPermission === 'authorized') {
			setIsPermitted(true)
		}
		else {
			setIsPermitted(false)
		}
	}

	const handlePress = async () => {
		if (!isRecording) {
			camera.current.startRecording({
				flash: 'off',
				onRecordingFinished: (recording) => handleRecording(recording),
				onRecordingError: (error) => console.error(error),
			})
			setIsRecording(true)
			setVisible(true)
			setNotification('Recording in progress...')
			setTimeout(() => {
				setVisible(false)
			}, 3000)
		}
		else {
			await camera.current.stopRecording()
			setIsRecording(false)
			setVisible(true)
			setNotification('Recording stopped')
			setTimeout(() => {
				setVisible(false)
			}, 3000);
		}
	}

	const handleRecording = async (recording) => {
		try {
			// Upload
			console.log(recording, recording.path)
			const fileName = recording.path.substring(recording.path.lastIndexOf('/') + 7)
			console.log(fileName)
			const video = await videoService.uploadVideo(recording.path, fileName)
			console.log(video)

			// Move to accessible location
			const newFilePath = RNFS.DownloadDirectoryPath + '/' + fileName
			console.log(newFilePath)
			await RNFS.moveFile(recording.path, newFilePath)
		}
		catch (error) {
			console.log(error)
		}
	}

	const handleError = () => {
		setVisible(true)
		setNotification('Something went wrong...')
		setTimeout(() => {
			setVisible(false)
		}, 5000);
	}

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			marginLeft: width * .05,
			marginRight: width * .05,
			marginTop: height * .01
		},
		recordButtonPassive: {
			borderWidth: 5,
			borderColor: 'white',
			backgroundColor: 'transparent',
			borderRadius: 100,
			height: height * .125,
		},
		recordButtonActive: {
			borderWidth: 5,
			borderColor: 'red',
			backgroundColor: 'transparent',
			borderRadius: 100,
			height: height * .125,
		},
		recordButtonContainer: {
			width: width * .26,
			marginTop: height * .725
		},
		overlay: {
			backgroundColor: '#434343',
			alignSelf: 'center',
			bottom: '47.5%',
			width: '90%'
		}
	})

	if (device == null) {
		return (
			<View style={{ flex: 1 }}>
				<ActivityIndicator color='#008811' />
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			{isPermitted && device !== null ? (
				<View style={{ flex: 1, alignItems: 'center' }}>
					<Overlay isVisible={visible} overlayStyle={styles.overlay}>
						<Text style={{ textAlign: 'center' }}>{notification}</Text>
					</Overlay>
					<Camera
						style={StyleSheet.absoluteFill}
						device={device}
						ref={camera}
						isActive={isFocused}
						video={true}
						enableZoomGesture={true}
						onError={() => handleError()}
					/>
					{!isRecording ? (
						<Button
							buttonStyle={styles.recordButtonPassive}
							containerStyle={styles.recordButtonContainer}
							onPress={() => handlePress()} />
					) : (
						<Button
							buttonStyle={styles.recordButtonActive}
							containerStyle={styles.recordButtonContainer}
							onPress={() => handlePress()} />
					)}
				</View>

			) : (
				<View style={styles.container}>
					<Text style={{ fontSize: 20, color: '#434343' }}>You must grant this app permission to use the camera</Text>
					<Button
						title='Open settings'
						type='outline'
						raised
						buttonStyle={{ backgroundColor: '#00bd26' }}
						titleStyle={{ color: 'white' }}
						containerStyle={{ width: '45%', marginTop: 20, alignSelf: 'center' }}
						onPress={async () => await Linking.openSettings()}
					/>
				</View>
			)}
		</View>
	)
}

export default CameraScreen