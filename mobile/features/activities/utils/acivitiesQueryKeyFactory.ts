import { DateRange } from "@/types/Common";

export class ActivitiesQueryKeyFactory {
    public static createForAll() {
        return ["activities"];
    }

    public static createForInstancesByDateRange(dateRange: DateRange) {
        return ["activities", "date_range", dateRange.from, dateRange.to];
    }

    public static createForOwnInstances() {
        return ["activities", "own"];
    }
}
