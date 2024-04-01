import { SimpleGrid, Stack } from "@mantine/core";

import { useAuthState } from "../../../common/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "./components";

import classes from "./GymPass.module.scss";

export const GymPassPage = () => {
    const currentUserDetails = useAuthState((state) => state.currentUserDetails);

    if (!currentUserDetails) {
        return null;
    }

    return (
        <Stack className={classes.container}>
            <SimpleGrid cols={{ base: 1 }} className={classes.grid}>
                <Stack className={classes.qrWrapper}>
                    <Timestamp />
                    <GymPassQR qrValue={JSON.stringify(currentUserDetails)} />
                </Stack>
                <GymPassInfo owner={currentUserDetails} />
            </SimpleGrid>
        </Stack>
    );
};
