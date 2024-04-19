import { useCallback } from "react";
import { MultiSelect } from "@mantine/core";

import { Activity } from "../../../../../activities/Activities";
import { useTranslate } from "../../../../../i18n";

type ActivitiesSelectProps = {
    options: Activity[];
    value: Activity[];
    onChange: (activities: Activity[]) => unknown;
};

export const ActivitiesSelect = ({ value, onChange, options }: ActivitiesSelectProps) => {
    const data = options.map((option) => ({ value: option.id.toString(), label: option.name }));
    const translate = useTranslate();

    const handleOnChange = useCallback(
        (ids: string[]) => {
            const selectedActivities = options.filter((option) => ids.includes(option.id.toString()));
            onChange(selectedActivities);
        },
        [onChange, options]
    );

    return (
        <MultiSelect
            placeholder={value.length ? undefined : translate("activityCalendar.filters.activity.placeholder")}
            data={data}
            searchable
            clearable
            nothingFoundMessage={translate("activityCalendar.filters.activity.notFound")}
            value={value.map(({ id }) => id.toString())}
            onChange={handleOnChange}
        />
    );
};
