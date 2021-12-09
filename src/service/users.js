import axios from "axios"

import { BASE_URL } from "../utils/config"
import newMessage from "../components/message"

const userUrl = `${BASE_URL}/users/`
const tokenUrl = `${BASE_URL}/token`

const getToken = async (loginData) => {
    try {
        const response = await axios.post(`${tokenUrl}/login/`, loginData)
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err.response.data)
        newMessage(JSON.stringify(err.response.data))
    }
    
}

const createUser = async (userData) => {
    try {
        const response = await axios.post(userUrl, userData)
        return response.data
    } catch (err) {
        console.log(err.response.data)
        newMessage(JSON.stringify(err.response.data))
    }
}

export default { getToken, createUser }