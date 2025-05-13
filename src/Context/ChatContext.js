import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { obterChats, obterMensagens } from '../Services/dbservice';
import { AuthContext } from './AuthContext';
import { LoadingContext } from './LoadingContext';
import axios from 'axios';

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [chatsDb, setChatsDb] = useState([]);
    const [loading, setLoading] = useState({
        chats: true,
        messages: false
    });
    const [error, setError] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socketStatus, setSocketStatus] = useState('disconnected');
    const { user, credentials } = useContext(AuthContext);
    const ws = useRef(null);
    const [notification, setNotification] = useState(null);
    const { startLoading, stopLoading, stopLoadingDelay } = useContext(LoadingContext);
    const [notSeenChats, setNotSeenChats] = useState(0);
    const [totalChats, setTotalChats] = useState(0);

    useEffect(() => {
        var aux = 0;

        chatsDb.forEach(c => {
            if(!c.lastMessageIsSeen) aux++;
        })

        setNotSeenChats(aux);
        setTotalChats(chatsDb.length)
    }, [chatsDb])

    const handleCloseNotification = () => {
        setNotification(null)
    }

    const handleEditChatStatus = (newStatus) => {
        setActiveChat({
            ...activeChat,
            status: newStatus
        })
    }

    const updateChatInList = useCallback((chatId, updates) => {
        setChatsDb(prevChats => prevChats.map(chat =>
            chat.id === chatId ? { ...chat, ...updates } : chat
        ));
    }, []);

    const connectWebSocket = useCallback(() => {
        if (!credentials?.accessToken) {
            setSocketStatus('disconnected');
            return;
        }

        if (ws.current?.readyState === WebSocket.OPEN) return;

        const wsUrl = `ws://localhost:5097/ws?access_token=${encodeURIComponent(credentials.accessToken)}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket conectado');
            setSocketStatus('connected');
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Mensagem recebida via WebSocket:', data);

                switch (data.type) {
                    case 'new_message':
                        // Se for mensagem do chat ativo, adiciona diretamente
                        if (activeChat?.id === data.chatId) {
                            setMessages(prev => {
                                // Verifica se a mensagem já existe pelo ID ou conteúdo + timestamp
                                const exists = prev.some(msg =>
                                    msg.id === data.message.id ||
                                    (msg.text === data.message.text && msg.dateCreated === data.message.dateCreated)
                                );
                                return exists ? prev : [...prev, data.message];
                            });
                        } else {
                            if (!data.message.isReply)
                                setNotification(data.message)
                        }

                        // Atualiza apenas o chat específico sem recarregar tudo
                        updateChatInList(data.chatId, {
                            lastMessageText: data.message.text,
                            lastMessageDate: data.message.dateCreated,
                            lastMessageIsReply: data.message.isReply
                        });
                        break;

                    case 'chat_update':
                        // Atualiza apenas o chat modificado
                        updateChatInList(data.chatId, data.updates);
                        break;

                    default:
                        console.log('Tipo de mensagem não reconhecido:', data.type);
                }
            } catch (error) {
                console.error('Erro ao processar mensagem WebSocket:', error);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket desconectado');
            setSocketStatus('disconnected');
            setTimeout(connectWebSocket, 5000);
        };

        ws.current.onerror = (error) => {
            console.error('Erro no WebSocket:', error);
            setSocketStatus('error');
        };
    }, [credentials?.accessToken, activeChat?.id, updateChatInList]);


    const disconnectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
            setSocketStatus('disconnected');
        }
    }, []);

    const fetchChats = async () => {
        try {
            setLoading(true);
            startLoading();
            if (credentials?.accessToken) {
                const data = await obterChats(credentials.accessToken);
                setChatsDb(prevChats => {
                    if (JSON.stringify(prevChats) !== JSON.stringify(data)) {
                        return data;
                    }
                    return prevChats;
                });
                setError(null);
            }
        } catch (error) {
            console.error("Erro ao obter chats:", error);
            setError("Falha ao carregar chats");
        } finally {
            setLoading(false);
            stopLoadingDelay();
        }
    };

    const fetchMessages = async (id) => {
        try {
            startLoading();
            if (credentials?.accessToken) {
                const data = await obterMensagens(id, credentials.accessToken);
                stopLoadingDelay()
                return data;
            }
            stopLoadingDelay()
            return [];
        } catch (error) {
            console.error("Erro ao obter mensagens:", error);
            stopLoadingDelay()
            console.log(error);
        }
    };

    const handleSelectChat = async (chat) => {
        if (!chat) {
            setActiveChat(null);
            setMessages([]);
            return;
        }

        setActiveChat(chat);

        var resHiHi = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}chat/seen?id=${chat.id}`);

        var chatsAux = chatsDb;

        var auxQttNotSeen = notSeenChats -1;
        setNotSeenChats(auxQttNotSeen)

        chatsAux.forEach(ch => {
            if(ch.id === chat.id){
                chat.lastMessageIsSeen = true;
            }
        })

        setChatsDb(chatsAux);

        console.log(resHiHi)

        try {
            const chatMessages = await fetchMessages(chat.id);
            setMessages(Array.isArray(chatMessages) ? chatMessages : []);
        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
            setMessages([]);
        }
    };

    // Efeito para gerenciar conexão WebSocket quando o usuário loga/desloga
    useEffect(() => {
        if (user && credentials?.accessToken) {
            connectWebSocket();
        } else {
            disconnectWebSocket();
            setMessages([]);
            setActiveChat(null);
            setChatsDb([]);
        }

        return () => {
            disconnectWebSocket();
        };
    }, [user, credentials?.accessToken, connectWebSocket, disconnectWebSocket]);

    // Efeito para carregar chats quando o usuário loga
    useEffect(() => {
        if (user && credentials?.accessToken) {
            fetchChats();
        }
    }, [user, credentials?.accessToken]);

    return (
        <ChatContext.Provider value={{
            chatsDb,
            fetchMessages,
            notification,
            loading,
            error,
            refreshChats: fetchChats,
            setActiveChat,
            messages,
            setMessages,
            activeChat,
            handleSelectChat,
            socketStatus,
            handleCloseNotification,
            handleEditChatStatus,
            notSeenChats,
            totalChats
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;