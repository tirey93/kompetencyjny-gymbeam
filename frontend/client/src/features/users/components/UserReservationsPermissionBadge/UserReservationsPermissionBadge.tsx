import { Badge } from "@mantine/core";

import classes from "./UserReservationsPermissionBadge.module.scss";

import { useTranslate } from "@/lib/i18n";

type UserReservationsEnabledBadgeProps = {
    disabled?: boolean;
    onClick?: () => unknown;
};

export const UserReservationsPermissionBadge = ({ disabled, onClick }: UserReservationsEnabledBadgeProps) => {
    const translate = useTranslate();

    return (
        <Badge className={classes.badge} variant="light" color={disabled ? "danger" : "success"} onClick={onClick}>
            {disabled
                ? translate("pages.usersDashboard.rows.reservations.off")
                : translate("pages.usersDashboard.rows.reservations.on")}
        </Badge>
    );
};
