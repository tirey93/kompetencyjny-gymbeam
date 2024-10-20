import { Box, Stack, Text } from "@mantine/core";

import classes from "./GymPassInfo.module.scss";

import { UserReservationsPermissionBadge } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

type GymPassInfoProps = {
    owner: UserDetails;
};

export const GymPassInfo = ({ owner }: GymPassInfoProps) => {
    const translate = useTranslate();

    return (
        <Stack className={classes.container}>
            <Box>
                <Text className={classes.label}>{translate("pages.qr.gymPassDetails.owner")}</Text>
                <Text className={classes.ownerName}>{owner.name}</Text>
            </Box>
            <Box>
                <Text className={classes.label}>{translate("pages.qr.gymPassDetails.reservationsPermission")}</Text>
                <UserReservationsPermissionBadge disabled={owner.reservationDisabled} />
            </Box>
        </Stack>
    );
};
