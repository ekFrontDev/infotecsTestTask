import React from "react";
import { Route, Routes } from "react-router-dom";
import { routerConfig } from "../routerConfig/routerConfig";


const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routerConfig).map(({ element, path }) => {
                return (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <div className="page-wrapper">
                                {element}
                            </div>
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default AppRouter;
