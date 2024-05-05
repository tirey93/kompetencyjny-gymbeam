import { Activity } from "../../../../common/activities";
import { SortableTableColumnsConfig } from "../../../../common/components/Table";
import { useTranslate } from "../../../../common/i18n";

export const useActivitiesColumnsConfig = (): SortableTableColumnsConfig<Activity>[] => {
    const translate = useTranslate();

    return [
        {
            children: translate("pages.activitiesDashboard.header.id"),
            column: "id",
            ta: "center",
        },
        {
            children: translate("pages.activitiesDashboard.header.name"),
            column: "name",
        },
        {
            children: translate("pages.activitiesDashboard.header.startTime"),
            column: "startTime",
        },
        {
            children: translate("pages.activitiesDashboard.header.endTime"),
            column: "endTime",
        },
        {
            children: translate("pages.activitiesDashboard.header.startHour"),
            column: "startHour",
            disableSort: true,
        },
        {
            children: translate("pages.activitiesDashboard.header.duration"),
            column: "duration",
        },
        {
            children: translate("pages.activitiesDashboard.header.days"),
            column: "days",
            disableSort: true,
        },
        {
            children: translate("pages.activitiesDashboard.header.totalCapacity"),
            column: "totalCapacity",
        },
        {
            children: translate("pages.activitiesDashboard.header.leaderName"),
            column: "leaderName",
        },
        {
            children: translate("pages.activitiesDashboard.header.longDescription"),
            column: "longDescription",
            disableSort: true,
        },
        {
            children: translate("pages.activitiesDashboard.header.shortDescription"),
            column: "shortDescription",
            disableSort: true,
        },
    ];
};
