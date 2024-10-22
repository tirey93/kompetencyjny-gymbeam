import { Group } from "@mantine/core";

import classes from "./Days.module.scss";

import { WEEKDAYS } from "@/constants";
import { useTranslate } from "@/lib/i18n";
import { Day } from "@/types";

type DaysProps = {
    value: Day[];
};

export const Days = ({ value }: DaysProps) => {
    const translate = useTranslate();

    return <Group className={classes.container}>{value.map((day) => translate(WEEKDAYS[day].short)).join(", ")}</Group>;
};
