import { SimpleGrid, Stack, ThemeIcon } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";

import { useAuthState } from "../../../common/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "./components";

import classes from "./GymPass.module.scss";

export const GymPassPage = () => {
    const { user } = useAuthState();

    if (!user) {
        return null;
    }

    return (
        <Stack className={classes.container}>
            <SimpleGrid cols={{ base: 1 }} className={classes.grid}>
                <Stack className={classes.qrWrapper}>
                    <Timestamp />
                    <GymPassQR qrValue={JSON.stringify(user)} />
                    <ThemeIcon className={classes.validCheck}>
                        <IconShield className={classes.validCheckIcon} />
                    </ThemeIcon>
                </Stack>
                <GymPassInfo owner={user} />
            </SimpleGrid>
        </Stack>
    );
};
