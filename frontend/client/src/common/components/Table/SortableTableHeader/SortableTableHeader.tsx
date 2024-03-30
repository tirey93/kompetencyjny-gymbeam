import { ReactNode } from "react";
import { Center, Group, rem, Table, TableThProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

import { TextWithTooltip } from "../../DataDisplay";

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
                <TextWithTooltip fw={700} fz="sm">
                    {children}
                </TextWithTooltip>
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
            <Group justify="space-between">
                {children}
                <Center>
                    <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </Center>
            </Group>
        </UnstyledButton>
    );
};
