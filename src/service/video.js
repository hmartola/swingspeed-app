import axios from "axios"
import RNFS from 'react-native-fs'

import { BASE_URL } from "../utils/config"
import { getAuthToken } from "../components/user"

const swingUrl = `${BASE_URL}/swings`

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
    console.log('video, 24',filePath)
    const videoObj = {
      uri: filePath,
      name: fileName,
      type: 'video/mp4'
    } 
    console.log(await RNFS.stat(filePath))
    
    const data = new FormData()
    data.append('video', videoObj)

    const response = await axios.post(`${swingUrl}/upload/`, data, config)
    return response
  } 
  catch (err) {
    console.log(err)
  }
}

export default { uploadVideo }