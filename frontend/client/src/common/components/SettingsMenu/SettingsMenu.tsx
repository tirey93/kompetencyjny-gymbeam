import { ActionIcon, Popover, Stack, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

import { HighContrastToggle } from "./components/HighContrastToggle";
import { LanguageSelect } from "./components/LanguageSelect";
import { SettingsMenuItem } from "./components/SettingsMenuItem";
import { useTranslate } from "../../i18n";

import classes from "./SettingsMenu.module.scss";

export const SettingsMenu = () => {
    const t = useTranslate();

    return (
        <Popover trapFocus withArrow>
            <Popover.Target>
                <ActionIcon variant="default" size="xl">
                    <IconSettings />
                </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown>
                <Stack className={classes.dropdown}>
                    <Text className={classes.title}>{t("settings.header")}</Text>
                    <SettingsMenuItem label={t("settings.contrast.label")}>
                        <HighContrastToggle />
                    </SettingsMenuItem>
                    <SettingsMenuItem label={t("settings.language.label")}>
                        <LanguageSelect />
                    </SettingsMenuItem>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
};
