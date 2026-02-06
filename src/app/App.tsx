import React, { StrictMode } from "react";
import AppProviders from "./providers/index";
import { AppRouter } from "./providers/router";

const App = () => {
    return (
        <StrictMode>
            <AppProviders>
                <AppRouter />
            </AppProviders>
        </StrictMode>
    );
}

export default App;