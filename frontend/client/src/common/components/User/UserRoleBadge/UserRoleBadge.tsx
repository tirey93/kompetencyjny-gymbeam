import { Badge } from "@mantine/core";

import { InternalUserRole } from "../../../auth";
import { useTranslate } from "../../../i18n";

import classes from "./UserRoleBadge.module.scss";

type UserRoleBadgeProps = {
    role: InternalUserRole;
    onClick?: () => unknown;
};

export const UserRoleBadge = ({ role, onClick }: UserRoleBadgeProps) => {
    const translate = useTranslate();
    const isAdmin = role === "Admin";

    return (
        <Badge className={classes.badge} variant="light" color={isAdmin ? "secondary" : "primary"} onClick={onClick}>
            {isAdmin ? translate("user.roles.admin") : translate("user.roles.user")}
        </Badge>
    );
};
