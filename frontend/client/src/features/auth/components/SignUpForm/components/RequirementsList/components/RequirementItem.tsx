import { useMemo } from "react";
import { List, Text, ThemeIcon } from "@mantine/core";

import { RuleValidationResult } from "../../../types";

import classes from "./RequirementItem.module.scss";

type RequirementItemProps = {
    rule: RuleValidationResult;
};

export const RequirementItem = ({ rule }: RequirementItemProps) => {
    const color = useMemo(() => {
        switch (rule.state) {
            case false:
                return "danger";
            case true:
                return "success";
            default:
                return "info";
        }
    }, [rule.state]);

    return (
        <List.Item
            className={classes.container}
            icon={<ThemeIcon size={10} color={color} className={classes.ruleValidityIndicator} />}
        >
            <Text className={classes.ruleContent}>{rule.rule}</Text>
        </List.Item>
    );
};
