import React from "react";
import styled from "styled-components";
import { useLogin } from "../model/useLogin";
import { Form, Input, Button, Alert } from 'antd';

interface LoginFormProps {
    onSuccess: () => void;
}

interface LoginFormValues {
    username: string;
    password: string;
}

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const LoginForm = ({ onSuccess }: LoginFormProps) => {

    const { mutate, isLoading, error } = useLogin();

    const onFinish = (values: LoginFormValues) => {
        mutate(values, {
            onSuccess: () => {
                onSuccess();
            },
        });
    };

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[
                    { required: true, message: "Введите логин" },
                ]}
            >
                <Input placeholder="Логин" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, message: "Введите пароль" },
                ]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>

            {error && (
                <Form.Item>
                    <Alert
                        type="error"
                        message={error.message}
                        showIcon
                    />
                </Form.Item>
            )}

            <Form.Item>
                <ButtonWrapper>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Войти
                    </Button>
                </ButtonWrapper>
            </Form.Item>
        </Form>
    );
};
