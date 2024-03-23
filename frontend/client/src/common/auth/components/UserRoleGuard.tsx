import { PropsWithChildren, useMemo } from "react";

import { UserRole } from "../Auth";
import { useAuthState } from "../hooks/useAuthState";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: UserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const currentUserDetails = useAuthState((state) => state.currentUserDetails);

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(currentUserDetails?.role ?? "Guest");
    }, [allowedRoles, currentUserDetails]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
