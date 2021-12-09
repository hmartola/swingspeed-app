import React, { useState } from 'react'
import { storeUser } from '../components/user' 
import loginService from '../service/users'
import { storeAuthToken } from "../components/user"
import { setLoggedIn } from './loginContext'

const handleLogin = async (username, password) => {
    try {
        /* const token = await loginService.getToken({ username: username, password: password })
        if (token !== null) {
            storeAuthToken(token.auth_token)
            storeUser(username)
            setLoggedIn()
            console.log('token' + token)
        } */
        console.log(username)
        storeUser(username)
        setLoggedIn()

    } catch(e) {
        console.log(e)
    }
}

export default handleLogin