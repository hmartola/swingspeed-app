import axios from "axios"

import { BASE_URL } from "../utils/config"
import { getAuthToken } from "../components/user"

const userUrl = `${BASE_URL}/users/`
const tokenUrl = `${BASE_URL}/token`

const authorization = async () => {
    let token = await getAuthToken()
    return `Token ${token}`
}

const getToken = async (loginData) => {
    try {
        const response = await axios.post(`${tokenUrl}/login/`, loginData)
        return response.data
    } catch (err) {
        return err.response.data
    }
    
}

const createUser = async (userData) => {
    try {
        const response = await axios.post(userUrl, userData)
        return response.data
    } catch (err) {
        return err.response.data
    }
}

const logoutUser = async () => {
    const token = await authorization()
    const config = {
        headers: { Authorization: token } 
    }
    try {
        const response = await axios.post(`${tokenUrl}/logout/`, {}, config)
        return response
    } catch (err) {
        throw err
    }
}

export default { getToken, createUser, logoutUser }