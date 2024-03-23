import { ForwardRefExoticComponent, RefAttributes, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "@mantine/core";
import { Icon, IconProps } from "@tabler/icons-react";

import { Routes } from "../../../../../router/Routes";

export type NavigationTileProps = {
    label: string;
    route: Routes;
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
            color="primary"
            position="right"
            p="md"
            fw={600}
            withArrow
            arrowSize={8}
            transitionProps={{ transition: "pop" }}
        >
            <Button
                variant={isActive ? "gradient" : "subtle"}
                onClick={handleNavigation}
                data-active={isActive}
                color="primary"
                h="50px"
                w="50px"
                p={0}
            >
                <Icon width={20} height={20} />
            </Button>
        </Tooltip>
    );
};
