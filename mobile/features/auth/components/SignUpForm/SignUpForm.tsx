import { Form, Input, Label } from "tamagui";

import { SignUpFormStyled } from "@/features/auth/components/SignUpForm/styles";

export const SignUpForm = () => {
    return (
        <Form width="100%">
            <Label>Username</Label>
            <Input placeholder="Enter your username" />

            <Label>Email</Label>
            <Input placeholder="Enter your email" />

            <Label>Password</Label>
            <Input placeholder="Enter your password" secureTextEntry />

            <Form.Trigger>
                <SignUpFormStyled.SubmitButton theme="accent">Sign Up</SignUpFormStyled.SubmitButton>
            </Form.Trigger>
        </Form>
    );
};
