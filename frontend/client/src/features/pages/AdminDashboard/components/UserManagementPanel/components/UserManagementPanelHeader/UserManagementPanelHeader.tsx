import { Table } from "@mantine/core";

import { UserDetails } from "../../../../../../../common/auth";
import { SortableTableHeader, SortableTableHeaderProps } from "../../../../../../../common/components/Table";
import { useTranslate } from "../../../../../../../common/i18n";

import classes from "./UserManagementPanelHeader.module.scss";

type UserManagementPanelHeaderProps = {
    onSort: (column: keyof UserDetails) => unknown;
    sortBy: keyof UserDetails | null;
    sortDirection: "ASC" | "DESC" | null;
};

export const UserManagementPanelHeader = ({ onSort, sortBy, sortDirection }: UserManagementPanelHeaderProps) => {
    const translate = useTranslate();

    const sortableColumns: (Partial<SortableTableHeaderProps> & { column: keyof UserDetails })[] = [
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

    return (
        <Table.Thead>
            <Table.Tr className={classes.tableRow}>
                {sortableColumns.map(({ column, children, ...rest }) => (
                    <SortableTableHeader
                        key={column}
                        {...rest}
                        onSort={() => onSort(column)}
                        sorted={sortBy === column}
                        reversed={sortDirection === "DESC"}
                    >
                        {children}
                    </SortableTableHeader>
                ))}
            </Table.Tr>
        </Table.Thead>
    );
};
