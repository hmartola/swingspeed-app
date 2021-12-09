import React from "react"
import { Button, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getUser } from '../components/user'

const ProfileName = (name) => {

    let user = ''
    
    return (
        <Text style={{ fontSize: 40 }}>{name}</Text>
    )
}

export default ProfileName