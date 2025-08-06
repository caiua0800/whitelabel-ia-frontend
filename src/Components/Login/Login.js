import React, { useState, useContext, useEffect } from "react";
import styles from "./LoginStyle";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiUser, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function Login() {
  const { login, credentials } = useContext(AuthContext);
  const [id, setId] = useState("DanielMors");
  const [password, setPassword] = useState("GoldenPass");
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (id.trim() === "" || password.trim() === "") {
      toast.error("Preencha todos os campos, gata!");
      return;
    }
    startLoading();
    try {
      const result = await login(id, password);

      if (result.success) {
        toast.success(result.message);
        navigate("/", { replace: true });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado. Tente de novo.");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (credentials?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [credentials, navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <img src="./images/agente-logo.png" style={styles.logo} alt="Logo" />
        <h1 style={styles.title}>Bem-vinda de volta ao futuro.</h1>
        <p style={styles.subtitle}>
          Automação e inteligência para atendimentos e vendas automáticas.
        </p>
      </div>

      <div style={styles.rightPanel}>
        <form style={styles.loginContainer} onSubmit={handleLogin}>
          <h2 style={styles.formTitle}>Acesse sua Conta</h2>

          <div style={styles.inputGroup}>
            <FiUser style={styles.inputIcon} />
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={styles.input}
              placeholder="Seu ID de Agente"
            />
          </div>

          <div style={styles.inputGroup}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Sua Senha Secreta"
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Login"}
            {!loading && <FiArrowRight style={styles.buttonIcon} />}
          </button>
        </form>
      </div>
    </div>
  );
}