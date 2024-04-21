import { Container, Tabs } from "@mantine/core";
import { IconBarbell, IconUsers } from "@tabler/icons-react";

import { ActivitiesManagementPanel } from "./components/ActivitiesManagementPanel";
import { UsersManagementPanel } from "./components/UserManagementPanel";
import { useTranslate } from "../../../common/i18n";

import classes from "./AdminDashboardPage.module.scss";

enum AdminDashboardTab {
    USERS = "users",
    ACTIVITIES = "activities",
}

export const AdminDashboardPage = () => {
    const translate = useTranslate();

    return (
        <Container size="xl" className={classes.container}>
            <Tabs defaultValue={AdminDashboardTab.USERS}>
                <Tabs.List className={classes.tabs}>
                    <Tabs.Tab
                        className={classes.tab}
                        value={AdminDashboardTab.USERS}
                        leftSection={<IconUsers className={classes.tabIcon} />}
                    >
                        {translate("pages.adminDashboard.usersPanel.tab")}
                    </Tabs.Tab>
                    <Tabs.Tab
                        className={classes.tab}
                        value={AdminDashboardTab.ACTIVITIES}
                        leftSection={<IconBarbell className={classes.tabIcon} />}
                    >
                        {translate("pages.adminDashboard.activitiesPanel.tab")}
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={AdminDashboardTab.USERS}>
                    <UsersManagementPanel />
                </Tabs.Panel>

                <Tabs.Panel value={AdminDashboardTab.ACTIVITIES}>
                    <ActivitiesManagementPanel />
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};
