import { Activity } from "../../../../common/activities/Activities";
import { SortableTableColumnsConfig } from "../../../../common/components/Table";

export const useActivitiesColumnsConfig = (): SortableTableColumnsConfig<Activity>[] => {
    return [
        {
            children: "ID",
            column: "id",
            ta: "center",
        },
        {
            children: "Name",
            column: "name",
        },
        {
            children: "Start Time",
            column: "startTime",
        },
        {
            children: "End Time",
            column: "endTime",
        },
        {
            children: "Start Hour",
            column: "startHour",
            disableSort: true,
        },
        {
            children: "Duration",
            column: "duration",
        },
        {
            children: "Weekdays",
            column: "weekdays",
            disableSort: true,
        },
        {
            children: "Capacity",
            column: "totalCapacity",
        },
        {
            children: "Description",
            column: "longDescription",
            disableSort: true,
        },
        {
            children: "Summary",
            column: "shortDescription",
            disableSort: true,
        },
        {
            children: "Leader",
            column: "leaderName",
        },
    ];
};
