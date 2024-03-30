import { useMemo } from "react";
import { Box, Group, Text } from "@mantine/core";

import { UserDetails } from "../../../auth";
import { useTranslate } from "../../../i18n";
import { UserAvatar } from "../UserAvatar/UserAvatar";

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
        <Group justify="center" my="md">
            <UserAvatar user={user} />
            {userData.map(({ label, value }) => (
                <Box key={label}>
                    <Text size="xs" c="dimmed">
                        {label}
                    </Text>
                    <Text size="sm" fw={700} ta="center">
                        {value}
                    </Text>
                </Box>
            ))}
        </Group>
    );
};
