import { PropsWithChildren } from "react";
import { Group, Text } from "@mantine/core";

import classes from "./SettingsMenuItem.module.scss";

type SettingsMenuItemProps = PropsWithChildren<{
    label: string;
}>;

export const SettingsMenuItem = ({ label, children }: SettingsMenuItemProps) => {
    return (
        <Group className={classes.container}>
            <Text className={classes.label}>{label}</Text>
            {children}
        </Group>
    );
};
