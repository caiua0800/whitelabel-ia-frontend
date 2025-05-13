import React, { useContext, useEffect, useState } from "react";
import style from "./ChatBoxStyle";
import "./effect.css"
import formatHelpers from "../../helpers/formatHelpers";
import { ChatContext } from "../../../Context/ChatContext";

const ChatBox = ({ chat }) => {
    const { handleSelectChat } = useContext(ChatContext);

    const handleSelect = () => {
        handleSelectChat(chat);
    };

    if (!chat) return null;

    return (
        <div onClick={handleSelect} className="chat-box" style={{...style.chatContainer, background: chat.lastMessageIsSeen ? "rgba(240, 240, 250, 1)" : "rgba(100, 240, 29, 0.4)"}}>
            <div style={style.chatContent}>
                <div style={style.profilePhotoBox}>
                    <img style={style.profilePhoto} src="./images/usuario.webp" />
                </div>
                <div style={style.info}>
                    <span style={style.clientName}>{chat.client_name || chat.id || "Indefinido"}</span>
                    <div style={style.clientLastMessage}>
                        <span style={style.staticInput}>Msg: </span>
                        <span style={style.message}>{chat.lastMessageText || "sem mensagens"}</span>
                    </div>
                </div>
            </div>
            <span style={style.hour}>{formatHelpers.formatarData(chat.lastMessageDate)}</span>
        </div>
    );
};


export default ChatBox;
