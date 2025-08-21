import React, { useState, useContext } from "react";
import style from "./StartChatStyle";
import { iniciarChat } from "../../../../Services/dbservice";
import { AuthContext } from "../../../../Context/AuthContext";
import { ChatContext } from "../../../../Context/ChatContext";
import { LoadingContext } from "../../../../Context/LoadingContext";
import { FiX, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function StartChat({ onClose, reload }) {
  const [contact, setContact] = useState("");
  const [myName, setMyName] = useState("");
  const [displayValue, setDisplayValue] = useState("");
  const [text, setText] = useState("");
  const { credentials, enterprise } = useContext(AuthContext);
  const { selectedAgent } = useContext(ChatContext);
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);

  const formatNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return "";
    let formatted = "";
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const handleChange = (e) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    setContact(cleaned);
    setDisplayValue(formatNumber(cleaned));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("A mensagem não pode estar vazia.");
      return;
    }
    if (contact.trim().length < 10) {
      toast.error("O número de contato parece inválido.");
      return;
    }

    startLoading();
    try {

      const response = await iniciarChat(
        "55" + contact.trim(),
        selectedAgent.number,
        text,
        enterprise.whatsappToken,
        credentials.accessToken,
      );
      
      console.log(response)
      if (response === 200) {
        toast.success("Chat iniciado com sucesso!");
        reload();
        onClose();
      } else {
        toast.error("Falha ao iniciar o chat.");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.modalTitle}>Iniciar Nova Conversa</h2>
          <button onClick={onClose} style={style.closeButton}><FiX size={20} /></button>
        </div>
        <form onSubmit={handleSendMessage} style={style.form}>
          <div style={style.inputGroup}>
            <label style={style.label}>Número do Contato</label>
            <div style={style.inputWrapper}>
              <FiPhone style={style.inputIcon}/>
              <input
                onChange={handleChange}
                value={displayValue}
                placeholder="(11) 98765-4321"
                maxLength={15}
                style={style.input}
                required
              />
            </div>
          </div>
          
          
          <div style={style.inputGroup}>
            <label style={style.label}>
                <span style={style.templateText}>"Digite a mensagem desejada abaixo</span>
                <span style={style.templateText}>"</span>
            </label>
             <div style={style.inputWrapper}>
              <FiMessageSquare style={{...style.inputIcon, top: "20px", alignSelf: 'flex-start'}}/>
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="para falar sobre..."
                style={{...style.input, ...style.textarea}}
                required
              />
            </div>
          </div>

          <button type="submit" style={style.submitButton} disabled={loading}>
            {loading ? "Enviando..." : "Iniciar Chat"}
          </button>
        </form>
      </div>
    </div>
  );
}