import { Button, Input, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useEditUser } from "../../../entities/users/model/useEditUser";
import { Users } from "../../../entities/users/types/users";
import { useDeleteUser } from "../../../entities/users/model/useDeleteUsers";

interface EditUserModalProps {
    open: boolean;
    user: Users | null;
    onClose: () => void;
}

export const EditUserModal = ({ open, user, onClose }: EditUserModalProps) => {
    const { mutate, isLoading } = useEditUser();
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAvatar(user.avatar);
        }
    }, [user]);

    if (!user) return null;

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
                ...user,
                name,
                avatar,
            },
            {
                onSuccess: () => {
                    setError('');
                    onClose();
                },
            }
        );
    };

    const handleDelete = () => {
        if (!user) return;

        deleteUser(user.id, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Modal
            title="Редактировать пользователя"
            open={open}
            onOk={handleOk}
            onCancel={onClose}
            okButtonProps={{ disabled: isLoading }}
            cancelButtonProps={{ disabled: isLoading }}
            closable={!isLoading}
            maskClosable={!isLoading}
            footer={[
                <Popconfirm
                    key="delete"
                    title="Удалить пользователя?"
                    description="Это действие нельзя отменить"
                    okText="Удалить"
                    cancelText="Отмена"
                    onConfirm={handleDelete}
                    disabled={isDeleting}
                >
                    <Button type="primary" loading={isDeleting}>
                        Удалить
                    </Button>
                </Popconfirm>,
                <Button key="save" type="primary" onClick={handleOk}>
                    Сохранить
                </Button>,
                <Button key="cancel" type="primary" onClick={onClose}>
                    Отмена
                </Button>,
            ]}
        >
            <Input disabled value={user.id} />
            <Input
                style={{ marginTop: 8 }}
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