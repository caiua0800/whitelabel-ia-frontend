import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [enterprise, setEnterprise] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  console.log(enterprise)

  const logout = () => {
    setUser(null);
    setEnterprise(null);
    setCredentials(null);
    sessionStorage.removeItem("authData");
    sessionStorage.removeItem("enterprise-refresh-token");
    navigate("/login");
  };

  const login = async (id, password) => {
    try {
      var response = await axios.post(
        `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}auth/login`,
        {
          loginId: id,
          password,
        }
      );
      if (response.status === 200) {
        const authData = {
          accessToken: `Bearer ${response.data.access_token}`,
          refreshToken: response.data.refresh_token,
          isAuthenticated: true,
          user: response.data.admin,
          enterprise: response.data.enterprise,
          subscription_info: response.data.subscription_info
        };
        
        setUser(authData.user);
        setEnterprise(authData.enterprise);
        setCredentials(authData);
        setSubscriptionInfo(response.data.subscription_info)
        
        sessionStorage.setItem("authData", JSON.stringify(authData));
        sessionStorage.setItem(
          "enterprise-refresh-token",
          response.data.refresh_token
        );
      }
    } catch (error) {
      console.log("Erro no login");
      console.log(error.message)
    }
  };

  const handleRefresh = useCallback(async () => {
    const refreshToken = sessionStorage.getItem("enterprise-refresh-token");
    const savedAuthData = sessionStorage.getItem("authData");
    
    if (refreshToken) {
      try {
        // Primeiro tenta renovar o token
        var response = await axios.post(
          `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}auth/refresh-token`,
          { refreshToken }
        );
        
        if (response.status === 200) {
          // Se tiver dados salvos, usa eles mantendo as informações do usuário
          let authData = savedAuthData ? JSON.parse(savedAuthData) : null;
          
          if (authData) {
            // Atualiza apenas os tokens mantendo os outros dados
            authData = {
              ...authData,
              accessToken: `Bearer ${response.data.access_token}`,
              refreshToken: response.data.refresh_token,
              isAuthenticated: true
            };
          } else {
            // Se não tiver dados salvos (caso raro), faz um fallback
            authData = {
              accessToken: `Bearer ${response.data.access_token}`,
              refreshToken: response.data.refresh_token,
              isAuthenticated: true,
              user: null,
              enterprise: null,
              subscription_info: null
            };
          }
          
          setUser(authData.user);
          setEnterprise(authData.enterprise);
          setCredentials(authData);
          
          // Atualiza os dados no sessionStorage
          sessionStorage.setItem("authData", JSON.stringify(authData));
          sessionStorage.setItem(
            "enterprise-refresh-token",
            response.data.refresh_token
          );
        }
      } catch (error) {
        console.error("Erro ao tentar renovar o token:", error);
        sessionStorage.removeItem("enterprise-refresh-token");
        sessionStorage.removeItem("authData");
        setUser(null);
        setEnterprise(null);
        setCredentials(null);
      } finally {
        setLoading(false);
      }
    } else if (savedAuthData) {
      // Se não tiver refresh token mas tiver dados salvos, usa eles
      const authData = JSON.parse(savedAuthData);
      setUser(authData.user);
      setEnterprise(authData.enterprise);
      setCredentials(authData);
      setLoading(false);
    } else {
      // Caso não tenha nada
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  if (loading) {
    return <div>Verificando sessão...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        credentials, 
        handleRefresh, 
        loading, 
        enterprise,
        setUser,
        setEnterprise,
        logout,
        subscriptionInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;