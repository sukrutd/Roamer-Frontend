import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpiration, setTokenExpiration] = useState(null);

    const login = useCallback((uid, token, expirationDate) => {
        setUserId(uid);
        setToken(token);
        const tokenExpirationDate = expirationDate || new Date(Date.now() + 1000 * 60 * 60);
        setTokenExpiration(tokenExpirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() })
        );
    }, []);

    const logout = useCallback(() => {
        setUserId(null);
        setToken(null);
        setTokenExpiration(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            const storedExpirationDate = new Date(storedData.expiration);
            if (storedData && storedData.token && storedExpirationDate > new Date()) {
                login(storedData.userId, storedData.token, storedExpirationDate);
            }
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpiration) {
            const remainingTime = tokenExpiration.getTime() - Date.now();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [logout, token, tokenExpiration]);

    return { userId, token, login, logout };
};
