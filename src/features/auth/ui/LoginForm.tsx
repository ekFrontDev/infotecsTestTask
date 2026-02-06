import React, { useState } from "react";
import { useLogin } from "../model/useLogin";

interface LoginFormProps {
    onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isLoading, error } = useLogin();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        mutate(
            { username, password },
            {
                onSuccess: () => {
                    onSuccess();
                },
            }
        );
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <div style={{ color: "red" }}>{error.message}</div>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Войти"}
            </button>
        </form>
    );
};
