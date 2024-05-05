import { ActionIcon, Group, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Activity } from "../../../../../common/activities/Activities";
import { Days, TextWithTooltip } from "../../../../../common/components/DataDisplay";
import { useDateTimeLocale } from "../../../../../common/hooks";

import classes from "./ActivityRow.module.scss";

type ActivityRowProps = {
    activity: Activity;
    onEdit: (activity: Activity) => unknown;
    onDelete: (activity: Activity) => unknown;
};

export const ActivityRow = ({ activity, onEdit, onDelete }: ActivityRowProps) => {
    const { locale } = useDateTimeLocale();

    return (
        <Table.Tr key={activity.id} className={classes.row}>
            <Table.Td className={classes.center}>{activity.id}</Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <TextWithTooltip>{activity.name}</TextWithTooltip>
            </Table.Td>

            <Table.Td>{activity.startTime.toLocaleDateString(locale)}</Table.Td>
            <Table.Td>{activity.endTime.toLocaleDateString(locale)}</Table.Td>
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
