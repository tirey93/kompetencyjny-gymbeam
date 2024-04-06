import { ForwardRefExoticComponent, RefAttributes, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, Tooltip } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import { AppRoute } from "../../../../../router";

import classes from "./NavigationTile.module.scss";

export type NavigationTileProps = {
    route: AppRoute;
    label: string;
    Icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
    asyncBeforeRedirect?: () => Promise<unknown>;
    isActive?: boolean;
    onNavigate?: () => unknown;
};

export const NavigationTile = ({
    label,
    Icon,
    isActive,
    route,
    onNavigate,
    asyncBeforeRedirect,
}: NavigationTileProps) => {
    const navigate = useNavigate();

    const handleNavigation = useCallback(async () => {
        await asyncBeforeRedirect?.();
        navigate(route);
        onNavigate?.();
    }, [asyncBeforeRedirect, navigate, onNavigate, route]);

    return (
        <Tooltip
            className={classes.navigationTileTooltip}
            label={label}
            transitionProps={{ transition: "pop" }}
            position="right"
            visibleFrom="md"
            color="primary"
            arrowSize={8}
            withArrow
        >
            <Button
                className={classes.navigationTile}
                variant={isActive ? "outline" : "subtle"}
                onClick={handleNavigation}
                data-active={isActive}
            >
                <Icon />
                <Text className={classes.iconLabel} hiddenFrom="sm">
                    {label}
                </Text>
            </Button>
        </Tooltip>
    );
};
