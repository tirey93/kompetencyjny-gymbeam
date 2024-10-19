import { ChangeEventHandler, useCallback } from "react";
import { Switch } from "@mantine/core";

import { useTheme } from "../../../theme";

export const HighContrastToggle = () => {
    const { isHighContrastModeEnabled, setIsHighContrastModeEnabled } = useTheme();

    const handleThemeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            setIsHighContrastModeEnabled(event.currentTarget.checked);
        },
        [setIsHighContrastModeEnabled]
    );

    return <Switch size="xs" onChange={handleThemeChange} defaultChecked={!!isHighContrastModeEnabled} />;
};
