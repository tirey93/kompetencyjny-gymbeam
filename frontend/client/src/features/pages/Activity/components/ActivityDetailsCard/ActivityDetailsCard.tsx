import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Box, Group, Stack, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classNames from "classnames";

import { Activity } from "../../../../../common/activities";
import { useTranslate } from "../../../../../common/i18n";

import classes from "./ActivityDetailsCard.module.scss";

type ActivityDetailsCardProps = {
    activity: Pick<Activity, "name" | "leaderName" | "longDescription" | "duration" | "totalCapacity">;
};

export const ActivityDetailsCard = ({
    activity: { name, leaderName, duration, totalCapacity, longDescription },
}: ActivityDetailsCardProps) => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <Box className={classes.container}>
            <Stack className={classes.header}>
                <Group className={classes.headerTopRow}>
                    <Title className={classes.activityName}>{name}</Title>
                    <ActionIcon variant="light" color="secondary" className={classes.searchIcon} onClick={goBack}>
                        <IconX />
                    </ActionIcon>
                </Group>

                <Text className={classes.description}>{longDescription}</Text>
            </Stack>

            <Group className={classes.footer}>
                <Box className={classes.attribute}>
                    <Text className={classes.label}>{translate("pages.activities.details.duration")}</Text>
                    <Text className={classes.attributeValue}>{duration} min</Text>
                </Box>

                <Box className={classes.attribute}>
                    <Text className={classes.label}>{translate("pages.activities.details.capacity")}</Text>
                    <Text className={classes.attributeValue}>{totalCapacity}</Text>
                </Box>

                <Box className={classes.attribute}>
                    <Text className={classes.label}>{translate("pages.activities.details.leader")}</Text>
                    <Text className={classNames(classes.leaderName, classes.attributeValue)}>{leaderName}</Text>
                </Box>
            </Group>
        </Box>
    );
};
