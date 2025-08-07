import React, { useContext, useEffect } from "react";
import style from "./SystemMessageStyle";
import { SystemMessageContext } from "../../Context/SystemMessageContext";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

export default function SystemMessage() {
  const { closeMessage, systemMessage } = useContext(SystemMessageContext);

  useEffect(() => {
    // Adiciona uma classe ao body para travar o scroll quando o modal estiver aberto
    if (systemMessage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Função de limpeza para garantir que o scroll seja reativado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [systemMessage]);

  if (!systemMessage) {
    return null;
  }

  const getIconAndStyle = () => {
    switch (systemMessage.type) {
      case "success":
        return { icon: <FiCheckCircle size={22} />, style: style.success };
      case "error":
        return { icon: <FiAlertCircle size={22} />, style: style.error };
      default:
        return { icon: <FiInfo size={22} />, style: style.info };
    }
  };

  const { icon, style: typeStyle } = getIconAndStyle();

  return (
    // O overlay (fundo) agora fecha a mensagem ao clicar
    <div style={style.overlay} onClick={closeMessage}>
      {/* O container da mensagem em si não fecha ao ser clicado */}
      <div style={style.messageBox} onClick={(e) => e.stopPropagation()}>
        <div style={{ ...style.messageContent, ...typeStyle }}>
          <div style={style.iconWrapper}>{icon}</div>
          <span style={style.messageText}>{systemMessage.message}</span>
          <button onClick={closeMessage} style={style.closeButton}>
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}