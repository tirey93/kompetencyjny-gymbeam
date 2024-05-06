import { MultiSelect } from "@mantine/core";

import { useTranslate } from "../../../../../i18n";

type ActivitiesSelectProps = {
    options: string[];
    value: string[];
    onChange: (values: string[]) => unknown;
};

export const ActivitiesSelect = ({ value, onChange, options }: ActivitiesSelectProps) => {
    const translate = useTranslate();

    return (
        <MultiSelect
            placeholder={value.length ? undefined : translate("activityCalendar.filters.activity.placeholder")}
            nothingFoundMessage={translate("activityCalendar.filters.activity.notFound")}
            onChange={onChange}
            data={options}
            value={value}
            searchable
            clearable
        />
    );
};
