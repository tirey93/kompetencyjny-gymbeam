import { Table } from "@mantine/core";

import { SortableTableHeaderCell, SortableTableHeaderCellProps } from "./SortableTableHeaderCell";

import classes from "./SortableTableHeaderCell.module.scss";

export type SortableTableColumnsConfig<TData> = Partial<SortableTableHeaderCellProps> & { column: keyof TData };

type SortableTableHeaderProps<TData> = {
    columns: SortableTableColumnsConfig<TData>[];
    sortDirection: "ASC" | "DESC" | null;
    sortBy: keyof TData | null;
    onSort: (column: keyof TData) => unknown;
};

export const SortableTableHeader = <TData extends object>({
    onSort,
    sortBy,
    sortDirection,
    columns,
}: SortableTableHeaderProps<TData>) => {
    return (
        <Table.Thead>
            <Table.Tr className={classes.tableRow}>
                {columns.map(({ column, children, disableSort, ...rest }) => (
                    <SortableTableHeaderCell
                        onSort={!disableSort ? () => onSort(column) : undefined}
                        reversed={sortDirection === "DESC"}
                        sorted={sortBy === column}
                        key={column.toString()}
                        {...rest}
                    >
                        {children}
                    </SortableTableHeaderCell>
                ))}
            </Table.Tr>
        </Table.Thead>
    );
};
