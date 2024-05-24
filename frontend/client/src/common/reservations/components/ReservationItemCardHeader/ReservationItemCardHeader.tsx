import { ActionIcon, Group, Loader, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import classNames from "classnames";

import classes from "./ReservationItemCardHeader.module.scss";

export type ReservationItemCardHeaderProps = {
    header: string;
    isLoading?: boolean;
    onDismiss?: () => unknown;
    onShowDetails?: () => unknown;
    className?: string;
};

export const ReservationItemCardHeader = ({
    header,
    onShowDetails,
    onDismiss,
    isLoading,
    className,
}: ReservationItemCardHeaderProps) => {
    return (
        <Group className={classNames(classes.header, className)}>
            <Text className={classNames({ [classes.interactive]: !!onShowDetails })} onClick={onShowDetails}>
                {header}
            </Text>

            {isLoading ? (
                <Loader className={classes.resignButton} size="sm" />
            ) : (
                <ActionIcon variant="subtle" color="danger" className={classes.dismissButton} onClick={onDismiss}>
                    <IconX />
                </ActionIcon>
            )}
        </Group>
    );
};
