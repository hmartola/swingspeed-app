import { Alert } from "react-native"

const newMessage = (message) => {
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

export default newMessage