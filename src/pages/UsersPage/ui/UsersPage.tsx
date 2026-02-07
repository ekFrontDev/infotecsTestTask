import React, { useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { List, Avatar, Button, Typography, Spin, Alert } from "antd";

import { useUsers } from '../../../entities/users/model/useUsers';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../shared/lib/localStorage";
import { CreateUserModal } from '../../../features/create-user/ui/CreateUserModal';
import { EditUserModal } from "../../../features/edit-user/ui/EditUserModal";
import { Users } from "../../../entities/users/types/users";

const { Text } = Typography;

const PageWrapper = styled.div`
    padding: 24px;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
`;

const Footer = styled.div`
    margin-top: 24px;
`;

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
        return (
            <PageWrapper>
                <Spin />
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper>
                <Alert
                    type="error"
                    message="Ошибка загрузки пользователей"
                    description={error.message}
                    showIcon
                />
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Header>
                <Button type="primary" onClick={logout}>
                    Выход
                </Button>
            </Header>


            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={user.avatar}
                                    size={40}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openEdit(user)}
                                />
                            }
                            title={
                                <Text
                                    strong
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openEdit(user)}
                                >
                                    {user.name}
                                </Text>
                            }
                            description={
                                <Text type="secondary">
                                    Зарегистрирован{" "}
                                    {dayjs(user.createdAt).format("DD.MM.YYYY")}
                                </Text>
                            }
                        />
                    </List.Item>
                )}
            />

            <Footer>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                    Создать пользователя
                </Button>
            </Footer>

            <CreateUserModal
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
            <EditUserModal
                open={isEditOpen}
                user={selectedUser}
                onClose={() => setIsEditOpen(false)}
            />
        </PageWrapper>
    );
};