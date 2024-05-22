import { Divider, Group, Stack, Text } from "@mantine/core";

import { ActivityInstance } from "../../../../../common/activities";
import { useTranslate } from "../../../../../common/i18n";
import { ReservationItemCard } from "../ReservationItemCard/ReservationItemCard";

import classes from "./ReservationsSection.module.scss";

type ReservationsSectionProps = {
    items: ActivityInstance[];
    label: string;
};

export const ReservationsSection = ({ items, label }: ReservationsSectionProps) => {
    const translate = useTranslate();

    return (
        <Stack className={classes.reservationsGroup}>
            <Divider className={classes.divider} label={label} />

            {items.length ? (
                <Group>
                    {items.map((activity) => (
                        <ReservationItemCard key={activity.reservationId} {...activity} />
                    ))}
                </Group>
            ) : (
                <Text className={classes.emptyMessage}>{translate("pages.reservations.sections.empty")}</Text>
            )}
        </Stack>
    );
};
