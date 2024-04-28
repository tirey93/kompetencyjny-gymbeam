import { Button, Group } from "@mantine/core";

import classes from "./Modal.module.scss";

type ModalFooterButtonProps = {
    children: string;
    color?: "danger" | "success";
};

type ModalFooterProps = {
    submitButton?: ModalFooterButtonProps;
    cancelButton?: ModalFooterButtonProps;
    onSubmit: () => unknown;
    onCancel?: () => unknown;
    isLoading?: boolean;
};

export const ModalFooter = ({
    isLoading = false,
    submitButton = { children: "Confirm", color: "success" },
    cancelButton = { children: "Cancel" },
    onCancel,
    onSubmit,
}: ModalFooterProps) => {
    return (
        <Group className={classes.footer}>
            <Button variant="default" {...cancelButton} onClick={onCancel} />
            <Button variant="light" loading={isLoading} {...submitButton} onClick={onSubmit} />
        </Group>
    );
};
