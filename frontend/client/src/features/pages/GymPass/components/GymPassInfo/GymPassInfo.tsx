import { Box, Stack, Text } from "@mantine/core";

import { useTranslate } from "../../../../../common/i18n/hooks/useTranslate";

type GymPassInfoProps = {
    owner: string;
    expirationDate: Date;
};

export const GymPassInfo = ({ owner, expirationDate }: GymPassInfoProps) => {
    const translate = useTranslate();

    return (
        <Stack>
            <Box>
                <Text fw={700} size="xs">
                    {translate("pages.qr.gymPassDetails.owner")}
                </Text>
                <Text>{owner}</Text>
            </Box>
            <Box>
                <Text fw={700} size="xs">
                    {translate("pages.qr.gymPassDetails.expires")}
                </Text>
                <Text>{expirationDate.toLocaleDateString()}</Text>
            </Box>
        </Stack>
    );
};
