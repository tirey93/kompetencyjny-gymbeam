import { Stack } from "@mantine/core";

import { NavigationTile, NavigationTileProps } from "./NavigationTile";

type NavigationSectionProps = {
    tiles: NavigationTileProps[];
};

export const NavigationSection = ({ tiles }: NavigationSectionProps) => {
    return (
        <Stack justify="center" gap="sm" mt="xl">
            {tiles.map((tile) => (
                <NavigationTile {...tile} key={tile.label} />
            ))}
        </Stack>
    );
};
