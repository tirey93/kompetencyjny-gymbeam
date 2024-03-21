import { PropsWithChildren } from "react";
import { Stack, Text, Title } from "@mantine/core";

export const FormWrapper = ({ children }: PropsWithChildren) => {
    return (
        <Stack mih="60vh" justify="center">
            <Title ta="center" mb="xl">
                Happy to see{" "}
                <Text span c="success" inherit>
                    you
                </Text>{" "}
                here!
            </Title>
            {children}
        </Stack>
    );
};
