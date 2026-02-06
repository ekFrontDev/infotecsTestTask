import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();
    
    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница не найдена"
            extra={
                <Button type="primary" onClick={() => navigate('/')}>
                    На главную
                </Button>
            }
        />
    );
};