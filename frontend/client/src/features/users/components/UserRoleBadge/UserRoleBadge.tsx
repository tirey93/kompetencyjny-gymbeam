import { Badge } from "@mantine/core";

import classes from "./UserRoleBadge.module.scss";

import { useTranslate } from "@/lib/i18n";
import { InternalUserRole } from "@/types";

type UserRoleBadgeProps = {
    role: InternalUserRole;
    onClick?: () => unknown;
};

export const UserRoleBadge = ({ role, onClick }: UserRoleBadgeProps) => {
    const translate = useTranslate();
    const isAdmin = role === "Admin";

    return (
        <Badge className={classes.badge} variant="dot" color={isAdmin ? "secondary.3" : "primary.3"} onClick={onClick}>
            {isAdmin ? translate("user.roles.admin") : translate("user.roles.user")}
        </Badge>
    );
};
