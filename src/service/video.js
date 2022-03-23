import axios from "axios"
import RNFS from 'react-native-fs'

import { BASE_URL } from "../utils/config"
import { getAuthToken } from "../components/user"
import { progressNotification } from "../components/notification"

const swingUrl = `${BASE_URL}/api/swings`

const authorization = async () => {
	let token = await getAuthToken()
	return `Token ${token}`
}

const uploadVideo = async (filePath, fileName) => {
	const token = await authorization()
	const config = {
		headers: {
			Authorization: token,
			ContentType: 'multipart/form-data'
		}
	}

	try {
		console.log('video, 24', filePath)
		const videoObj = {
			uri: filePath,
			name: fileName,
			type: 'video/mp4'
		}
		console.log(await RNFS.stat(filePath))

		const data = new FormData()
		data.append('video', videoObj)

		const response = await axios.post(`${swingUrl}/upload/`, data, config)
		const taskId = response.data.task_id
		const progress = await axios.get(`${swingUrl}/progress/${taskId}`, config)
		console.log(`${swingUrl}/progress/${taskId}`)
		progressNotification('start', progress.data.progress.percent)
		getUploadProgress(taskId, token)
		return response
	}
	catch (err) {
		console.log(err)
	}
}

const getUploadProgress = async (taskId, authToken) => {
	const config = {
		headers: { Authorization: authToken }
	}
	try {
		const response = await axios.get(`${swingUrl}/progress/${taskId}`, config)
		progressNotification('update', response.data.progress.percent)
		if (!response.data.complete) {
			getUploadProgress(taskId, authToken)
		} 
		else {
			progressNotification('complete', response.data.result)
		}
	} catch (err) {
		console.warn(err)
	}
	
}

export default { uploadVideo }