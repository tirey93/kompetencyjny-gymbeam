import { Alert } from "react-native";

export const withConfirmation = (
    message: string,
    onConfirm: () => void
) => {
    Alert.alert(
        "Confirmation",
        message,
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: onConfirm,
            },
        ],
        { cancelable: true }
    );
};
