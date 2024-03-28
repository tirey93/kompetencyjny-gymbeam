import { SimpleGrid, Space, Stack } from "@mantine/core";

import { GymPassInfo } from "./components/GymPassInfo/GymPassInfo";
import { GymPassQR } from "./components/GymPassQR/GymPassQR";
import { Timestamp } from "./components/Timestamp/Timestamp";
import { useAuthState } from "../../../common/auth/hooks/useAuthState";

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
