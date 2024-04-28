import { ActionIcon, Group, Table } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { Activity } from "../../../../../common/activities/Activities";
import { TextWithTooltip } from "../../../../../common/components/DataDisplay";
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
            <Table.Td>{activity.id}</Table.Td>

            <Table.Td>
                <TextWithTooltip>{activity.name}</TextWithTooltip>
            </Table.Td>

            <Table.Td>{activity.startTime.toLocaleDateString(locale)}</Table.Td>
            <Table.Td>{activity.endTime.toLocaleDateString(locale)}</Table.Td>
            <Table.Td>{activity.duration} min</Table.Td>
            <Table.Td>{activity.totalCapacity}</Table.Td>

            <Table.Td>
                <TextWithTooltip>{activity.longDescription}</TextWithTooltip>
            </Table.Td>

            <Table.Td>
                <TextWithTooltip>{activity.shortDescription}</TextWithTooltip>
            </Table.Td>

            <Table.Td>
                <TextWithTooltip>{activity.leaderName}</TextWithTooltip>
            </Table.Td>

            <Table.Td>{activity.cron}</Table.Td>

            <Table.Td>
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
