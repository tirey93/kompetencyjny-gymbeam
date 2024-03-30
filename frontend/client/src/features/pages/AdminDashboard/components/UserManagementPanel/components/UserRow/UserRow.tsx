import { Table, Text } from "@mantine/core";

import { UserDetails } from "../../../../../../../common/auth";
import { TextWithTooltip } from "../../../../../../../common/components/DataDisplay";
import { UserAvatar } from "../../../../../../../common/components/User";
import { useTranslate } from "../../../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersManagementPanel";
import { UserManagementOptionsDropdown } from "../UserManagementOptionsDropdown/UserManagementOptionsDropdown";
import { UserReservationsPermissionBadge } from "../UserReservationsPermissionBadge/UserReservationsPermissionBadge";
import { UserRoleBadge } from "../UserRoleBadge/UserRoleBadge";

type UserRowProps = {
    userDetails: UserDetails;
    events: UserManagementEvents;
};

export const UserRow = ({ userDetails, events }: UserRowProps) => {
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
                <UserRoleBadge onClick={events.onUserRoleChange} role={userDetails.role} />
            </Table.Td>

            <Table.Td ta="center">
                <UserReservationsPermissionBadge
                    onClick={events.onUserReservationsPermissionToggle}
                    disabled={userDetails.reservationDisabled}
                />
            </Table.Td>

            <Table.Td ta="center">
                <UserManagementOptionsDropdown events={events} />
            </Table.Td>
        </Table.Tr>
    );
};
