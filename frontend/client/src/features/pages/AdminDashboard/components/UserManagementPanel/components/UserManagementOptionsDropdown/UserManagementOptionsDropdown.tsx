import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";

import { UserDetails } from "../../../../../../../common/auth";
import { useTranslate } from "../../../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersManagementPanel";

import classes from "./UserManagementOptionsDropdown.module.scss";

type UserManagementOptionsDropdownProps = {
    events: UserManagementEvents;
    userDetails: UserDetails;
};

export const UserManagementOptionsDropdown = ({ events, userDetails }: UserManagementOptionsDropdownProps) => {
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
                    onClick={() => events.onDelete(userDetails)}
                    leftSection={<IconTrash className={classes.menuItemIcon} />}
                    color="red"
                >
                    {translate("pages.adminDashboard.usersPanel.options.delete")}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
