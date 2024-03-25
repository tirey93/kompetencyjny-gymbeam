import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";

import { NavigationTile, NavigationTileProps } from "./NavigationTile";

type NavigationSectionProps = {
    tiles: NavigationTileProps[];
};

export const NavigationSection = ({ tiles }: NavigationSectionProps) => {
    const { pathname } = useLocation();

    return (
        <Stack justify="center" gap="sm" mt="xl">
            {tiles.map((tile) => (
                <NavigationTile {...tile} isActive={tile.route === pathname} key={tile.label} />
            ))}
        </Stack>
    );
};
