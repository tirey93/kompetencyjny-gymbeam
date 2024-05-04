import { Badge, Group } from "@mantine/core";

import { Day } from "../../../activities/Activities";
import { DAYS_SHORT } from "../../../constants";
import { useTranslate } from "../../../i18n";

import classes from "./Days.module.scss";

type DaysProps = {
    value: Day[];
};

export const Days = ({ value }: DaysProps) => {
    const translate = useTranslate();

    return (
        <Group className={classes.container}>
            {value.map((day) => (
                <Badge key={day} color="dark">
                    {translate(DAYS_SHORT[day])}
                </Badge>
            ))}
        </Group>
    );
};
