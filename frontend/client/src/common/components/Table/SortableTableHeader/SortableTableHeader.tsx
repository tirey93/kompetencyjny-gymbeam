import { ReactNode } from "react";
import { Center, Group, rem, Table, TableThProps, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

import { TextWithTooltip } from "../../DataDisplay";

type SortableTableHeaderProps = TableThProps & {
    children: ReactNode;
    reversed?: boolean;
    sorted?: boolean;
    onSort?: () => unknown;
};

export const SortableTableHeader = ({ children, reversed, sorted, onSort, ...rest }: SortableTableHeaderProps) => {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    return (
        <Table.Th {...rest}>
            <UnstyledButton onClick={onSort}>
                <Group justify="space-between">
                    <TextWithTooltip fw={700} fz="sm">
                        {children}
                    </TextWithTooltip>
                    <Center>
                        <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
};
