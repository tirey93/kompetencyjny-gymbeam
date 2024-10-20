import { List } from "@mantine/core";

import { RequirementItem } from "./components/RequirementItem";
import { RuleValidationResult } from "../../types";

type RequirementsListProps = {
    rules: RuleValidationResult[];
};

export const RequirementsList = ({ rules }: RequirementsListProps) => {
    return (
        <List>
            {rules.map((rule) => (
                <RequirementItem key={rule.rule} rule={rule} />
            ))}
        </List>
    );
};
