import { Badge } from "@mantine/core";

import { useTranslate } from "../../../../../../../common/i18n";

type UserReservationsEnabledBadgeProps = {
    disabled?: boolean;
    onClick?: () => unknown;
};

export const UserReservationsPermissionBadge = ({ disabled, onClick }: UserReservationsEnabledBadgeProps) => {
    const translate = useTranslate();

    return (
        <Badge variant="light" color={disabled ? "danger" : "success"} onClick={onClick}>
            {disabled
                ? translate("pages.adminDashboard.usersPanel.rows.reservations.off")
                : translate("pages.adminDashboard.usersPanel.rows.reservations.on")}
        </Badge>
    );
};
