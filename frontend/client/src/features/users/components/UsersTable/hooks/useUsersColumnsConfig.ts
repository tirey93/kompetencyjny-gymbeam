import { SortableTableColumnsConfig } from "@/components/Table";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

export const useUsersColumnsConfig = (): SortableTableColumnsConfig<UserDetails>[] => {
    const translate = useTranslate();

    return [
        {
            children: translate("pages.usersDashboard.header.id"),
            column: "id",
            ta: "center",
        },
        {
            children: translate("pages.usersDashboard.header.user"),
            column: "displayName",
            colSpan: 2,
        },
        {
            children: translate("pages.usersDashboard.header.login"),
            column: "name",
        },
        {
            children: translate("pages.usersDashboard.header.role"),
            column: "role",
            ta: "center",
        },
        {
            children: translate("pages.usersDashboard.header.reservations"),
            column: "reservationDisabled",
            ta: "center",
        },
    ];
};
