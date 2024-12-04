import { Navigate, useLocation } from "react-router-dom";

import styles from "./PaymentPage.module.scss";

import { AppRoute } from "@/app/router";
import { PaymentForm } from "@/features/subscriptions/components/PaymentForm/PaymentForm";
import { PaymentFormProvider } from "@/features/subscriptions/components/PaymentFormProvider/PaymentFormProvider";

export const PaymentPage = () => {
    const { state } = useLocation();
    const { clientSecret } = state;

    if (!clientSecret) {
        return <Navigate to={AppRoute.GYM_PASS} />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <PaymentFormProvider clientSecret={clientSecret}>
                    <PaymentForm
                        clientSecret={clientSecret}
                        description="Przedłuż ważność swojego karnetu o 30 dni. Zwroty rozpatrujemy indywidualnie przy recepcji w każdej z naszych placówek."
                        title="Przedłuż karnet"
                    />
                </PaymentFormProvider>
            </div>
        </div>
    );
};
