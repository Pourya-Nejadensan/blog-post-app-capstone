import { useState, useEffect } from 'react';
import { getUser, login, logout } from "../services/AuthService.tsx";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        const user = await getUser();
        setIsAuthenticated(!!user);
    };

    const handleLogin = async () => {
        login();
        await checkAuth();
    };

    const handleLogout = async () => {
        logout();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const initializeAuth = async () => {
            await checkAuth();
        };
        initializeAuth().then(r => r);
    }, []);

    return { isAuthenticated, handleLogin, handleLogout, checkAuth };
}
