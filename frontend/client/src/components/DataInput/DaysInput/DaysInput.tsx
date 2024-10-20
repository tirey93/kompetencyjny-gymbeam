import { Chip, Group, Input, InputWrapperProps } from "@mantine/core";

import classes from "./DaysInput.module.scss";

import { WEEKDAYS } from "@/constants";
import { useTranslate } from "@/lib/i18n";
import { Day } from "@/types";

type DaysInputProps = Omit<InputWrapperProps, "className"> & {
    value?: Day[];
    onChange: (value: string[]) => unknown;
};

export const DaysInput = ({ value, onChange, ...inputWrapperProps }: DaysInputProps) => {
    const translate = useTranslate();

    return (
        <Input.Wrapper className={classes.container} {...inputWrapperProps}>
            <Group className={classes.daysWrapper}>
                <Chip.Group value={value} onChange={onChange} multiple>
                    {Object.entries(WEEKDAYS).map(([value, key]) => (
                        <Chip key={value} variant="outline" color="success" value={value}>
                            {translate(key.long)}
                        </Chip>
                    ))}
                </Chip.Group>
            </Group>
        </Input.Wrapper>
    );
};
