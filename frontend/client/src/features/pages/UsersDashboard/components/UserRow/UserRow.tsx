import { Table, Text } from "@mantine/core";
import classNames from "classnames";

import { UserDetails } from "../../../../../common/auth";
import { TextWithTooltip } from "../../../../../common/components/DataDisplay";
import { UserAvatar, UserReservationsPermissionBadge, UserRoleBadge } from "../../../../../common/components/User";
import { useTranslate } from "../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersDashboardPage";
import { UserOptionsDropdown } from "../UserOptionsDropdown/UserOptionsDropdown";

import classes from "./UserRow.module.scss";

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
