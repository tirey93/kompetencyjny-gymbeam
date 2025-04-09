import { apiRequest } from "@/api";
import { PaymentIntent } from "@/features/subscriptions/api/types";

export class MembershipService {
    public static order(): Promise<PaymentIntent> {
        return apiRequest<PaymentIntent>("User/Subscription", { method: "POST" });
    }
}
