import { useForm } from "@mantine/form";

export const useSignInForm = () => {
    const form = useForm({
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
