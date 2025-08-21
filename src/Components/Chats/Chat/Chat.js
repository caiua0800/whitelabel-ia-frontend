import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./ChatStyle";
import Message from "../Message/Message";
import "./effect.css";
import { ChatContext } from "../../../Context/ChatContext";
import { sendWhatsapp, editarStatusAgente, iniciarChat } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import OpcoesModal from "./OpcoesModal/OpcoesModal";
import Perfil from "./OpcoesModal/Perfil/Perfil";
import LoadingCircle from "../../Loading/LoadingCircle";
import { FiPaperclip, FiSend, FiUserCheck, FiUserX, FiMoreVertical } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function Chat() {
  const { messages, activeChat, handleEditChatStatus, selectedAgent } = useContext(ChatContext);
  const { credentials, enterprise } = useContext(AuthContext);
  const [messageInput, setMessageInput] = useState("");
  const chatBodyRef = useRef(null);
  const [opcoesModal, setOpcoesModal] = useState(false);
  const [seeProfile, setSeeProfile] = useState(false);
  const [loadCircle, setLoadCircle] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, activeChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const textToSend = messageInput;
    setMessageInput("");
    setLoadCircle(true);

    try {
      await iniciarChat(
        activeChat.id,
        selectedAgent.number,
        textToSend,
        enterprise.whatsappToken,
        credentials.accessToken
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Falha ao enviar mensagem.");
    } finally {
      setLoadCircle(false);
    }
  };

  const handleToggleAgentStatus = async () => {
    if (!activeChat) return;
    const newStatus = activeChat.status === 1 ? 2 : 1;

    setLoadCircle(true);
    try {
      const res = await editarStatusAgente(
        activeChat.id,
        newStatus,
        credentials.accessToken
      );

      if (res.status === 200) {
        handleEditChatStatus(newStatus);
        toast.success(newStatus === 1 ? "Agente Ativado" : "Agente Bloqueado");
      }
    } catch (error) {
      console.error("Erro ao editar status do agente:", error);
      toast.error("Erro ao alterar status do agente.");
    } finally {
      setLoadCircle(false);
    }
  };

  if (!activeChat) {
    return (
      <div style={style.noChatContainer}>
        {/* <img src="/images/empty-chat.svg" alt="Selecione um chat" style={style.noChatImage} /> */}
        <h2 style={style.noChatTitle}>Selecione uma conversa</h2>
        <p style={style.noChatSubtitle}>Escolha um dos seus contatos para começar a conversar.</p>
      </div>
    );
  }

  return (
    <>
      <div style={style.chatContainer}>
        <div style={style.chatHeader}>
          <div style={style.clientInfo} onClick={() => setSeeProfile(true)}>
            <div style={style.clientPictureBox}>
              <img style={style.clientPicture} src="./icons/user-icon2.png" alt="Avatar"/>
            </div>
            <div style={style.clientTextInfo}>
                <span style={style.clientName}>{activeChat.clientName || activeChat.id}</span>
                <span style={style.clientNumber}>{activeChat.id}</span>
            </div>
          </div>
          <div style={style.chatOptionMenu}>
            <button onClick={handleToggleAgentStatus} style={style.headerButton} title={activeChat.status === 1 ? "Agente Ativado" : "Agente Bloqueado"}>
              {activeChat.status === 1 ? <FiUserCheck size={20} /> : <FiUserX size={20} />}
            </button>
            <button onClick={() => setOpcoesModal(true)} style={style.headerButton} title="Mais Opções">
              <FiMoreVertical size={20} />
            </button>
          </div>
        </div>

        <div style={style.chatBody} ref={chatBodyRef}>
          {messages && messages.length > 0 ? (
             messages.map((message, key) => <Message message={message} key={key} />)
          ) : (
            <div style={style.noMessageInfo}>Inicie uma conversa!</div>
          )}
        </div>
        
        <LoadingCircle loading={loadCircle} />
        
        <form style={style.sendMessagesBox} onSubmit={handleSendMessage}>
          <button type="button" style={style.iconButton} title="Anexar (em breve)">
            <FiPaperclip size={22} />
          </button>
          <div style={style.messageInputBox}>
            <input
              placeholder="Digite sua mensagem..."
              style={style.messageInput}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <button type="submit" style={style.iconButton} title="Enviar Mensagem">
            <FiSend size={22} />
          </button>
        </form>
      </div>

      {opcoesModal && <OpcoesModal onClose={() => setOpcoesModal(false)} />}
      {seeProfile && <Perfil onClose={() => setSeeProfile(false)} />}
    </>
  );
}