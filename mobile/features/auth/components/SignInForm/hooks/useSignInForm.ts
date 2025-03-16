import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type SignInFormInputs = {
    password: string;
    login: string;
};

const schema = yup.object({
    password: yup.string().required("Password is required."),
    login: yup.string().required("Login is required."),
});

export const useSignInForm = () => {
    return useForm<SignInFormInputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            password: "",
            login: "",
        },
    });
};
