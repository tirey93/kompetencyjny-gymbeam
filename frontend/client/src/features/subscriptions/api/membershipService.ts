import { request } from "@/api";
import { PaymentIntent } from "@/features/subscriptions/api/types";

export class MembershipService {
    public static order(): Promise<PaymentIntent> {
        return request<PaymentIntent>("Subscription/PaymentIntent", { method: "POST" });
    }
}
