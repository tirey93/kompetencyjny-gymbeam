import { List, Text } from "@mantine/core";

import { RuleValidationResult } from "../../../Registration";
import { RuleValidityIndicator } from "./RuleValidityIndicator";

type RequirementItemProps = {
    rule: RuleValidationResult;
};

export const RequirementItem = ({ rule }: RequirementItemProps) => {
    return (
        <List.Item icon={<RuleValidityIndicator state={rule.state} />}>
            <Text fw={500} span size="sm">
                {rule.rule}
            </Text>
        </List.Item>
    );
};
