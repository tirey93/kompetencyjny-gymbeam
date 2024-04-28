import { Badge } from "@mantine/core";

import { useTranslate } from "../../../../i18n";

import classes from "./UserReservationsPermissionBadge.module.scss";

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
