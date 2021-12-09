import React from "react"
import { View, StyleSheet } from 'react-native'
import Video from "react-native-video"
import demoVideo from '../assets/output2.mp4'


const StatsScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            <Video source={demoVideo} paused={true} repeat={false} controls={true} style={styles.mediaPlayer} />  
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