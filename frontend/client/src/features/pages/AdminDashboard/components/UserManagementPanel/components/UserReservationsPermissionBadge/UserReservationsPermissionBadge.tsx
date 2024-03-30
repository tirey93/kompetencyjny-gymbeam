import { Badge } from "@mantine/core";

import { useTranslate } from "../../../../../../../common/i18n";

type UserReservationsEnabledBadgeProps = {
    disabled?: boolean;
};

export const UserReservationsPermissionBadge = ({ disabled }: UserReservationsEnabledBadgeProps) => {
    const translate = useTranslate();

    return (
        <Badge variant="light" color={disabled ? "danger" : "success"}>
            {disabled
                ? translate("pages.adminDashboard.usersPanel.rows.reservations.off")
                : translate("pages.adminDashboard.usersPanel.rows.reservations.on")}
        </Badge>
    );
};
