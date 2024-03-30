import { Badge } from "@mantine/core";

import { UserRole } from "../../../../../../../common/auth";
import { useTranslate } from "../../../../../../../common/i18n";

type UserRoleBadgeProps = {
    role: UserRole;
    onClick?: () => unknown;
};

export const UserRoleBadge = ({ role, onClick }: UserRoleBadgeProps) => {
    const translate = useTranslate();
    const isAdmin = role === "Admin";

    return (
        <Badge variant="light" color={isAdmin ? "secondary" : "accent"} onClick={onClick}>
            {isAdmin ? translate("user.roles.admin") : translate("user.roles.user")}
        </Badge>
    );
};
