import { useMemo } from "react";
import { Box } from "@mantine/core";
import dayjs from "dayjs";

import { ReservationItemCard, ReservationsSection } from "@/features/reservations";
import { useTranslate } from "@/lib/i18n";
import { ActivityInstance } from "@/types";

type ReservationsListProps = {
    reservations: ActivityInstance[];
};

export const ReservationsList = ({ reservations }: ReservationsListProps) => {
    const translate = useTranslate();

    const organizedActivitiesInstances = useMemo(() => {
        const today: ActivityInstance[] = [];
        const nextWeek: ActivityInstance[] = [];
        const rest: ActivityInstance[] = [];

        const endOfToday = dayjs().endOf("day");
        const endOfWeek = endOfToday.add(6, "days");

        reservations
            ?.sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime), "seconds"))
            ?.forEach((instance) => {
                const startDate = dayjs(instance.startTime);

                if (startDate.isBefore(endOfToday)) {
                    today.push(instance);
                } else if (startDate.isBefore(endOfWeek)) {
                    nextWeek.push(instance);
                } else {
                    rest.push(instance);
                }
            });

        return { today, nextWeek, rest };
    }, [reservations]);

    return (
        <Box>
            <ReservationsSection
                onItemRender={(props) => <ReservationItemCard {...props} />}
                items={organizedActivitiesInstances.today}
                label={translate("pages.reservations.sections.today")}
            />
            <ReservationsSection
                onItemRender={(props) => <ReservationItemCard {...props} />}
                items={organizedActivitiesInstances.nextWeek}
                label={translate("pages.reservations.sections.incoming")}
            />
            <ReservationsSection
                onItemRender={(props) => <ReservationItemCard {...props} />}
                items={organizedActivitiesInstances.rest}
                label={translate("pages.reservations.sections.others")}
            />
        </Box>
    );
};
