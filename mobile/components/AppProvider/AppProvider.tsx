import { PropsWithChildren } from "react";
import { TamaguiProvider } from "tamagui";

import { config } from "@/lib/ui/config";

type AppProviderProps = PropsWithChildren;

export const AppProvider = ({ children }: AppProviderProps) => {
    return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
};
