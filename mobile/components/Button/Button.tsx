import React, { ElementRef, forwardRef, ReactNode } from "react";
import { Button as BaseButton, type ButtonProps } from "tamagui";

import { Spinner } from "@/components/Spinner";

interface ExtendedButtonProps extends ButtonProps {
    isLoading?: boolean;
    loadingIndicator?: ReactNode;
}

type ButtonRef = ElementRef<typeof BaseButton>;

export const Button = forwardRef<ButtonRef, ExtendedButtonProps>(
    ({ isLoading = false, loadingIndicator = <Spinner />, children, disabled, ...rest }: ExtendedButtonProps, ref) => {
        const isDisabled = isLoading || disabled;

        return (
            <BaseButton ref={ref} disabled={isDisabled} {...rest}>
                {isLoading ? loadingIndicator : children}
            </BaseButton>
        );
    }
);

Button.displayName = "Button";
