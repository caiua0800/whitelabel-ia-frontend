import React, { useState, useContext, useEffect } from "react";
import styles from "./LoginStyle";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../Context/LoadingContext";

export default function Login() {
  const { login, credentials, loading } = useContext(AuthContext);
  const [id, setId] = useState("DevMello");
  const [password, setPassword] = useState("Caiua@2017");
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleLogin = async () => {
    startLoading();

    if (id.trim() === "" || password.trim() === "") {
      alert("Insira corretamente suas credenciais.");
      startLoading();
      return;
    }
    try {
      await login(id, password);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (!loading && credentials?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [credentials, loading]);

  return (
    <div style={styles.container}>
      <img
        style={styles.background}
        src="./images/background.png"
        alt="Background"
      />
      <div style={styles.content}>
        <div style={styles.contentContent}>
          <div style={styles.header}>
            <div style={styles.firstHeaderPart}>
              <img src="./images/agente-logo.png" style={styles.agentLogo} />
            </div>
            <div style={styles.secondHeaderPart}>
              <div style={styles.seLoko}>
                <span style={styles.seLokoTitle}>ID</span>
                <input
                  value={id}
                  type="text"
                  onChange={(e) => setId(e.target.value)}
                  style={styles.inputBox}
                  placeholder=""
                />
              </div>
              <div style={styles.seLoko}>
                <span style={styles.seLokoTitle}>Senha</span>
                <input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.inputBox}
                  placeholder=""
                />
              </div>
              <div style={styles.seLoko}>
                <span style={{ ...styles.seLokoTitle, opacity: 0 }}>s</span>
                <button onClick={() => {startLoading(); handleLogin()}} style={styles.loginButton}>
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
