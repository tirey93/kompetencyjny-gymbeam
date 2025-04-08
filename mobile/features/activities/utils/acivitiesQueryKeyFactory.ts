import { DateRange } from "@/types/Common";

export class ActivitiesQueryKeyFactory {
    public static createForAll() {
        return ["activities"];
    }

    public static createForActivity(id: number) {
        return [...ActivitiesQueryKeyFactory.createForAll(), `activity:${id}`];
    }

    public static createForInstancesByDateRange(dateRange: DateRange) {
        return [...ActivitiesQueryKeyFactory.createForAll(), "date_range", dateRange.from, dateRange.to];
    }

    public static createForOwnInstances() {
        return [...ActivitiesQueryKeyFactory.createForAll(), "own"];
    }
}
