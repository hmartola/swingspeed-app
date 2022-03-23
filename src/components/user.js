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
	} catch (e) {
		console.log(e)
	}
}

export const storeUserData = async (data) => {
	try {
		const username = await getUser()
		const value = JSON.stringify(data)
		await AsyncStorage.setItem(`${username}-data`, value)
	} catch (e) {
		console.warn(e)
	}
}

export const getUserData = async () => {
	try {
		const username = await getUser()
		const value = await AsyncStorage.getItem(`${username}-data`)
		return value != null ? JSON.parse(value) : null
	} catch (e) {
		console.warn(e)
	}
}

export const storeAuthToken = async (token) => {
	try {
		await AsyncStorage.setItem('authToken', token)
	} catch (e) {
		console.log(e)
	}
}

export const getAuthToken = async () => {
	try {
		const value = await AsyncStorage.getItem('authToken')
		if (value !== null) {
			return value
		}
	} catch (e) {
		console.log(e)
	}
}

export const storeProfilePictureFilePath = async (picture) => {
	try {
		const username = await getUser()
		await AsyncStorage.setItem(`${username}-profilePicture`, picture)
	} catch (e) {
		console.log(e)
	}
}

export const getProfilePictureFilePath = async () => {
	try {
		const username = await getUser()
		const value = await AsyncStorage.getItem(`${username}-profilePicture`)
		if (value !== null) {
			return value
		}
	} catch (e) {
		console.log(e)
	}
}

