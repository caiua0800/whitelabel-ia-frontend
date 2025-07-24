import React, { useState, useEffect, useContext } from "react";
import style from "./ChangePassStyle";
import { changePass } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ChangePass({ onClose }) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const {user, credentials, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setPass1("");
    setPass2("");
    onClose();
  };

  const handleClose2 = () => {
    setPass1("");
    setPass2("");
    onClose();
    navigate("/login");
  };

  const handleChangePass = async () => {
    if(pass2 != pass3){
        alert("As senhas não se coincidem.");
        return;
    }
    try {
        const response = await changePass(pass1.trim(), pass2.trim(), user.id, credentials.accessToken);

        if(response){
            alert("Senha alterada com sucesso! Faça novamente o login.");
            console.log(response);
            handleClose2();
        }
    } catch (error) {
        alert("Erro ao atualizar a senha.");
        console.log(error);
    }
  }

  return (
    <>
      <div style={style.container}>
        <div style={style.modal}>
          <span onClick={handleClose} style={style.close}>
            x
          </span>
          <span style={style.title}>Mude sua senha</span>

          <div style={style.inputs}>
            <div style={style.inputBox}>
              <span style={style.inputBoxTitle}>Digite a senha atual</span>
              <input
                onChange={(e) => setPass1(e.target.value)}
                value={pass1}
                placeholder=""
                style={style.input}
              />
            </div>
            <div style={style.inputBox}>
              <span style={style.inputBoxTitle}>Digite a nova senha</span>
              <input
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
                placeholder=""
                style={style.input}
              />
            </div>
            <div style={style.inputBox}>
              <span style={style.inputBoxTitle}>Confirme a nova senha</span>
              <input
                onChange={(e) => setPass3(e.target.value)}
                value={pass3}
                placeholder=""
                style={style.input}
              />
            </div>
            <button onClick={handleChangePass} style={style.confirmButton}>Confirmar</button>
          </div>
          <div style={style.obsContainer}>
            <span style={style.obsText}>A senha deve conter ao menos 6 caracteres</span>
          </div>
        </div>
      </div>
    </>
  );
}
