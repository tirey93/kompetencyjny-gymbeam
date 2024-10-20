import { useMemo } from "react";
import { Button } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import classes from "./ReservationButton.module.scss";

import { TextWithTooltip } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";

type ReservationButtonProps = {
    isFull: boolean;
    hasStartedAlready: boolean;
    isAlreadyReserved: boolean;
    onReservation: () => unknown;
    onCancellation: () => unknown;
    isUserPermittedToEnroll: boolean;
    isLoading: boolean;
};

export const ReservationButton = ({
    isAlreadyReserved,
    isFull,
    onReservation,
    onCancellation,
    hasStartedAlready,
    isLoading,
    isUserPermittedToEnroll,
}: ReservationButtonProps) => {
    const translate = useTranslate();

    const disabledButtonLabel = useMemo(() => {
        if (isFull) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.full");
        } else if (hasStartedAlready) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.tooLate");
        } else if (!isUserPermittedToEnroll) {
            return translate("activityCalendar.item.enrollment.disabled.tooltip.notAllowed");
        }
    }, [hasStartedAlready, isFull, isUserPermittedToEnroll, translate]);

    if (!hasStartedAlready && isAlreadyReserved) {
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

    if (isFull || hasStartedAlready || !isUserPermittedToEnroll) {
        return (
            <TextWithTooltip alwaysVisible className={classes.reservationsDisabled} label={disabledButtonLabel}>
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
