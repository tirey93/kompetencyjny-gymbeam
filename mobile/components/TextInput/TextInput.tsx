import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "tamagui";

import { StyledTextInput } from "./styled";

type TextInputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    control: Control<T>;
    error?: string;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address";
};

export const TextInput = <T extends FieldValues>({
    name,
    label,
    control,
    error,
    placeholder,
    secureTextEntry = false,
    keyboardType = "default",
}: TextInputProps<T>) => {
    return (
        <>
            <Label>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <StyledTextInput.Input
                            placeholder={placeholder}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry}
                            withError={!!error}
                        />
                        {error && <StyledTextInput.Error>{error}</StyledTextInput.Error>}
                    </>
                )}
            />
        </>
    );
};
