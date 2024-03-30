import { Table } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import { UserManagementPanelHeader } from "./components/UserManagementPanelHeader";
import { UserRow } from "./components/UserRow";
import { UserDetails } from "../../../../../common/auth/Auth";
import { NAVIGATION_SHELL_TOTAL_HEIGHT } from "../../../../navigation/Shell/Shell";

const data: UserDetails[] = [
    {
        id: 2,
        displayName: "Jill Jailbreaker",
        role: "User",
        name: "jj@breaker.com",
        reservationDisabled: false,
    },
    {
        id: 3,
        displayName: "Bill05",
        role: "User",
        name: "bb@gmail.com",
        reservationDisabled: true,
    },
    {
        id: 1,
        displayName: "Robert Wolfkisser",
        role: "Admin",
        name: "rob_wolf@gmail.com",
        reservationDisabled: false,
    },
];

export const UsersManagementPanel = () => {
    const { height } = useViewportSize();

    return (
        <Table.ScrollContainer minWidth={800} h={height - NAVIGATION_SHELL_TOTAL_HEIGHT}>
            <Table verticalSpacing="md" stickyHeader highlightOnHover>
                <UserManagementPanelHeader />
                <Table.Tbody>
                    {data.map((user) => (
                        <UserRow key={user.id} userDetails={user} />
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};
