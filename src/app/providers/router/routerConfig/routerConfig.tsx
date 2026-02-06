import React from "react";
import { AuthPage } from '../../../../pages/AuthPage';
import { NotFoundPage } from "../../../../pages/NotFoundPage";
import { UsersPage } from "../../../../pages/UsersPage";
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  LOGIN = "login",
  USERS = "users",
  NOT_FOUND = "not_found",
};

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.LOGIN]: "/",
    [AppRoutes.USERS]: "/users", 
    [AppRoutes.NOT_FOUND]: "*"
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <AuthPage />,
    },
    [AppRoutes.USERS]: {
        path: RoutePath.users,
        element: <UsersPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
