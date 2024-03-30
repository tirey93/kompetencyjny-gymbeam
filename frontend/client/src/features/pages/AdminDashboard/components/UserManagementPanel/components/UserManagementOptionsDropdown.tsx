import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconNote, IconTrash } from "@tabler/icons-react";

export const UserManagementOptionsDropdown = () => {
    return (
        <Menu transitionProps={{ transition: "pop" }} withArrow position="right">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IconNote style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Change role
                </Menu.Item>
                <Menu.Item leftSection={<IconNote style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                    Disable reservations
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    color="red"
                >
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
