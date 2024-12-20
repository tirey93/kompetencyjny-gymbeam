import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconListCheck, IconTrash } from "@tabler/icons-react";

import classes from "./UserOptionsDropdown.module.scss";

import { UserManagementEvents } from "@/features/users";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

type UserOptionsDropdownProps = {
    events: UserManagementEvents;
    userDetails: User;
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
