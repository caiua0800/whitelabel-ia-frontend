import React, { useContext, useEffect, useState } from "react";
import style from "./ChatBoxStyle";
import "./effect.css";
import formatHelpers from "../../helpers/formatHelpers";
import { ChatContext } from "../../../Context/ChatContext";
import { LoadingContext } from "../../../Context/LoadingContext";

const ChatBox = ({ chat }) => {
  const { handleSelectChat, activeChat } = useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleSelect = () => {
    handleSelectChat(chat);
  };

  function limitarString(texto, limite = 10) {
    if (typeof texto !== "string" || texto.length <= limite) {
      return texto;
    }
    return texto.substring(0, limite - 3) + "...";
  }

  if (!chat || !chat.lastMessageText) return null;

  return (
    <>
      <div
        onClick={handleSelect}
        className={activeChat && chat.id == activeChat.id ? "" : "chat-box"}
        style={{
          ...style.chatContainer,
          background:
            activeChat && chat.id == activeChat.id
              ? "rgba(0, 180, 0, 1)"
              : "rgba(220, 220, 230, 1)",
        }}
      >
        <div style={style.chatContent}>
          <div style={style.profilePhotoBox}>
            <img style={style.profilePhoto} src="./icons/user-icon2.png" />
          </div>
          <div style={style.info}>
            <span style={style.clientName}>
              {limitarString(chat.clientName) || chat.id || "Indefinido"}
            </span>
            <div style={style.clientLastMessage}>
              <span style={style.staticInput}>Msg: </span>
              <span style={style.message}>
                {chat.lastMessageText || "sem mensagens"}
              </span>
            </div>
          </div>
        </div>
        <span style={style.hour}>
          {formatHelpers.formatarData(chat.lastMessageDate)}
        </span>
      </div>
    </>
  );
};

export default ChatBox;
