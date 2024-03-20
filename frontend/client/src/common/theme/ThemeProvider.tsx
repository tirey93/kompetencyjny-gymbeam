import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";

import { theme } from "./theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
        </MantineProvider>
    );
};
