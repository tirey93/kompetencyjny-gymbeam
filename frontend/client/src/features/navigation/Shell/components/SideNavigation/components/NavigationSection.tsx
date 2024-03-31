import { useLocation } from "react-router-dom";
import { Stack } from "@mantine/core";

import { NavigationTile, NavigationTileProps } from "./NavigationTile";

import classes from "./NavigationSection.module.scss";

type NavigationSectionProps = {
    tiles: NavigationTileProps[];
    onNavigate?: () => unknown;
};

export const NavigationSection = ({ tiles, onNavigate }: NavigationSectionProps) => {
    const { pathname } = useLocation();

    return (
        <Stack className={classes.navigationSection}>
            {tiles.map((tile) => (
                <NavigationTile {...tile} isActive={tile.route === pathname} key={tile.label} onNavigate={onNavigate} />
            ))}
        </Stack>
    );
};
