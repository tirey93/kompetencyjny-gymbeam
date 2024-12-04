import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import styles from "./PaymentStatusPage.module.scss";

import { AppRoute } from "@/app/router";
import { PaymentStatus } from "@/features/subscriptions/components/PaymentStatus/PaymentStatus";
import { stripePromise } from "@/features/subscriptions/lib/stripePromise";

export const PaymentStatusPage = () => {
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
        return <Navigate to={AppRoute.ROOT} />;
    }

    return (
        <div className={styles.container}>
            <Elements stripe={stripePromise}>
                <PaymentStatus clientSecret={clientSecret} />
            </Elements>
        </div>
    );
};
