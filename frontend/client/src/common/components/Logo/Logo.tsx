import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconBarbell } from "@tabler/icons-react";

import classes from "./Logo.module.scss";

type LogoProps = {
    logoSize?: "xl" | "md" | "sm" | number;
    size?: "xl" | "md" | "sm";
    variant?: "gradient" | "default";
    withName?: boolean;
};

export const Logo = ({ logoSize, size = "md", variant = "gradient", withName }: LogoProps) => {
    return (
        <Group className={classes.logo}>
            <ThemeIcon variant={variant} size={logoSize ?? size}>
                <IconBarbell />
            </ThemeIcon>
            {withName && (
                <Text className={classes.logoText} size={size}>
                    GymBeam
                </Text>
            )}
        </Group>
    );
};
