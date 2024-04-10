import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Box, Group, Stack, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classNames from "classnames";

import { Activity } from "../../../../../common/activities/Activities";
import { AppRoute } from "../../../../router";

import classes from "./ActivityCard.module.scss";

type ActivityCardProps = {
    activity: Activity;
};

export const ActivityCard = ({ activity }: ActivityCardProps) => {
    const navigate = useNavigate();

    const goToActivitiesList = useCallback(() => {
        navigate(AppRoute.ACTIVITIES);
    }, [navigate]);

    return (
        <Box className={classes.container}>
            <Stack className={classes.header}>
                <Group className={classes.headerTopRow}>
                    <Title className={classes.activityName}>{activity.name}</Title>
                    <ActionIcon
                        variant="light"
                        color="secondary"
                        className={classes.searchIcon}
                        onClick={goToActivitiesList}
                    >
                        <IconX />
                    </ActionIcon>
                </Group>

                <Text className={classes.description}>{activity.longDescription}</Text>
            </Stack>

            <Group className={classes.footer}>
                <Box className={classes.attribute}>
                    <Text className={classes.label}>Czas trwania</Text>
                    <Text className={classes.attributeValue}>50 min</Text>
                </Box>

                <Box className={classes.attribute}>
                    <Text className={classes.label}>Limit osób</Text>
                    <Text className={classes.attributeValue}>25</Text>
                </Box>

                <Box className={classes.attribute}>
                    <Text className={classes.label}>Prowadzący</Text>
                    <Text className={classNames(classes.leaderName, classes.attributeValue)}>Jan Kowalski</Text>
                </Box>
            </Group>
        </Box>
    );
};
