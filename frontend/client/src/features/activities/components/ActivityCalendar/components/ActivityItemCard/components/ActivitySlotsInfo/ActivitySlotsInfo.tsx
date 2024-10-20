import { useMemo } from "react";
import { Box } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import classNames from "classnames";

import classes from "./ActivitySlotsInfo.module.scss";

import { TextWithTooltip } from "@/components/DataDisplay";
import { useTranslate } from "@/lib/i18n";
import { ActivityInstance } from "@/types";

type ActivitySlotsInfoProps = Pick<ActivityInstance, "totalCapacity" | "slotsTaken"> & {
    onClick?: () => unknown;
};

export const ActivitySlotsInfo = ({ totalCapacity, slotsTaken, onClick }: ActivitySlotsInfoProps) => {
    const translate = useTranslate();

    const reservationsColor = useMemo(() => {
        if (totalCapacity === slotsTaken) {
            return "danger";
        } else if (slotsTaken / totalCapacity >= 0.75) {
            return "warning";
        } else {
            return "success";
        }
    }, [totalCapacity, slotsTaken]);

    return (
        <Box
            onClick={onClick}
            className={classNames(classes.activitySlotsContainer, { [classes.interactive]: !!onClick })}
        >
            <TextWithTooltip
                alwaysVisible
                c={reservationsColor}
                className={classes.participants}
                label={translate("activityCalendar.item.participants.tooltip", { slotsTaken })}
            >
                {slotsTaken} / {totalCapacity}
                <IconUsers className={classes.participantsIcon} onClick={onClick} />
            </TextWithTooltip>
        </Box>
    );
};
