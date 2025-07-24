import React, { useState, useContext, useRef } from "react";
import style from "./StartChatStyle";
import { iniciarChat } from "../../../../Services/dbservice";
import { AuthContext } from "../../../../Context/AuthContext";
import { ChatContext } from "../../../../Context/ChatContext";

export default function StartChat({ onClose }) {
  const [contact, setContact] = useState("");
  const [myName, setMyName] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [text, setText] = useState("");
  const textInputRef = useRef(null);
  const { credentials } = useContext(AuthContext);
  const { fetchNewChat, selectedAgent } = useContext(ChatContext);

  const formatNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

    if (match) {
      let formatted = "";
      if (match[1]) formatted += `(${match[1]}`;
      if (match[2]) formatted += `) ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
      return formatted;
    }
    return number;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "");
    const formatted = formatNumber(cleaned);
    setContact(cleaned);
    setDisplayValue(formatted);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleNameChange = (e) => {
    setMyName(e.target.value);
  };

  const handleClose = () => {
    setContact("");
    setDisplayValue("");
    setText("");
    onClose();
  };

  const handleSendMessage = async () => {
    if (!text.trim()) {
      alert("Por favor, digite uma mensagem.");
      return;
    }

    if (!contact.trim()) return;

    if (contact.trim().length !== 11 && contact.trim().length !== 10) {
      alert("Número incorreto. Digite um número com DDD (11 dígitos) ou sem DDD (10 dígitos).");
      return;
    }

    try {
      const response = await iniciarChat(
        credentials.accessToken,
        selectedAgent.number,
        { number: "55" + contact.trim(), name: "Sem nome" },
        text,
        myName
      );
      
      if (response === 200) {
        await fetchNewChat("55" + contact.trim());
        handleClose();
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Erro ao enviar mensagem. Por favor, tente novamente.");
    }
  };

  return (
    <div style={style.container}>
      <div style={style.containerContent}>
        <div style={style.modalContainer}>
          <span onClick={handleClose} style={style.close}>
            x
          </span>
          <span style={style.modalTitle}>Inicie um chat</span>

          <div style={style.inputBox}>
            <span style={style.textBoxTitle}>Número do contato</span>
            <input
              onChange={handleChange}
              value={displayValue}
              placeholder="DDD + Número (ex: 11987654321)"
              maxLength={15}
              style={style.input}
            />
          </div>

          <div style={style.inputBox}>
            <span style={style.textBoxTitle}>Olá tudo bem? me chamo %seu_nome%:</span>
            <input
              ref={textInputRef}
              onChange={handleNameChange}
              value={myName}
              placeholder="Digite o valor de %seu_nome% aqui..."
              style={style.messageBox1}
            />
          </div>

          <div style={style.inputBox}>
            <span style={style.textBoxTitle}>Estou entrando em contato %texto%:</span>
            <textarea
              ref={textInputRef}
              onChange={handleTextChange}
              value={text}
              placeholder="Digite o conteúdo de %texto% aqui..."
              style={style.messageBox2}
            />
          </div>

          <button onClick={handleSendMessage} style={style.sendMessage}>
            Iniciar chat
          </button>
        </div>
      </div>
    </div>
  );
}