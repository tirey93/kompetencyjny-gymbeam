import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { StyledTextInput } from "./styled";

import { Requirements } from "@/components/Requirements/Requirements";

type TextInputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    control: Control<T>;
    error?: string;
    requirements?: string[];
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address";
};

export const TextInput = <T extends FieldValues>({
    name,
    label,
    control,
    error,
    requirements,
    placeholder,
    secureTextEntry = false,
    keyboardType = "default",
}: TextInputProps<T>) => {
    return (
        <>
            <StyledTextInput.Label>{label}</StyledTextInput.Label>
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

                        {requirements && <Requirements requirements={requirements} error={error} />}
                        {error && !requirements && <StyledTextInput.Error>{error}</StyledTextInput.Error>}
                    </>
                )}
            />
        </>
    );
};
