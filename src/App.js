import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "./Components/Container/Container";
import Chats from "./Components/Chats/Chats";
import Login from "./Components/Login/Login";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Agents from "./Components/Agents/Agents";
import Vendas from "./Components/Vendas/Vendas";
import Tags from "./Components/Tags/Tags";
import Clients from "./Components/Clients/Clients";
import Usuarios from "./Components/Usuarios/Usuarios";
import Disparos from "./Components/Disparos/Disparos";
import Product from "./Components/Product/Product";
import NovoDisparo from "./Components/NovoDisparo/NovoDisparo";
import Categorias from "./Components/Categorias/Categorias";
import Sale from "./Components/Sale/Sale";
import Signature from "./Components/Signature/Signature";
import ComprarDisparos from "./Components/ComprarDisparos/ComprarDisparos";

const navigation = [
  {
    path: "/",
    element: <Chats />,
  },
  {
    path: "/agents",
    element: <Agents />,
  },
  {
    path: "/clientes",
    element: <Clients />,
  },
  {
    path: "/tags",
    element: <Tags />,
  },
  {
    path: "/usuarios",
    element: <Usuarios />,
  },
  {
    path: "/disparos",
    element: <Disparos />,
  },
  {
    path: "/produtos",
    element: <Product />,
  },
  {
    path: "/novo-disparo",
    element: <NovoDisparo />,
  },
  {
    path: "/categorias",
    element: <Categorias />,
  },
  {
    path: "/vendas",
    element: <Sale />,
  },
  {
    path: "/assinatura",
    element: <Signature />,
  },
  {
    path: "/comprar-disparos",
    element: <ComprarDisparos />,
  },
];

// Função para detectar dispositivos móveis
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

function App() {
  const { credentials, loading } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  if (loading) {
    return <div>Verificando sessão...</div>;
  }

  if (isMobile) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>Acesso Restrito</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Esta aplicação está disponível apenas para acesso via desktop.
          </p>
          <p style={{ color: '#888', fontSize: '14px' }}>
            Por favor, acesse através de um computador para continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", boxSizing: "border-box" }}>
      <Routes>
        <Route
          path="/login"
          element={
            credentials?.isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        {navigation.map((nav, key) => (
          <Route
            key={key}
            path={nav.path}
            element={
              credentials?.isAuthenticated ? (
                <Container>{nav.element}</Container>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;