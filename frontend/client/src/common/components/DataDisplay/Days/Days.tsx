import { Badge, Group } from "@mantine/core";

import { Day } from "../../../activities";
import { DAYS } from "../../../constants";
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
                <Badge variant="light" key={day} color="accent">
                    {translate(DAYS[day].long)}
                </Badge>
            ))}
        </Group>
    );
};
