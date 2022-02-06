import React, { useState, useEffect, useRef } from "react"
import { View, 
         Text, 
         useWindowDimensions, 
         Linking, 
         StyleSheet, 
         ActivityIndicator, 
         TouchableOpacity } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import { Button } from "react-native-elements"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import RNFS from 'react-native-fs'


const CameraScreen = () => {

  const [isPermitted, setIsPermitted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const { height, width } = useWindowDimensions()
  const isFocused = useIsFocused()

  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null)
  //console.log(devices)
  
  // iOS has a 'restricted' alternative but it's not currently relevant --> check in future? 
  useEffect(() => {
    (async () =>  {
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
    }
    else {
      await camera.current.stopRecording()
      setIsRecording(false)
    }
  }

  const handleRecording = (recording) => {
    console.log(recording, recording.path)
    const fileName = recording.path.substring(recording.path.lastIndexOf('/') + 7)
    console.log(fileName)
    const newFilePath = RNFS.ExternalDirectoryPath + '/' + fileName
    console.log(newFilePath)
    RNFS.moveFile(recording.path, newFilePath)
  }

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
        <View style={{ flex: 1 }}>
          <Camera
            style={StyleSheet.absoluteFill} 
            device={device}
            ref={camera}
            isActive={isFocused}
            video={true}
          />
          {!isRecording ? (
            <TouchableOpacity 
              style={styles.recordButtonPassive}
              onPress={() => handlePress()} /> 
          ) : (
            <TouchableOpacity 
              style={styles.recordButtonActive}
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

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    marginLeft: width*.05, 
    marginRight: width*.05, 
    marginTop: height*.01
  },
  recordButtonPassive: {
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height*.045,
    left: width*.39,
    width: width*.26,
    height: height*.1,
    backgroundColor: 'transparent',
    borderRadius: 100,
  },
  recordButtonActive: {
    borderWidth: 5,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height*.045,
    left: width*.4,
    width: '21%',
    height: '11%',
    backgroundColor: 'transparent',
    borderRadius: 100,
  }
})

export default CameraScreen