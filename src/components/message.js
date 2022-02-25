import { Alert } from "react-native"

export const errorMessage = (message) => {
	Alert.alert(
		'Error',
		message,
		[
			{
				text: 'OK'
			}
		]
	)
}

export const successMessage = (message) => {
	Alert.alert(
		'Success',
		message,
		[
			{
				text: 'OK'
			}
		]
	)
}