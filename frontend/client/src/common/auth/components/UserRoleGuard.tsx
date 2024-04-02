import { PropsWithChildren, useMemo } from "react";

import { InternalUserRole } from "../Auth";
import { useAuthState } from "../hooks/useAuthState";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: InternalUserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const currentUserRole = useAuthState((state) => state.currentUserDetails?.role ?? "Guest");

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(currentUserRole);
    }, [allowedRoles, currentUserRole]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
