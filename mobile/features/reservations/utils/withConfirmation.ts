import { Alert } from "react-native";

export const withConfirmation = (
    message: string,
    onConfirm: () => void
) => {
    Alert.alert(
        "Confirmation",
        message,
        [
            { text: "No", style: "cancel" },
            {
                text: "Yes",
                style: "destructive",
                onPress: onConfirm,
            },
        ],
        { cancelable: true }
    );
};
