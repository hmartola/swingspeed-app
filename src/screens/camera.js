import React, { useState } from "react"
import { View, TouchableOpacity, Button } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { useCamera } from 'react-native-camera-hooks'

const CameraScreen = () => {

    const [
        { cameraRef, isRecording },
        { recordVideo, setIsRecording },
        ] = useCamera(null)

    const [btnText, setBtnText] = useState('Start recording')

    const recordButton = () => {
    
        if (btnText === 'Start recording') {
            //setIsRecording(true)
            setBtnText('Stop recording')
        }
        else {
            //setIsRecording(false)
            setBtnText('Start recording')
        }
    }

      return (
        <View style={{ flex: 1 }}>
        <RNCamera captureAudio={false} ref={cameraRef} type={RNCamera.Constants.Type.back} style={{ flex: 1 }} />
        <Button title={btnText} color='darkgreen' onPress={() => recordButton()} /> 
        
        {!isRecording && ( <TouchableOpacity
          onPress={async () => {
            try {
              setIsRecording(true);
              const data = await recordVideo();
            } 
            finally {
              setIsRecording(false);
            }
        }}
        style={{ width: '100%', height: 45 }}
        />
      )}
        </View>
    )
}

export default CameraScreen