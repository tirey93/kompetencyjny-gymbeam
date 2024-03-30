import { Badge } from "@mantine/core";

import { UserRole } from "../../../../../../../common/auth";
import { useTranslate } from "../../../../../../../common/i18n";

type UserRoleBadgeProps = {
    role: UserRole;
};

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
    const translate = useTranslate();
    const isAdmin = role === "Admin";

    return (
        <Badge variant="light" color={isAdmin ? "secondary" : "accent"}>
            {isAdmin
                ? translate("pages.adminDashboard.usersPanel.rows.roles.admin")
                : translate("pages.adminDashboard.usersPanel.rows.roles.user")}
        </Badge>
    );
};
