import { PropsWithChildren, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner-native";
import { TamaguiProvider } from "tamagui";

import { StyledAppProvider } from "@/components/AppProvider/styled";
import { config } from "@/lib/ui/config";

type AppProviderProps = PropsWithChildren;

const TOP_SAFE_AREA_OFFSET = 50;

export const AppProvider = ({ children }: AppProviderProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <StyledAppProvider.SafeAreaViewProvider>
                <GestureHandlerRootView>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                    <Toaster
                        position="top-center"
                        swipeToDismissDirection="left"
                        offset={TOP_SAFE_AREA_OFFSET}
                        richColors
                    />
                </GestureHandlerRootView>
            </StyledAppProvider.SafeAreaViewProvider>
        </TamaguiProvider>
    );
};
