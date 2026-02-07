import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../../features/auth/ui/LoginForm";
import { setToken, getToken } from '../../../shared/lib/localStorage';
import { Typography } from 'antd';
import styled from "styled-components";

const { Title } = Typography;

const PageWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FormWrapper = styled.div`
    width: 360px;
`;

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
        <PageWrapper>
            <Title level={3}>Авторизация</Title>
            <FormWrapper>
                <LoginForm onSuccess={handleSuccessLogin} />
            </FormWrapper>
        </PageWrapper>
);
};
