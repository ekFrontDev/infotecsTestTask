import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../../../shared/lib/localStorage";

interface AuthGuardProps {
    children: JSX.Element;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};