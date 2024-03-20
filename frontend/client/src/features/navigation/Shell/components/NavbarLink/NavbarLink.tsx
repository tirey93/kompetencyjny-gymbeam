import { Box } from "@mantine/core";

import { Routes } from "../../../../router/Routes";

type NavbarLinkProps = {
    route: Routes;
    text: string;
};

export const NavbarLink = ({ route, text }: NavbarLinkProps) => {
    return (
        <Box component="a" href={route}>
            {text}
        </Box>
    );
};
