import React, { useState, useContext } from "react";
import styles from "./LoginStyle";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [id, setId] = useState("523106");
    const [password, setPassword] = useState("^hY4D9hY");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (id.trim() === "" || password.trim() === "")
            return alert("Insira corretamente suas credenciais.");

        try {
            await login(id, password);
            navigate("/", { replace: true }); // Redireciona para a página principal
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div style={styles.container}>
            <img style={styles.background} src="./images/background.png" alt="Background" />
            <div style={styles.content}>
                <div style={styles.contentContent}>
                    <div style={styles.header}>
                        <div style={styles.firstHeaderPart}></div>
                        <div style={styles.secondHeaderPart}>
                            <input 
                                value={id} 
                                type="text" 
                                onChange={(e) => setId(e.target.value)} 
                                style={styles.inputBox} 
                                placeholder="ID" 
                            />
                            <input 
                                value={password} 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                style={styles.inputBox} 
                                placeholder="Senha" 
                            />
                            <div style={styles.loginOrSignUp}>
                                <button onClick={handleLogin} style={styles.loginButton}>
                                    Login
                                </button>
                                <span style={{ color: "white", fontWeight: "600" }}>OU</span>
                                <div style={styles.signUpButton}>Cadastre-se</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}