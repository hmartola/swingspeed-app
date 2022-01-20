import React from "react"
import { View, StyleSheet, Text } from 'react-native'
//import Video from "react-native-video"


const StatsScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            <Text>Stats</Text>      
        </View>
    )
}

export default StatsScreen

const styles = StyleSheet.create({
    mediaPlayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
  })