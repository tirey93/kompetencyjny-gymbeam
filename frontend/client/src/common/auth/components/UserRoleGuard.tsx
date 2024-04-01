import { PropsWithChildren, useMemo } from "react";

import { InternalUserRole } from "../Auth";
import { useAuthState } from "../hooks/useAuthState";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: InternalUserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const getCurrentUserRole = useAuthState((state) => state.getCurrentUserRole);

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(getCurrentUserRole());
    }, [allowedRoles, getCurrentUserRole]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
