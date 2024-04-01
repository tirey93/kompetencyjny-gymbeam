import { Box, Stack, Text } from "@mantine/core";

import { UserDetails } from "../../../../../common/auth";
import { UserReservationsPermissionBadge } from "../../../../../common/components/User";
import { useTranslate } from "../../../../../common/i18n";

import classes from "./GymPassInfo.module.scss";

type GymPassInfoProps = {
    owner: UserDetails;
};

export const GymPassInfo = ({ owner }: GymPassInfoProps) => {
    const translate = useTranslate();

    return (
        <Stack className={classes.container}>
            <Box>
                <Text className={classes.label}>{translate("pages.qr.gymPassDetails.owner")}</Text>
                <Text>{owner.name}</Text>
            </Box>
            <Box>
                <Text className={classes.label}>{translate("pages.qr.gymPassDetails.reservationsPermission")}</Text>
                <UserReservationsPermissionBadge disabled={owner.reservationDisabled} />
            </Box>
        </Stack>
    );
};
