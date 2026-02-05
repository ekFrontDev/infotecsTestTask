import React from "react";
import { AuthPage } from "src/pages/AuthPage";
// import { NotFoundPage } from "src/pages/NotFoundPage";
import { UsersPage } from "src/pages/UsersPage";
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  AUTH = "auth",
  USERS = "users",
//   NOT_FOUND = "not_found",
};

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: "/",
    [AppRoutes.USERS]: "/users", 
    // [AppRoutes.NOT_FOUND]: "*"
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <AuthPage />,
    },
    [AppRoutes.USERS]: {
        path: RoutePath.users,
        element: <UsersPage />,
    },
    // [AppRoutes.NOT_FOUND]: {
    //     path: RoutePath.not_found,
    //     element: <NotFoundPage />,
    // },
};
