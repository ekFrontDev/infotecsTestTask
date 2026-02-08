import React, { useState } from "react";
import { Modal, Input, Form, Button } from "antd";
import { useCreateUser } from "../../../entities/users/model/useCreateUser";

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateUserModal = ({ open, onClose }: CreateUserModalProps) => {
    const [form] = Form.useForm();
    const { mutate, isLoading } = useCreateUser();

    const handleFinish = (values: { name: string, avatar: string }) => {
        mutate(
            {
                name: values.name,
                avatar: values.avatar,
                createdAt: new Date().toISOString(),
            },
            {
                onSuccess: () => {
                    form.resetFields();
                    onClose();
                },
            }
        );
    };

    return (
        <Modal
            title="Создание пользователя"
            open={open}
            onCancel={onClose}
            footer={[
                <Button
                    key="create"
                    type="primary"
                    loading={isLoading}
                    onClick={() => form.submit()}
                >
                    Создать
                </Button>,
                <Button
                    key="cancel"
                    type="primary"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Отмена
                </Button>,
            ]}
            closable={!isLoading}
            maskClosable={!isLoading}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
            >
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