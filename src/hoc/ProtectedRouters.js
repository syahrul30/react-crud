import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouters = (props) => {
        const [login, setLogin] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setLogin(false);
                setIsLoading(false);
            } else {
                setLogin(true);
                setIsLoading(false);
            }
        }, [login]);

        if (isLoading) return;

        if (!login) return <Navigate to="/login" />;
        return props.children;
};

export default ProtectedRouters;