import { UserDetails } from "../../../../../../common/auth";
import { SortableTableColumnsConfig } from "../../../../../../common/components/Table";
import { useTranslate } from "../../../../../../common/i18n";

export const useUsersColumnsConfig = (): SortableTableColumnsConfig<UserDetails>[] => {
    const translate = useTranslate();

    return [
        {
            children: translate("pages.adminDashboard.usersPanel.header.id"),
            column: "id",
            ta: "center",
        },
        {
            children: translate("pages.adminDashboard.usersPanel.header.user"),
            column: "displayName",
            colSpan: 2,
        },
        {
            children: translate("pages.adminDashboard.usersPanel.header.login"),
            column: "name",
        },
        {
            children: translate("pages.adminDashboard.usersPanel.header.role"),
            column: "role",
            ta: "center",
        },
        {
            children: translate("pages.adminDashboard.usersPanel.header.reservations"),
            column: "reservationDisabled",
            ta: "center",
        },
    ];
};
