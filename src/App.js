import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "./Components/Container/Container";
import Chats from "./Components/Chats/Chats";
import Login from "./Components/Login/Login";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", boxSizing: "border-box" }}>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            user ? (
              <Container>
                <Chats />
              </Container>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;