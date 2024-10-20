import { useForm } from "@mantine/form";

export type SignInFormInputs = {
    password: string;
    login: string;
};

export const useSignInForm = () => {
    const form = useForm<SignInFormInputs>({
        initialValues: {
            password: "",
            login: "",
        },

        validate: (values) => ({
            login: !values.login,
            password: !values.password,
        }),
    });

    return { form };
};
