import { useMemo } from "react";
import { Box, Group, Text } from "@mantine/core";

import classes from "./UserShortInfo.module.scss";

import { UserAvatar } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

type UserShortInfoProps = {
    user: UserDetails;
};

export const UserShortInfo = ({ user }: UserShortInfoProps) => {
    const translate = useTranslate();

    const userData = useMemo(
        () => [
            {
                label: translate("user.id"),
                value: user.id,
            },
            {
                label: translate("user.name"),
                value: user.displayName,
            },
            {
                label: translate("user.login"),
                value: user.name,
            },
        ],
        [translate, user.displayName, user.id, user.name]
    );

    return (
        <Group className={classes.userShortInfoContainer}>
            <UserAvatar user={user} />
            {userData.map(({ label, value }) => (
                <Box key={label}>
                    <Text className={classes.userDataLabel}>{label}</Text>
                    <Text className={classes.userDataValue}>{value}</Text>
                </Box>
            ))}
        </Group>
    );
};
