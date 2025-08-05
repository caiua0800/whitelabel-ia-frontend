import React, { useEffect } from "react";
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

function App() {
  const { credentials, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Verificando sessão...</div>;
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