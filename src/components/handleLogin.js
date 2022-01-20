import React, { useState } from 'react'

import { storeUser, storeAuthToken } from '../components/user' 
import loginService from '../service/users'
import { errorMessage } from './message'

const handleLogin = async (username, password) => {
    try {
        const token = await loginService.getToken({ username: username, password: password })
        
        if ('auth_token' in token) {
            await storeAuthToken(token.auth_token)
            await storeUser(username)
            return true
        
        } else {
            errorMessage(JSON.stringify(token))
            return false
        } 
    
    } catch(e) {
        console.log(e)
    }
}

export default handleLogin