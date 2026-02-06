import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../shared/lib/localStorage";

export const UsersPage = () => {
    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        navigate('/');
    };

    return (
        <>
            <h2>Страница пользователей</h2>
            <button onClick={logout}>Выход</button>
        </>
    );
};