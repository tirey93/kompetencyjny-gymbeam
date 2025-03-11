import { Form, Input, Label } from "tamagui";

import { SignInFormStyled } from "@/features/auth/components/SignInForm/styles";

export const SignInForm = () => {
    return (
        <Form width="100%">
            <Label>Email</Label>
            <Input placeholder="Enter your email" />

            <Label>Password</Label>
            <Input placeholder="Enter your password" secureTextEntry />

            <Form.Trigger asChild>
                <SignInFormStyled.SubmitButton theme="accent">Log In</SignInFormStyled.SubmitButton>
            </Form.Trigger>
        </Form>
    );
};
