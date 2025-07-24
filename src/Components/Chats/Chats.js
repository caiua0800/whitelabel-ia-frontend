import React, { useState, useEffect, useContext, useCallback } from "react";
import style from "./ChatsStyle";
import "./effectStyle.css";
import Chat from "./Chat/Chat";
import ChatsRows from "./ChatRows/ChatRows";
import { ChatContext } from "../../Context/ChatContext";
import Header from "./Header/Header";

export default function Chats() {
    const { activeChat, setActiveChat, chatsDb, fetchMessages } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const [chatStats, setChatStats] = useState({
        total: 0,
        blocked: 0,
        closed: 0,
        inProgress: 0
    });
        

    const updateStats = useCallback((chats) => {
        if (chats && chats.length > 0) {
            setChatStats({
                total: chats.length,
                blocked: chats.filter(chat => chat.status === 3).length, // Assumindo que 3 = bloqueado
                closed: chats.filter(chat => chat.status === 2).length, // Assumindo que 2 = fechado
                inProgress: chats.filter(chat => chat.status === 1).length // Assumindo que 1 = ativo
            });
        }
    }, []);

  

    const handleSelectChat = useCallback(async (chat) => {
        if (!chat) {
            setActiveChat(null);
            setMessages([]);
            return;
        }

        setActiveChat(chat);
        try {
            const chatMessages = await fetchMessages(chat.id);
            setMessages(Array.isArray(chatMessages) ? chatMessages : []);
        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
            setMessages([]);
        }
    }, [fetchMessages]);


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