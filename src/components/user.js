import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
    } catch (e) {
      console.log(e)
    }
  }

  
export const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if (value !== null) {
        return value
      }
    } catch(e) {
      console.log(e) 
    }
  }

export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token)
  } catch(e) {
    console.log(e)
  }
}

export const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken')
    if (value !== null) {
      return value
    }
  } catch(e) {
    console.log(e) 
  }
}

  