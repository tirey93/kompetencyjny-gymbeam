import { useTheme } from "tamagui";

import { mapActivityNameToIcon } from "@/features/activities/components/ActivityIcon/utils/mapActivityNameToIcon";

const ICON_SIZE = 24;

type ActivityIconProps = {
    name: string;
};

export const ActivityIcon = ({ name }: ActivityIconProps) => {
    const theme = useTheme();
    const { component: Component, name: iconName } = mapActivityNameToIcon(name);

    return <Component name={iconName} size={ICON_SIZE} color={theme.secondary10?.val} />;
};
