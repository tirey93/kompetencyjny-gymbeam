import { Container } from "@mantine/core";

import { UsersManagementPanel } from "./components/UserManagementPanel";

export const AdminDashboardPage = () => {
    return (
        <Container>
            <UsersManagementPanel />
        </Container>
    );
};
