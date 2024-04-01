import { ReactNode } from "react";
import { Center, Group, Table, TableThProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

import { TextWithTooltip } from "../../DataDisplay";

import classes from "./SortableTableHeader.module.scss";

export type SortableTableHeaderProps = TableThProps & {
    children: ReactNode;
    reversed?: boolean;
    sorted?: boolean;
    onSort?: () => unknown;
};

export const SortableTableHeader = ({ children, reversed, sorted, onSort, ...rest }: SortableTableHeaderProps) => {
    return (
        <Table.Th {...rest}>
            <Wrapper reversed={reversed} onSort={onSort} sorted={sorted}>
                <TextWithTooltip className={classes.columnName}>{children}</TextWithTooltip>
            </Wrapper>
        </Table.Th>
    );
};

const Wrapper = ({ onSort, sorted, reversed, children }: SortableTableHeaderProps) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    if (!onSort) {
        return <>{children}</>;
    }

    return (
        <UnstyledButton onClick={onSort}>
            <Group className={classes.columnHeaderContentWrapper}>
                {children}
                <Center>
                    <Icon className={classes.sortIcon} />
                </Center>
            </Group>
        </UnstyledButton>
    );
};
