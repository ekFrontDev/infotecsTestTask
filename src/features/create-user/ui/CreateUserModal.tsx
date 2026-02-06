import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useCreateUser } from "../../../entities/users/model/useCreateUser";

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
    const { mutate, isLoading } = useCreateUser();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");

    const handleOk = () => {
        if (!name || !avatar) {
            setError("Все поля обязательны");
            return;
        }

        if (!avatar.startsWith("http")) {
            setError("Некорректная ссылка");
            return;
        }

        mutate(
            {
                name,
                avatar,
                createdAt: new Date().toISOString(),
            },
            {
                onSuccess: () => {
                    onClose();
                    setName('');
                    setAvatar('');
                    setError('');
                },
            }
        );
    };

    return (
        <Modal
            title="Создание пользователя"
            okText='Создать'
            cancelText='Отмена'
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okButtonProps={{ disabled: isLoading }}
            cancelButtonProps={{ disabled: isLoading }}
            closable={!isLoading}
            maskClosable={!isLoading}
        >
            <Input
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                style={{ marginTop: 8 }}
                placeholder="Ссылка на аватарку"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </Modal>
    );
};
