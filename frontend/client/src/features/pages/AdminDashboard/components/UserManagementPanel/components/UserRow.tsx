import { Table, Text } from "@mantine/core";

import { UserDetails } from "../../../../../../common/auth/Auth";
import { TextWithTooltip } from "../../../../../../common/components/TextWithTooltip/TextWithTooltip";
import { useTranslate } from "../../../../../../common/i18n/hooks/useTranslate";
import { UserAvatar } from "./UserAvatar";
import { UserManagementOptionsDropdown } from "./UserManagementOptionsDropdown";
import { UserReservationsPermissionBadge } from "./UserReservationsPermissionBadge";
import { UserRoleBadge } from "./UserRoleBadge";

type UserRowProps = {
    userDetails: UserDetails;
};

export const UserRow = ({ userDetails }: UserRowProps) => {
    const translate = useTranslate();

    return (
        <Table.Tr>
            <Table.Td>
                <Text fz="xs" c="dimmed" ta="center">
                    {userDetails.id}
                </Text>
            </Table.Td>
            <Table.Td>
                <UserAvatar user={userDetails} />
            </Table.Td>
            <Table.Td maw={200} pr="md">
                <Text c="dimmed" fz="xs">
                    {translate("pages.adminDashboard.usersPanel.rows.name")}
                </Text>
                <TextWithTooltip fz="sm" fw={500}>
                    {userDetails.displayName}
                </TextWithTooltip>
            </Table.Td>
            <Table.Td maw={200} pr="md">
                <Text c="dimmed" fz="xs">
                    {translate("pages.adminDashboard.usersPanel.rows.login")}
                </Text>
                <TextWithTooltip fz="sm">{userDetails.name}</TextWithTooltip>
            </Table.Td>
            <Table.Td ta="center">
                <UserRoleBadge role={userDetails.role} />
            </Table.Td>
            <Table.Td ta="center">
                <UserReservationsPermissionBadge disabled={userDetails.reservationDisabled} />
            </Table.Td>
            <Table.Td ta="center">
                <UserManagementOptionsDropdown />
            </Table.Td>
        </Table.Tr>
    );
};
