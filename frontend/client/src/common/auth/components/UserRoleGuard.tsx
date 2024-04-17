import { PropsWithChildren, useMemo } from "react";

import { InternalUserRole } from "../Auth";
import { useAuthState } from "../hooks/useAuthState";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: InternalUserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const { role } = useAuthState();

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(role);
    }, [allowedRoles, role]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
