import { ActionIcon, Menu } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";

import { useTranslate } from "../../../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersManagementPanel";

import classes from "./UserManagementOptionsDropdown.module.scss";

type UserManagementOptionsDropdownProps = {
    events: UserManagementEvents;
};

export const UserManagementOptionsDropdown = ({ events }: UserManagementOptionsDropdownProps) => {
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
                    onClick={events.onDelete}
                    leftSection={<IconTrash className={classes.menuItemIcon} />}
                    color="red"
                >
                    {translate("pages.adminDashboard.usersPanel.options.delete")}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
