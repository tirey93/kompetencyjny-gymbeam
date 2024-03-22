import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Routes } from "../Routes";

export const useRedirect = (to: Routes, condition: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (condition) {
            navigate(to);
        }
    }, [condition, navigate, to]);
};
