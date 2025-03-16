import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "tamagui";

export const Scrollable = ({ children }: PropsWithChildren) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};
