import { request } from "@/api";
import { PaymentIntent } from "@/features/subscriptions/api/types";

export class SubscriptionsService {
    public static startPaymentProcess(): Promise<PaymentIntent> {
        return request<PaymentIntent>("Subscription/PaymentIntent", { method: "POST" });
    }
}
