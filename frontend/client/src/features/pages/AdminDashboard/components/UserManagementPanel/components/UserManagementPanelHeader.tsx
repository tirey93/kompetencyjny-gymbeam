import { Table } from "@mantine/core";

import { TextWithTooltip } from "../../../../../../common/components/TextWithTooltip/TextWithTooltip";
import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";

export const UserManagementPanelHeader = () => {
    const translate = useTranslate();

    return (
        <Table.Thead>
            <Table.Tr ta="center">
                <Table.Th ta="center">
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.id")}
                    </TextWithTooltip>
                </Table.Th>
                <Table.Th colSpan={2}>
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.user")}
                    </TextWithTooltip>
                </Table.Th>
                <Table.Th>
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.login")}
                    </TextWithTooltip>
                </Table.Th>
                <Table.Th ta="center">
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.role")}
                    </TextWithTooltip>
                </Table.Th>
                <Table.Th ta="center">
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.reservations")}
                    </TextWithTooltip>
                </Table.Th>
                <Table.Th ta="center">
                    <TextWithTooltip fw={700} fz="sm">
                        {translate("pages.adminDashboard.usersPanel.header.options")}
                    </TextWithTooltip>
                </Table.Th>
            </Table.Tr>
        </Table.Thead>
    );
};
