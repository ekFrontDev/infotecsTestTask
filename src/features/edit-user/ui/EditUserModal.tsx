import { Button, Input, Modal, Popconfirm, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useEditUser } from "../../../entities/users/model/useEditUser";
import { Users } from "../../../entities/users/types/users";
import { useDeleteUser } from "../../../entities/users/model/useDeleteUsers";
import styled from "styled-components";
interface EditUserModalProps {
    open: boolean;
    user: Users | null;
    onClose: () => void;
}

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RightButtons = styled.div`
    display: flex;
    gap: 8px;
`;

export const EditUserModal = ({ open, user, onClose }: EditUserModalProps) => {
    const [form] = Form.useForm();
    const { mutate, isLoading } = useEditUser();
    const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();

    useEffect(() => {
        if (user && open) {
            form.setFieldsValue({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            });
        }
    }, [user, open, form]);

    if (!user) return null;

    const handleFinish = (values: { name: string, avatar: string }) => {

        mutate(
            {
                ...user,
                name: values.name,
                avatar: values.avatar,
            },
            {
                onSuccess: () => {
                    form.resetFields();
                    onClose();
                },
            }
        );
    };

    const handleDelete = () => {
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
            onCancel={onClose}
            closable={!isLoading && !isDeleting}
            maskClosable={!isLoading && !isDeleting}
            footer={[
                <ModalFooter>
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
                    </Popconfirm>
                    <RightButtons>
                        <Button key="save" type="primary" onClick={() => form.submit()}>
                            Сохранить
                        </Button>
                        <Button key="cancel" type="primary" onClick={onClose} disabled={isLoading || isDeleting}>
                            Отмена
                        </Button>
                    </RightButtons>
                </ModalFooter>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
            >
                <Form.Item
                    label="id"
                    name="id"
                    
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        { required: true, message: "Введите имя" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        { required: true, message: "Введите ссылку" },
                        { type: "url", message: "Некорректная ссылка" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};