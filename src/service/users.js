import axios from "axios"

import { BASE_URL } from "../utils/config"
import { getAuthToken } from "../components/user"

const userUrl = `${BASE_URL}/api/users`
const tokenUrl = `${BASE_URL}/api/token`

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

const getUserData = async () => {
	const token = await authorization()
	const config = {
		headers: { Authorization: token }
	}
	try {
		const response = await axios.get(`${userUrl}/me/`, config)
		return response.data
	} catch (err) {
		throw err
	}
}

const uploadProfilePicture = async (picture) => {
	const token = await authorization()
	const config = {
		headers: {
			Authorization: token,
			ContentType: 'multipart/form-data'
		}
	}
	try {
		const dataObj = {
			uri: picture.uri,
			name: picture.fileName,
			type: picture.type
		}
		const data = new FormData()
		data.append('profile_picture', dataObj)
		const response = await axios.put(`${userUrl}/profile-picture/`, data, config)
		return response 
	} catch (err) {
		return err.response.data
	}
}

const getProfilePicture = async () => {
	const token = await authorization()
	const config = {
		headers: {
			Authorization: token,
			ContentType: 'multipart/form-data'
		}
	}
	try {
		const response = await axios.get(`${userUrl}/profile-picture/`, config)
		return response
	} catch (err) {
		return err.response.data
	}
}


export default { getToken, createUser, logoutUser, getUserData, uploadProfilePicture, getProfilePicture }