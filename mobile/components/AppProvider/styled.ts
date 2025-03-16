import { SafeAreaView } from "react-native";
import { styled } from "tamagui";

export const StyledAppProvider = {
    SafeAreaViewProvider: styled(SafeAreaView, {
        backgroundColor: "$background",
        flex: 1,
    }),
};
