import { PropsWithChildren } from "react";
import { Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

type ErrorMessageProps = PropsWithChildren<{
    onClose: () => void;
}>;

export const ErrorMessage = ({ children, onClose }: ErrorMessageProps) => {
    return (
        <Alert color="error" onClose={onClose} withCloseButton icon={<IconExclamationCircle />}>
            {children}
        </Alert>
    );
};
