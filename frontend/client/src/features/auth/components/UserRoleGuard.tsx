import { PropsWithChildren, useMemo } from "react";

import { useAuthState } from "@/features/auth";
import { InternalUserRole } from "@/types/Auth";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: InternalUserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const { role } = useAuthState();

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(role);
    }, [allowedRoles, role]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
