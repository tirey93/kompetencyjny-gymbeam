import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { AppProvider } from "@/components/AppProvider/AppProvider";

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
            <Slot />
            <StatusBar style="auto" />
        </AppProvider>
    );
}
