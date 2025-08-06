import React, { useState, useContext } from "react";
import style from "./ChangePassStyle";
import { changePass } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiX, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ChangePass({ onClose }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const { user, credentials, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (pass2 !== pass3) {
      toast.error("As novas senhas não coincidem.");
      return;
    }
    if (pass2.length < 6) {
        toast.error("A nova senha deve ter no mínimo 6 caracteres.");
        return;
    }

    try {
      await changePass(pass1.trim(), pass2.trim(), user.id, credentials.accessToken);
      toast.success("Senha alterada com sucesso! Faça o login novamente.");
      logout();
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao atualizar a senha. Verifique sua senha atual.");
      console.error(error);
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.title}>Alterar Senha</h2>
            <button onClick={onClose} style={style.close}><FiX size={20}/></button>
        </div>
        <form onSubmit={handleChangePass} style={style.form}>
            <div style={style.inputGroup}>
              <label style={style.label}>Senha Atual</label>
              <div style={style.inputWrapper}>
                <FiLock style={style.inputIcon}/>
                <input type="password" onChange={(e) => setPass1(e.target.value)} value={pass1} style={style.input} required />
              </div>
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Nova Senha</label>
              <div style={style.inputWrapper}>
                <FiLock style={style.inputIcon}/>
                <input type="password" onChange={(e) => setPass2(e.target.value)} value={pass2} style={style.input} required />
              </div>
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Confirme a Nova Senha</label>
              <div style={style.inputWrapper}>
                <FiLock style={style.inputIcon}/>
                <input type="password" onChange={(e) => setPass3(e.target.value)} value={pass3} style={style.input} required />
              </div>
            </div>
            <button type="submit" style={style.confirmButton}>Confirmar Alteração</button>
        </form>
      </div>
    </div>
  );
}