import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [credentials, setCredentials] = useState(null);

    const login = async (id, password) => {
        try {
            var response = await axios.post(`${process.env.REACT_APP_BASE_ROUTE}auth/login`, {
                loginId: id,
                password
            });
            if (response.status === 200) {
                setUser(response.data.admin)
                console.log(response.data)
                setCredentials({
                    accessToken: `Bearer ${response.data.access_token}`,
                    refreshToken: response.data.refresh_token,
                })
            }
        } catch (error) {
            console.log(`Erro no login: ${error}`)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            credentials
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;