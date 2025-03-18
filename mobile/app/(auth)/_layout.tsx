import { Redirect, Stack } from "expo-router";

import { Screens } from "@/constants/Screens";
import { useAuthState } from "@/features/auth";

export default function AuthLayout() {
    const { isSignedIn } = useAuthState();

    if (isSignedIn) {
        return <Redirect href={Screens.GymPass} />;
    }

    return <Stack />;
}
