import { Button } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { useTranslate } from "../../../../i18n";
import { TextWithTooltip } from "../../../DataDisplay";

import classes from "./ActivityItemCard.module.scss";

type ReservationButtonProps = {
    isFull: boolean;
    hasStartedAlready: boolean;
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
    hasStartedAlready,
    isLoading,
}: ReservationButtonProps) => {
    const translate = useTranslate();

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

    if (isFull || hasStartedAlready) {
        return (
            <TextWithTooltip
                alwaysVisible
                className={classes.reservationsDisabled}
                label={
                    hasStartedAlready
                        ? translate("activityCalendar.item.enrollment.disabled.tooltip.tooLate")
                        : translate("activityCalendar.item.enrollment.disabled.tooltip.full")
                }
            >
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
