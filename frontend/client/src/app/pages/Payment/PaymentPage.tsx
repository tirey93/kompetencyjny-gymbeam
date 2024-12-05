import { Navigate, useLocation } from "react-router-dom";

import styles from "./PaymentPage.module.scss";

import { AppRoute } from "@/app/router";
import { PaymentForm } from "@/features/subscriptions/components/PaymentForm/PaymentForm";
import { PaymentFormProvider } from "@/features/subscriptions/components/PaymentFormProvider/PaymentFormProvider";
import { useTranslate } from "@/lib/i18n";

export const PaymentPage = () => {
    const t = useTranslate();
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
                        description={t("pages.payment.gymMembership.form.description")}
                        title={t("pages.payment.gymMembership.form.title")}
                    />
                </PaymentFormProvider>
            </div>
        </div>
    );
};
