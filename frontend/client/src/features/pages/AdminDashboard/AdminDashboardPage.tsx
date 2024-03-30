import { Container } from "@mantine/core";

import { UsersManagementPanel } from "./components/UserManagementPanel/UsersManagementPanel";

export const AdminDashboardPage = () => {
    return (
        <Container>
            <UsersManagementPanel />
        </Container>
    );
};
