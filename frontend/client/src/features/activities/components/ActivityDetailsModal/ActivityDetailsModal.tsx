import { useCallback } from "react";
import { Box, Group, Stack, Text } from "@mantine/core";
import { ContextModalProps, modals } from "@mantine/modals";

import classes from "./ActivityDetailsModal.module.scss";

import { ErrorMessage } from "@/components/DataDisplay";
import { Modal } from "@/components/Modals";
import { WEEKDAYS } from "@/constants";
import { useActivity } from "@/features/activities";
import { useDateTimeLocale } from "@/hooks";
import { useTranslate } from "@/lib/i18n";

type ActivityDetailsModalProps = ContextModalProps<{
    activityId: number;
}>;

export const ActivityDetailsModal = ({ innerProps: { activityId }, id }: ActivityDetailsModalProps) => {
    const translate = useTranslate();
    const { locale } = useDateTimeLocale();

    const { activity, error, refetch, isLoading } = useActivity(activityId);

    const onClose = useCallback(() => {
        modals.close(id);
    }, [id]);

    if (isLoading) {
        return <Modal.Loader />;
    }

    return (
        <Modal.Wrapper className={classes.container}>
            {activity ? (
                <>
                    <Modal.Title>{activity.name}</Modal.Title>
                    <Modal.Body>
                        <Stack>
                            <Box className={classes.field}>
                                <Text className={classes.title}>{translate("activity.summary")}</Text>
                                <Text className={classes.caption}>{activity.shortDescription}</Text>
                            </Box>

                            <Group className={classes.group}>
                                <Box className={classes.field}>
                                    <Text className={classes.title}>{translate("activity.leader")}</Text>
                                    <Text className={classes.caption}>{activity.leaderName}</Text>
                                </Box>

                                <Box className={classes.field}>
                                    <Text className={classes.title}>{translate("activity.capacity")}</Text>
                                    <Text className={classes.caption}>{activity.totalCapacity}</Text>
                                </Box>

                                <Box className={classes.field}>
                                    <Text className={classes.title}>{translate("activity.duration")}</Text>
                                    <Text className={classes.caption}>{activity.duration} min</Text>
                                </Box>
                            </Group>

                            <Group className={classes.group}>
                                <Box className={classes.field}>
                                    <Text className={classes.title}>{translate("activity.period")}</Text>
                                    <Text className={classes.caption}>
                                        {activity.startTime.toLocaleDateString(locale)} -{" "}
                                        {activity.endTime.toLocaleDateString(locale)}
                                    </Text>
                                </Box>

                                <Box className={classes.field}>
                                    <Text className={classes.title}>{translate("activity.startTime")}</Text>
                                    <Text className={classes.caption}>
                                        {activity.startHour.toLocaleTimeString(locale, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Text>
                                </Box>
                            </Group>

                            <Box className={classes.field}>
                                <Text className={classes.title}>{translate("activity.days")}</Text>
                                <Text className={classes.caption}>
                                    {activity.days.map((day) => translate(WEEKDAYS[day].long)).join(", ")}
                                </Text>
                            </Box>

                            <Box className={classes.field}>
                                <Text className={classes.title}>{translate("activity.description")}</Text>
                                <Text className={classes.caption}>{activity.longDescription}</Text>
                            </Box>
                        </Stack>
                    </Modal.Body>
                </>
            ) : (
                <>
                    <Modal.Title>{translate("modals.activities.details.title.error")}</Modal.Title>
                    <ErrorMessage>{error}</ErrorMessage>
                </>
            )}
            <Modal.Footer
                submitButton={
                    error
                        ? { onClick: refetch, children: translate("modals.activities.details.buttons.retry") }
                        : undefined
                }
                cancelButton={{
                    onClick: onClose,
                    children: translate("modals.activities.details.buttons.close"),
                }}
            />
        </Modal.Wrapper>
    );
};
