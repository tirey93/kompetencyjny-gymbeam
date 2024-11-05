import React from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("@/app/pages/Home").then((module) => ({ default: module.HomePage })));

const RegistrationPage = React.lazy(() =>
    import("@/app/pages/Registration").then((module) => ({ default: module.RegistrationPage }))
);

const SignInPage = React.lazy(() => import("@/app/pages/SignIn").then((module) => ({ default: module.SignInPage })));

const GymPassPage = React.lazy(() => import("@/app/pages/GymPass").then((module) => ({ default: module.GymPassPage })));

const ActivitiesPage = React.lazy(() =>
    import("@/app/pages/Activities").then((module) => ({ default: module.ActivitiesPage }))
);

const UsersDashboardPage = React.lazy(() =>
    import("@/app/pages/UsersDashboard").then((module) => ({ default: module.UsersDashboardPage }))
);

const ActivitiesDashboardPage = React.lazy(() =>
    import("@/app/pages/ActivitiesDashboard").then((module) => ({ default: module.ActivitiesDashboardPage }))
);

const ReservationsPage = React.lazy(() =>
    import("@/app/pages/Reservations").then((module) => ({ default: module.ReservationsPage }))
);

const LegalPage = React.lazy(() =>
    import("@/app/pages/Legal/LegalPage").then((module) => ({ default: module.LegalPage }))
);

const NotFoundPage = React.lazy(() => import("@/app/pages/404").then((module) => ({ default: module.NotFoundPage })));

import { PaymentsPage } from "@/app/pages/Payments";
import { AppRoute } from "@/app/router/AppRoute";
import { ProtectedRoute } from "@/app/router/components/ProtectedRoute";
import { WithSuspense } from "@/app/router/components/WithSuspense";
import { AppProvider } from "@/AppProvider";
import { Root } from "@/Root";

const APP_PAGES = [
    {
        path: AppRoute.ROOT,
        element: WithSuspense(<HomePage />),
    },
    {
        path: AppRoute.REGISTRATION,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={AppRoute.ROOT}>
                <RegistrationPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.LOGIN,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["Guest"]} redirectUnauthorizedTo={AppRoute.ROOT}>
                <SignInPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.GYM_PASS,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <GymPassPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.PAYMENTS,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <PaymentsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.ACTIVITIES,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ActivitiesPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.USERS_DASHBOARD,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <UsersDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.ACTIVITIES_DASHBOARD,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ActivitiesDashboardPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.RESERVATIONS,
        element: WithSuspense(
            <ProtectedRoute allowedRoles={["User", "Admin"]} redirectUnauthorizedTo={AppRoute.LOGIN}>
                <ReservationsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: AppRoute.LEGAL,
        element: WithSuspense(<LegalPage />),
    },
];

export const router = createBrowserRouter([
    {
        path: AppRoute.ROOT,
        element: <AppProvider />,
        children: [
            {
                path: AppRoute.ROOT,
                element: <Root />,
                children: APP_PAGES,
            },
            {
                path: "*",
                element: WithSuspense(<NotFoundPage />),
            },
        ],
    },
]);
