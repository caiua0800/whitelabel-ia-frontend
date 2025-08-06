import React, { useState, useEffect, useContext, useCallback } from "react";
import style from "./ChatsStyle";
import "./effectStyle.css";
import Chat from "./Chat/Chat";
import ChatsRows from "./ChatRows/ChatRows";
import { ChatContext } from "../../Context/ChatContext";
import Header from "./Header/Header";

export default function Chats() {
    const { activeChat } = useContext(ChatContext);

    return (
        <div style={style.container}>
           <Header />
            <div style={style.body}>
                <div style={style.bodyGrid}>
                    <ChatsRows/>
                    <Chat chat={activeChat}/>
                </div>
            </div>
        </div>
    );
}