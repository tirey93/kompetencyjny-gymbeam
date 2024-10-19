import { useMemo } from "react";

import { useStorage } from "../../hooks/useStorage";
import { darkTheme, highContrastTheme } from "../theme";

const HIGH_CONTRAST_KEY = "high-contrast-enabled";

export const useTheme = () => {
    const [isHighContrastModeEnabled, setIsHighContrastModeEnabled] = useStorage<boolean>(HIGH_CONTRAST_KEY);

    const theme = useMemo(() => {
        if (isHighContrastModeEnabled) {
            return highContrastTheme;
        } else {
            return darkTheme;
        }
    }, [isHighContrastModeEnabled]);

    return useMemo(
        () => ({
            theme,
            isHighContrastModeEnabled,
            setIsHighContrastModeEnabled,
        }),
        [isHighContrastModeEnabled, setIsHighContrastModeEnabled, theme]
    );
};
