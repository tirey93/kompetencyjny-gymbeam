import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuthState, UserRole } from "../../../../common/auth";
import { Routes } from "../../Routes";

type ProtectedRouteProps = PropsWithChildren<{
    allowedRoles: UserRole[];
    redirectUnauthorizedTo: Routes;
}>;

export const ProtectedRoute = ({ allowedRoles, children, redirectUnauthorizedTo }: ProtectedRouteProps) => {
    const getCurrentUserRole = useAuthState((state) => state.getCurrentUserRole);

    if (!allowedRoles.find((role) => role === getCurrentUserRole())) {
        return <Navigate to={redirectUnauthorizedTo} replace />;
    }

    return <>{children}</>;
};
