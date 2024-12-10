import { Button } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";

import classes from "./ReservationButton.module.scss";

import { TextWithTooltip } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";
import { User } from "@/types";

type ReservationButtonProps = {
    user?: User | null;
    activityDate: Date;
    isFull: boolean;
    isAlreadyReserved: boolean;
    onReservation: () => unknown;
    onCancellation: () => unknown;
    isLoading: boolean;
};

export const ReservationButton = ({
    isAlreadyReserved,
    isFull,
    onReservation,
    onCancellation,
    isLoading,
    activityDate,
    user,
}: ReservationButtonProps) => {
    const translate = useTranslate();
    const now = new Date();

    const hasStartedAlready = dayjs(activityDate).isBefore(now);
    const isCancellationAllowed = isAlreadyReserved && !hasStartedAlready;

    const isActivityDateValid =
        !!user?.gymPassExpirationTime && dayjs(activityDate).isBefore(user.gymPassExpirationTime);

    const isReservationAllowed =
        !isFull && !hasStartedAlready && !user?.areReservationsForbidden && isActivityDateValid;

    const getDisabledButtonLabel = () => {
        if (!isActivityDateValid) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.noGymPass");
        } else if (isFull) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.full");
        } else if (hasStartedAlready) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.tooLate");
        } else if (user?.areReservationsForbidden) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.notAllowed");
        }
    };

    if (isCancellationAllowed) {
        return (
            <Button
                size="xs"
                variant="subtle"
                color="danger"
                loading={isLoading}
                onClick={onCancellation}
                rightSection={<IconMinus className={classes.reservationButtonIcon} />}
            >
                {translate("activityCalendar.item.enrollment.delete.label")}
            </Button>
        );
    }

    if (!isReservationAllowed) {
        return (
            <TextWithTooltip alwaysVisible className={classes.reservationsDisabled} label={getDisabledButtonLabel()}>
                {translate("activityCalendar.item.enrollment.disabled.label")}
            </TextWithTooltip>
        );
    }

    return (
        <Button
            size="xs"
            variant="subtle"
            color="success"
            loading={isLoading}
            onClick={onReservation}
            rightSection={<IconPlus className={classes.reservationButtonIcon} />}
        >
            {translate("activityCalendar.item.enrollment.add.label")}
        </Button>
    );
};
