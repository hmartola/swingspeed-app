import { useCallback, useState } from "react"

let login = false

export const setLoggedIn = () => {
    login = true
    console.log('logged in at context')
}

export const setLoggedOut = () => {
    login = false
    console.log('logged out at context')
}

export const getLogin = () => {
    return login
}

