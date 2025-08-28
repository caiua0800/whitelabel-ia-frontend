import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./ChatStyle";
import Message from "../Message/Message";
import "./effect.css";
import { ChatContext } from "../../../Context/ChatContext";
import {
  editarStatusAgente,
  iniciarChat,
  searchChats,
} from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import OpcoesModal from "./OpcoesModal/OpcoesModal";
import Perfil from "./OpcoesModal/Perfil/Perfil";
import LoadingCircle from "../../Loading/LoadingCircle";
import {
  FiPaperclip,
  FiSend,
  FiUserCheck,
  FiUserX,
  FiMoreVertical,
  FiAlertTriangle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import func from "../../../Services/fotmatters";

export default function Chat() {
  const { messages, activeChat, getChats, handleEditChatStatus, selectedAgent } =
    useContext(ChatContext);
  const { credentials, enterprise } = useContext(AuthContext);
  const [messageInput, setMessageInput] = useState("");
  const chatBodyRef = useRef(null);
  const [opcoesModal, setOpcoesModal] = useState(false);
  const [seeProfile, setSeeProfile] = useState(false);
  const [loadCircle, setLoadCircle] = useState(false);
  const [isWindowClosed, setIsWindowClosed] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, activeChat]);

  useEffect(() => {
    if (activeChat && messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const lastMessageDate = new Date(lastMessage.dateCreated);
      const now = new Date();

      const diffInMs = now.getTime() - lastMessageDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      setIsWindowClosed(diffInHours > 24);
    } else {
      setIsWindowClosed(false);
    }
  }, [messages, activeChat]);

  const fetchChats = async (page = 1) => {
    try {
      await searchChats(
        "", 1, 5,
        selectedAgent ? selectedAgent.number : null,
        credentials.accessToken, "asx", null, null, null, true
      );

      await getChats(
        "", 1, 5,
        selectedAgent ? selectedAgent.number : null,
        credentials.accessToken, "asx", null, null, null, true
      );
    } catch (error) {
      console.error("Erro ao buscar chats:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || isWindowClosed) return;

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
      await fetchChats(1);
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
        <h2 style={style.noChatTitle}>Selecione uma conversa</h2>
        <p style={style.noChatSubtitle}>
          Escolha um dos seus contatos para começar a conversar.
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={style.chatContainer}>
        <div style={style.chatHeader}>
          <div style={style.clientInfo} onClick={() => setSeeProfile(true)}>
            <div style={style.clientPictureBox}>
              <img
                style={style.clientPicture}
                src="./icons/user-icon2.png"
                alt="Avatar"
              />
            </div>
            <div style={style.clientTextInfo}>
              <span style={style.clientName}>
                {activeChat.clientName || func.formatarContato(func.getChatId(activeChat.id))}
              </span>
              <span style={style.clientNumber}>{func.formatarContato(func.getChatId(activeChat.id))}</span>
            </div>
          </div>
          <div style={style.chatOptionMenu}>
            <button
              onClick={handleToggleAgentStatus}
              style={style.headerButton}
              title={
                activeChat.status === 1 ? "Agente Ativado" : "Agente Bloqueado"
              }
            >
              {activeChat.status === 1 ? (
                <FiUserCheck size={20} />
              ) : (
                <FiUserX size={20} />
              )}
            </button>
            <button
              onClick={() => setOpcoesModal(true)}
              style={style.headerButton}
              title="Mais Opções"
            >
              <FiMoreVertical size={20} />
            </button>
          </div>
        </div>

        <div style={style.chatBody} ref={chatBodyRef}>
          {messages && messages.length > 0 ? (
            messages.map((message, key) => (
              <Message message={message} key={key} />
            ))
          ) : (
            <div style={style.noMessageInfo}>Inicie uma conversa!</div>
          )}
        </div>

        <LoadingCircle loading={loadCircle} />

        {isWindowClosed ? (
          <div style={style.warningBox}>
            <FiAlertTriangle size={20} />
            <span>
              A janela de 24h fechou. Só é possível enviar por disparos.
              <button style={style.learnMoreLink} onClick={() => setIsHelpModalOpen(true)}>
                Saiba mais
              </button>
            </span>
          </div>
        ) : (
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
        )}
      </div>

      {opcoesModal && <OpcoesModal onClose={() => setOpcoesModal(false)} />}
      {seeProfile && <Perfil onClose={() => setSeeProfile(false)} />}
      
      {isHelpModalOpen && (
        <div style={style.modalOverlay} onClick={() => setIsHelpModalOpen(false)}>
            <div style={style.modalContent} onClick={(e) => e.stopPropagation()}>
                <h3 style={style.modalHeader}>Janela de Conversa do WhatsApp</h3>
                <div style={style.modalBody}>
                    <p style={{marginBottom: '15px'}}>
                        Esta janela está fechada porque se passaram <strong>mais de 24 horas desde a última mensagem com o cliente</strong>, seguindo as regras do WhatsApp.
                    </p>
                    <p>
                        A janela para conversar <strong>manualmente</strong> com o cliente só abrirá novamente se:
                    </p>
                    <ul style={style.modalList}>
                        <li style={style.modalListItem}>O cliente <strong>enviar uma nova mensagem</strong> por conta própria.</li>
                        <li style={style.modalListItem}>O cliente <strong>responder a um Disparo de Modelo</strong> (template) que você enviou.</li>
                    </ul>
                    <p>
                        Qualquer uma dessas ações reinicia a contagem de 24 horas, liberando o chat para conversa.
                    </p>
                </div>
                <div style={style.modalFooter}>
                    <button style={style.modalCloseButton} onClick={() => setIsHelpModalOpen(false)}>
                        OK, entendi
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
}