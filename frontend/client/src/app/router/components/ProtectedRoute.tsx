import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { AppRoute } from "../AppRoute";

import { useAuthState } from "@/features/auth";
import { InternalUserRole } from "@/types";

type ProtectedRouteProps = PropsWithChildren<{
    allowedRoles: InternalUserRole[];
    redirectUnauthorizedTo: AppRoute;
}>;

export const ProtectedRoute = ({ allowedRoles, children, redirectUnauthorizedTo }: ProtectedRouteProps) => {
    const { role } = useAuthState();

    if (!allowedRoles.find((allowedRole) => allowedRole === role)) {
        return <Navigate to={redirectUnauthorizedTo} replace />;
    }

    return <>{children}</>;
};
