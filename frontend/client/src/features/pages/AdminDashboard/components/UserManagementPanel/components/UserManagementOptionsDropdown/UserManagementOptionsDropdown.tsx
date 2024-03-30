import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconDots, IconTrash } from "@tabler/icons-react";

type UserManagementOptionsDropdownProps = {
    onDelete: () => void;
};

export const UserManagementOptionsDropdown = ({ onDelete }: UserManagementOptionsDropdownProps) => {
    return (
        <Menu transitionProps={{ transition: "pop" }} withArrow position="right">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={onDelete}
                    leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    color="red"
                >
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};
