import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Container, Title } from "@mantine/core";
import dayjs from "dayjs";

import { ActivityInstance, useActivitiesInstances } from "../../../common/activities";
import { ErrorScreen, LoaderOverlay } from "../../../common/components/DataDisplay";
import { NoResultsMessage } from "../../../common/components/Table";
import { useTranslate } from "../../../common/i18n";
import { ReservationItemCard, ReservationsSection } from "../../../common/reservations";
import { AppRoute } from "../../router";

import classes from "./ReservationsPage.module.scss";

export const ReservationsPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { activitiesInstances, isLoading, error, refetch } = useActivitiesInstances({
        type: "ReservedByUser",
    });

    const organizedActivitiesInstances = useMemo(() => {
        const today: ActivityInstance[] = [];
        const nextWeek: ActivityInstance[] = [];
        const rest: ActivityInstance[] = [];

        const endOfToday = dayjs().endOf("day");
        const endOfWeek = endOfToday.add(6, "days");

        activitiesInstances
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
    }, [activitiesInstances]);

    const openActivitiesCalendar = useCallback(() => {
        navigate(AppRoute.ACTIVITIES);
    }, [navigate]);

    if (isLoading) {
        return <LoaderOverlay />;
    }

    if (error) {
        return (
            <ErrorScreen
                onRetry={refetch}
                description={error}
                title={translate("pages.activities.errorScreen.instances.title")}
            />
        );
    }

    return (
        <Container size="xl" className={classes.container}>
            <Title order={4}>{translate("pages.reservations.header")}</Title>
            <Anchor className={classes.link} onClick={openActivitiesCalendar}>
                {translate("pages.reservations.link")}
            </Anchor>

            {!activitiesInstances?.length ? (
                <NoResultsMessage
                    description={translate("pages.reservations.noResults.description")}
                    actionButtonLabel={translate("pages.reservations.noResults.button")}
                    onActionButtonClick={openActivitiesCalendar}
                />
            ) : (
                <>
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
                </>
            )}
        </Container>
    );
};
