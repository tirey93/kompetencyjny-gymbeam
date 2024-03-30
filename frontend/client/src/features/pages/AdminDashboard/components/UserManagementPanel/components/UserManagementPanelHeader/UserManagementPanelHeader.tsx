import { Table } from "@mantine/core";

import { SortableTableHeader } from "../../../../../../../common/components/Table";
import { useTranslate } from "../../../../../../../common/i18n";

export const UserManagementPanelHeader = () => {
    const translate = useTranslate();

    return (
        <Table.Thead>
            <Table.Tr ta="center">
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")} ta="center">
                    {translate("pages.adminDashboard.usersPanel.header.id")}
                </SortableTableHeader>
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")} colSpan={2}>
                    {translate("pages.adminDashboard.usersPanel.header.user")}
                </SortableTableHeader>
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")}>
                    {translate("pages.adminDashboard.usersPanel.header.login")}
                </SortableTableHeader>
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")} ta="center">
                    {translate("pages.adminDashboard.usersPanel.header.role")}
                </SortableTableHeader>
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")} ta="center">
                    {translate("pages.adminDashboard.usersPanel.header.reservations")}
                </SortableTableHeader>
                <SortableTableHeader sorted={true} reversed={true} onSort={() => console.log("a")} ta="center">
                    {translate("pages.adminDashboard.usersPanel.header.options")}
                </SortableTableHeader>
            </Table.Tr>
        </Table.Thead>
    );
};
