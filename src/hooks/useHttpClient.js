import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal
            });
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                (requestCtrl) => requestCtrl !== httpAbortCtrl
            );

            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
            throw err;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    useEffect(() => {
        return () => activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
