import { SimpleGrid, Space, Stack } from "@mantine/core";

import { useAuthState } from "../../../common/auth";
import { GymPassInfo, GymPassQR, Timestamp } from "./components";

export const GymPassPage = () => {
    const currentUserDetails = useAuthState((state) => state.currentUserDetails);
    const nextMonthDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

    if (!currentUserDetails) {
        return null;
    }

    return (
        <Stack maw="600px" mih="80vh" m="auto" justify="center">
            <SimpleGrid cols={{ base: 1 }} mx="auto">
                <Stack align="center">
                    <Timestamp />
                    <GymPassQR qrValue={JSON.stringify(currentUserDetails)} />
                </Stack>
                <Space h="sm" />
                <GymPassInfo owner={currentUserDetails.name} expirationDate={nextMonthDate} />
            </SimpleGrid>
        </Stack>
    );
};
