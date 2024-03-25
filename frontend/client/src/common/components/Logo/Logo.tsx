import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconBarbell } from "@tabler/icons-react";

type LogoProps = {
    size?: "xl" | "md" | "sm";
    variant?: "gradient" | "default";
    withName?: boolean;
};

export const Logo = ({ size = "md", variant = "gradient", withName }: LogoProps) => {
    return (
        <Group>
            <ThemeIcon variant={variant} size={size}>
                <IconBarbell />
            </ThemeIcon>
            {withName && (
                <Text fw={600} size={size}>
                    GymBeam
                </Text>
            )}
        </Group>
    );
};
