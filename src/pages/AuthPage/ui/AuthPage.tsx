import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../features/auth/ui/LoginForm";
import { setToken, getToken } from '../../../shared/lib/localStorage';

export const AuthPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken()) {
            console.log('getToken')
            navigate('/users');
        }
    }, [])

    const handleSuccessLogin = () => {
        setToken('fake-jwt-token');
        navigate('/users');
    };

    return (
        <div>
            <h2>Авторизация</h2>
            <LoginForm onSuccess={handleSuccessLogin} />
        </div>
    );
};
