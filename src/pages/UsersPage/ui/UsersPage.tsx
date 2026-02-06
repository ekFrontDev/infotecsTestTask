import React, { useState } from "react";
import dayjs from "dayjs";
import { useUsers } from '../../../entities/users/model/useUsers';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../shared/lib/localStorage";
import { CreateUserModal } from '../../../features/create-user/ui/CreateUserModal';
import { EditUserModal } from "../../../features/edit-user/ui/EditUserModal";
import { Users } from "../../../entities/users/types/users";

export const UsersPage = () => {
    const { data, isLoading, error } = useUsers();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        navigate("/");
    };

    const openEdit = (user: Users) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    if (isLoading) {
        return <div>Загрузка пользователей...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>Ошибка: {error.message}</div>;
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
                            style={{ borderRadius: "50%", cursor: "pointer" }}
                            onClick={() => openEdit(user)}
                        />
                        <div 
                            onClick={() => openEdit(user)}
                            style={{ cursor: "pointer" }}
                        >
                            {user.name}
                        </div>
                        <div>
                            Зарегистрирован:{" "}
                            {dayjs(user.createdAt).format("DD.MM.YYYY")}
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
            <EditUserModal
                open={isEditOpen}
                user={selectedUser}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
};