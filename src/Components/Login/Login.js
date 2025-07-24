import React, { useState, useContext, useEffect } from "react";
import styles from "./LoginStyle";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, credentials, loading } = useContext(AuthContext);
    const [id, setId] = useState("72295318");
    const [password, setPassword] = useState("u0a83&X#");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (id.trim() === "" || password.trim() === "")
            return alert("Insira corretamente suas credenciais.");

        try {
            await login(id, password);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    useEffect(() => {
        if (!loading && credentials?.isAuthenticated) {
          navigate("/", { replace: true });
        }
      }, [credentials, loading]);
      

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
                            </div>
                        </div>
                    </div>

                    <div style={styles.wallpaperContainer}>
                        <img src="./images/wallpaper1.webp" style={styles.wallpaperImage} />
                    </div>
                </div>
            </div>
        </div>
    );
}