import { PropsWithChildren } from "react";
import { Stack, Text, Title } from "@mantine/core";

export const FormWrapper = ({ children }: PropsWithChildren) => {
    return (
        <Stack mih="60vh" justify="center">
            <Title ta="center" mb="xl">
                Nice to meet{" "}
                <Text span c="success" inherit>
                    you
                </Text>
                !
            </Title>
            {children}
        </Stack>
    );
};
