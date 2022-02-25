import axios from "axios"

import { BASE_URL } from "../utils/config"
import { getAuthToken } from "../components/user"
import profpic from '../assets/Robert.jpg'

const userUrl = `${BASE_URL}/users`
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
		const response = await axios.post(`${userUrl}/`, userData)
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

const uploadProfilePicture = async () => {
	const token = await authorization()
	const config = {
		headers: {
			Authorization: token,
			ContentType: 'multipart/form-data'
		}
	}
	try {
		const data = new FormData()
		data.append('profile_picture', profpic, 'Robert.jpg')
		console.log(`${userUrl}/profile-picture`)
		const response = await axios.put(`${userUrl}/profile-picture/`, data, config)
		console.log('65')
		console.log(response)
		return response
	} catch (err) {
		return err.response.data
	}
}


export default { getToken, createUser, logoutUser, uploadProfilePicture }