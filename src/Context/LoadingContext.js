import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    const stopLoadingDelay = () => {
        setTimeout(() => {
            setLoading(false);
        }, 500)
    }

    return (
        <LoadingContext.Provider value={{
            startLoading,
            stopLoading,
            stopLoadingDelay,
            loading
        }}>
            {children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;