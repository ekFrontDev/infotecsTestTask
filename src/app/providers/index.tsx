import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./query/index";

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <BrowserRouter>
            <QueryProvider>
                {children}
            </QueryProvider>
        </BrowserRouter>
    );
};

export default AppProviders;