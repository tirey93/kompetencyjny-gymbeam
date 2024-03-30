import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";

import { useTranslate } from "../../../../../../../common/i18n";
import { UserManagementEvents } from "../../UsersManagementPanel";

type UserManagementOptionsDropdownProps = {
    events: UserManagementEvents;
};

export const UserManagementOptionsDropdown = ({ events }: UserManagementOptionsDropdownProps) => {
    const translate = useTranslate();

    return (
        <Menu transitionProps={{ transition: "pop" }} withArrow position="right">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={events.onDelete}
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    color="red"
                >
                    {translate("pages.adminDashboard.usersPanel.options.delete")}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
