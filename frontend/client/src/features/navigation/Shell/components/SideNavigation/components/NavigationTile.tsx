import { ForwardRefExoticComponent, RefAttributes, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, Tooltip } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import { Routes } from "../../../../../router/Routes";

export type NavigationTileProps = {
    route: Routes;
    label: string;
    Icon: ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>;
    asyncBeforeRedirect?: () => Promise<unknown>;
    isActive?: boolean;
};

export const NavigationTile = ({ label, Icon, isActive, route, asyncBeforeRedirect }: NavigationTileProps) => {
    const navigate = useNavigate();

    const handleNavigation = useCallback(async () => {
        await asyncBeforeRedirect?.();
        navigate(route);
    }, [asyncBeforeRedirect, navigate, route]);

    return (
        <Tooltip
            label={label}
            position="right"
            p="md"
            fw={600}
            withArrow
            arrowSize={8}
            transitionProps={{ transition: "pop" }}
            visibleFrom="md"
            color="primary"
        >
            <Button
                variant={isActive ? "outline" : "subtle"}
                onClick={handleNavigation}
                data-active={isActive}
                miw="50px"
                h="50px"
            >
                <Icon width={25} height={25} />
                <Text ml="sm" hiddenFrom="md" size="lg" fw={700}>
                    {label}
                </Text>
            </Button>
        </Tooltip>
    );
};
