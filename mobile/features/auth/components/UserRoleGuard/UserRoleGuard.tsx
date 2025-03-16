import { PropsWithChildren, useMemo } from "react";

import { useAuthState } from "../../../auth/hooks/useAuthState";

import { InternalUserRole } from "@/types";

type RoleGuardProps = PropsWithChildren<{ allowedRoles: InternalUserRole[] }>;

export const UserRoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const { role } = useAuthState();

    const shouldDisplayChildren = useMemo(() => {
        return allowedRoles.includes(role);
    }, [allowedRoles, role]);

    return shouldDisplayChildren ? <>{children}</> : null;
};
