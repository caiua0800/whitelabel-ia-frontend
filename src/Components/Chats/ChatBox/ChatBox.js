import React, { useContext } from "react";
import style from "./ChatBoxStyle";
import "./effect.css";
import formatHelpers from "../../helpers/formatHelpers";
import { ChatContext } from "../../../Context/ChatContext";

const ChatBox = ({ chat }) => {
  const { handleSelectChat, activeChat } = useContext(ChatContext);

  const isActive = activeChat && chat.id === activeChat.id;

  if (!chat || !chat.lastMessageText) return null;

  return (
    <div
      onClick={() => handleSelectChat(chat)}
      style={{ ...style.chatContainer, ...(isActive ? style.activeChat : {}) }}
      className="chat-box-hover"
    >
      <div style={style.profilePhotoBox}>
        <img style={style.profilePhoto} src="./icons/user-icon2.png" alt="Avatar"/>
      </div>
      <div style={style.info}>
        <div style={style.nameAndTime}>
          <span style={style.clientName}>{chat.clientName || chat.id}</span>
          <span style={style.hour}>{formatHelpers.formatarData(chat.lastMessageDate)}</span>
        </div>
        <div style={style.clientLastMessage}>
          <span style={style.message}>{chat.lastMessageText}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;