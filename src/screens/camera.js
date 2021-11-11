import React from "react"
import { Text, View } from 'react-native'
import { useIsFocused } from "@react-navigation/core"

const CameraScreen = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera</Text>
        </View>
        
    )
}

export default CameraScreen