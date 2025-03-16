import { PropsWithChildren, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { TamaguiProvider } from "tamagui";

import { StyledAppProvider } from "@/components/AppProvider/styled";
import { Scrollable } from "@/components/Scrollable/Scrollable";
import { config } from "@/lib/ui/config";

type AppProviderProps = PropsWithChildren;

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <StyledAppProvider.SafeAreaViewProvider>
                <Scrollable>
                    <GestureHandlerRootView>
                        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                        <Toaster position="top-center" />
                    </GestureHandlerRootView>
                </Scrollable>
            </StyledAppProvider.SafeAreaViewProvider>
        </TamaguiProvider>
    );
};
