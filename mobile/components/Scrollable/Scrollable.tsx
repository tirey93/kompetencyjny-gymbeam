import { forwardRef, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "tamagui";

export const Scrollable = forwardRef<SafeAreaView, PropsWithChildren>(({ children }: PropsWithChildren, ref) => {
    return (
        <SafeAreaView style={{ flex: 1 }} ref={ref}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                {children}
            </ScrollView>
        </SafeAreaView>
    );
});

Scrollable.displayName = "Scrollable";
