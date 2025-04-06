import { Redirect, Stack } from "expo-router";

import { Screens } from "@/constants/Screens";
import { useAuthState } from "@/features/auth";
import { useReloadUser } from "@/features/users/hooks/useReloadUser";

export default function AuthLayout() {
    const { isSignedIn } = useAuthState();
    useReloadUser();

    if (isSignedIn) {
        return <Redirect href={Screens.GymPass} />;
    }

    return <Stack />;
}
