import { Table, Text } from "@mantine/core";
import classNames from "classnames";

import classes from "./UserRow.module.scss";

import { UserManagementEvents } from "@/app/pages/UsersDashboard/UsersDashboardPage";
import { TextWithTooltip } from "@/components/DataDisplay";
import { UserAvatar, UserReservationsPermissionBadge, UserRoleBadge } from "@/features/users/components";
import { UserOptionsDropdown } from "@/features/users/components/UsersTable/components/UserOptionsDropdown/UserOptionsDropdown";
import { useTranslate } from "@/lib/i18n";
import { UserDetails } from "@/types";

type UserRowProps = {
    userDetails: UserDetails;
    events: UserManagementEvents;
};

export const UserRow = ({ userDetails, events }: UserRowProps) => {
    const translate = useTranslate();

    return (
        <Table.Tr className={classes.row}>
            <Table.Td>
                <Text className={classNames(classes.columnLabel, classes.center)}>{userDetails.id}</Text>
            </Table.Td>

            <Table.Td>
                <UserAvatar user={userDetails} />
            </Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <Text className={classes.columnLabel}>{translate("pages.usersDashboard.rows.name")}</Text>
                <TextWithTooltip className={classes.columnValue}>{userDetails.displayName}</TextWithTooltip>
            </Table.Td>

            <Table.Td className={classes.columnWithTruncatedValue}>
                <Text className={classes.columnLabel}>{translate("pages.usersDashboard.rows.login")}</Text>
                <TextWithTooltip className={classes.columnValue}>{userDetails.name}</TextWithTooltip>
            </Table.Td>

            <Table.Td className={classes.center}>
                <UserRoleBadge onClick={() => events.onUserRoleChange(userDetails)} role={userDetails.role} />
            </Table.Td>

            <Table.Td className={classes.center}>
                <UserReservationsPermissionBadge
                    onClick={() => events.onUserReservationsPermissionToggle(userDetails)}
                    disabled={userDetails.reservationDisabled}
                />
            </Table.Td>

            <Table.Td className={classNames(classes.center)}>
                <UserOptionsDropdown events={events} userDetails={userDetails} />
            </Table.Td>
        </Table.Tr>
    );
};
