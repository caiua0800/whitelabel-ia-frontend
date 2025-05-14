import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "./Components/Container/Container";
import Chats from "./Components/Chats/Chats";
import Login from "./Components/Login/Login";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import Agents from "./Components/Agents/Agents";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", boxSizing: "border-box" }}>

      <Container>
        {/* <Chats /> */}
        <Agents />
      </Container>
    </div>
  );
}

export default App;

// <Routes>
//         <Route
//           path="/login"
//           element={user ? <Navigate to="/" replace /> : <Login />}
//         />
//         <Route
//           path="/"
//           element={
//             user ? (
//               <Container>
//                 {/* <Chats /> */}
//                 <Agents />
//               </Container>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>