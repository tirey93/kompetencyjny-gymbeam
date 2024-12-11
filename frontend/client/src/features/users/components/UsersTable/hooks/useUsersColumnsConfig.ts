import { SortableTableColumnsConfig } from "@/components/Table";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

export const useUsersColumnsConfig = (): SortableTableColumnsConfig<User>[] => {
    const translate = useTranslate();

    return [
        {
            children: translate("pages.usersDashboard.header.id"),
            column: "id",
            ta: "center",
        },
        {
            children: translate("pages.usersDashboard.header.user"),
            column: "name",
            colSpan: 2,
        },
        {
            children: translate("pages.usersDashboard.header.login"),
            column: "login",
        },
        {
            children: translate("pages.usersDashboard.header.gymPassExpirationTime"),
            column: "gymPassExpirationTime",
        },
        {
            children: translate("pages.usersDashboard.header.role"),
            column: "role",
            ta: "center",
        },
        {
            children: translate("pages.usersDashboard.header.reservations"),
            column: "areReservationsForbidden",
            ta: "center",
        },
    ];
};
