import React, { useState } from "react";
import dayjs from 'dayjs';
import { useUsers } from '../../../entities/users/model/useUsers';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../shared/lib/localStorage";
import { CreateUserModal } from '../../../features/create-user/ui/CreateUserModal';

export const UsersPage = () => {
    const { data, isLoading, error } = useUsers();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        navigate('/');
    };

    if (isLoading) {
        return <div>Загрузка пользователей...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Ошибка: {error.message}</div>;
    }

    return (
        <>
            <h2>Страница пользователей</h2>
            <button onClick={logout}>Выход</button>

            <ul>
                {data?.map((user) => (
                    <li key={user.id} style={{ marginBottom: 16 }}>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            width={40}
                            height={40}
                            style={{ borderRadius: '50%' }}
                        />
                        <div>{user.name}</div>
                        <div>
                            Зарегистрирован:{' '}
                            {dayjs(user.createdAt).format('DD.MM.YYYY')}
                        </div>
                    </li>
                ))}
            </ul>

            <button onClick={() => setIsCreateOpen(true)}>
                Создать пользователя
            </button>

            <CreateUserModal
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </>
    );
};