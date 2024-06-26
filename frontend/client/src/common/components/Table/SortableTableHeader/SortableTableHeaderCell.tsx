import { ReactNode } from "react";
import { Center, Group, Table, TableThProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

import { TextWithTooltip } from "../../DataDisplay";

import classes from "./SortableTableHeaderCell.module.scss";

export type SortableTableHeaderCellProps = TableThProps & {
    children: ReactNode;
    reversed?: boolean;
    sorted?: boolean;
    onSort?: () => unknown;
    disableSort?: boolean;
};

export const SortableTableHeaderCell = ({
    children,
    reversed,
    sorted,
    onSort,
    ...rest
}: SortableTableHeaderCellProps) => {
    return (
        <Table.Th {...rest} className={classes.container}>
            <Wrapper reversed={reversed} onSort={onSort} sorted={sorted}>
                <TextWithTooltip className={classes.columnName}>{children}</TextWithTooltip>
            </Wrapper>
        </Table.Th>
    );
};

const Wrapper = ({ onSort, sorted, reversed, children }: SortableTableHeaderCellProps) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    if (!onSort) {
        return <>{children}</>;
    }

    return (
        <UnstyledButton onClick={onSort} className={classes.sortableWrapper}>
            <Group className={classes.columnHeaderContentWrapper}>
                {children}
                <Center>
                    <Icon className={classes.sortIcon} />
                </Center>
            </Group>
        </UnstyledButton>
    );
};
