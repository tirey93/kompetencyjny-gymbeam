import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { AppProvider } from "@/components/AppProvider/AppProvider";
import { Screens } from "@/constants/Screens";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    useEffect(() => {
        if (!loaded) {
            return;
        }

        void SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AppProvider>
            <Stack>
                <Stack.Screen name={Screens.Landing} options={{ headerShown: false }} />
                <Stack.Screen name={Screens.Dashboard} options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </AppProvider>
    );
}
