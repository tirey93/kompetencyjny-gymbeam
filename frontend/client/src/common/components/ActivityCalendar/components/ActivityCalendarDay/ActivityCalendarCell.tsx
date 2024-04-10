import { Table } from "@mantine/core";
import classNames from "classnames";

import { ActivityItemCard, ActivityItemCardProps } from "../ActivityItemCard/ActivityItemCard";

import classes from "./ActivityCalendarDay.module.scss";

type ActivityCalendarCellProps = {
    activities: ActivityItemCardProps[];
    disabled?: boolean;
};

export const ActivityCalendarCell = ({ activities, disabled }: ActivityCalendarCellProps) => {
    return (
        <Table.Td className={classNames(classes.container, { [classes.disabled]: disabled })}>
            {activities.map((activity) => (
                <ActivityItemCard key={activity.startsAt.toLocaleTimeString()} {...activity} />
            ))}
        </Table.Td>
    );
};
