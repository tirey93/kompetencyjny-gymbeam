import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Group, Table, ThemeIcon } from "@mantine/core";
import { IconHelpSquareRounded, IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import classNames from "classnames";

import classes from "./ActivityRow.module.scss";

import { AppRoute } from "@/app/router";
import { Days, TextWithTooltip } from "@/components/DataDisplay";
import { useDateTimeLocale } from "@/hooks";
import { useTranslate } from "@/lib/i18n";
import { Activity } from "@/types";

type ActivityRowProps = {
    activity: Activity;
    onEdit: (activity: Activity) => unknown;
    onDelete: (activity: Activity) => unknown;
};

export const ActivityRow = ({ activity, onEdit, onDelete }: ActivityRowProps) => {
    const { locale } = useDateTimeLocale();
    const translate = useTranslate();
    const navigate = useNavigate();

    const isExpired = activity.endTime < new Date();
    const hasNotStarted = activity.startTime > new Date();

    const searchForActivityInstances = useCallback(() => {
        navigate(AppRoute.ACTIVITIES, { state: { filteredActivityName: activity.name } });
    }, [activity.name, navigate]);

    return (
        <Table.Tr key={activity.id} className={classes.row}>
            <Table.Td className={classNames(classes.center, classes.columnLabel)}>{activity.id}</Table.Td>

            <Table.Td>
                <Group className={classes.cellContentWrapper}>
                    {activity.name}
                    <ActionIcon onClick={searchForActivityInstances} className={classes.icon} variant="transparent">
                        <IconSearch />
                    </ActionIcon>
                </Group>
            </Table.Td>

            <Table.Td className={classNames(classes.date, { [classes.future]: hasNotStarted })}>
                <TextWithTooltip
                    alwaysVisible={hasNotStarted}
                    label={translate("pages.activitiesDashboard.notStarted")}
                >
                    <Group className={classes.cellContentWrapper}>
                        {activity.startTime.toLocaleDateString(locale)}
                        {hasNotStarted && (
                            <ThemeIcon className={classes.icon} variant="transparent" color="warning">
                                <IconHelpSquareRounded />
                            </ThemeIcon>
                        )}
                    </Group>
                </TextWithTooltip>
            </Table.Td>

            <Table.Td className={classNames(classes.date, { [classes.past]: isExpired })}>
                <TextWithTooltip alwaysVisible={isExpired} label={translate("pages.activitiesDashboard.expired")}>
                    <Group className={classes.cellContentWrapper}>
                        {activity.endTime.toLocaleDateString(locale)}
                        {isExpired && (
                            <ThemeIcon className={classes.icon} variant="transparent" color="danger">
                                <IconHelpSquareRounded />
                            </ThemeIcon>
                        )}
                    </Group>
                </TextWithTooltip>
            </Table.Td>

            <Table.Td>{activity.startHour.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}</Table.Td>
            <Table.Td>{activity.duration} min</Table.Td>

            <Table.Td>
                <Days value={activity.days} />
            </Table.Td>

            <Table.Td>{activity.totalCapacity}</Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <TextWithTooltip>{activity.leaderName}</TextWithTooltip>
            </Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <TextWithTooltip>{activity.longDescription}</TextWithTooltip>
            </Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <TextWithTooltip>{activity.shortDescription}</TextWithTooltip>
            </Table.Td>

            <Table.Td className={classes.pinned}>
                <Group className={classes.actionButtons}>
                    <ActionIcon variant="subtle" color="success" onClick={() => onEdit(activity)}>
                        <IconPencil />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="danger" onClick={() => onDelete(activity)}>
                        <IconTrash />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
};
