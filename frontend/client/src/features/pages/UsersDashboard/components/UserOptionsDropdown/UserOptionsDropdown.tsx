import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconListCheck, IconTrash } from "@tabler/icons-react";

import { UserDetails } from "../../../../../common/auth";
import { useTranslate } from "../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersDashboardPage";

import classes from "./UserOptionsDropdown.module.scss";

type UserOptionsDropdownProps = {
    events: UserManagementEvents;
    userDetails: UserDetails;
};

export const UserOptionsDropdown = ({ events, userDetails }: UserOptionsDropdownProps) => {
    const translate = useTranslate();

    return (
        <Menu transitionProps={{ transition: "pop" }} withArrow position="right">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => events.onShowReservations(userDetails)}
                    leftSection={<IconListCheck className={classes.menuItemIcon} />}
                >
                    {translate("pages.usersDashboard.options.seeReservations")}
                </Menu.Item>

                <Menu.Item
                    onClick={() => events.onDelete(userDetails)}
                    leftSection={<IconTrash className={classes.menuItemIcon} />}
                    color="red"
                >
                    {translate("pages.usersDashboard.options.delete")}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
