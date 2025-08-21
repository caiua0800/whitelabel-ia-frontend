import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import {
  getAgents,
  obterChat,
  obterChats,
  obterMensagens,
  searchChats,
} from "../Services/dbservice";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import axios from "axios";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [chatsDb, setChatsDb] = useState([]);
  const [loading, setLoading] = useState({
    chats: true,
    messages: false,
  });
  const [error, setError] = useState(null);
  const [chats, setChats] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const { user, credentials } = useContext(AuthContext);
  const ws = useRef(null);
  const [notification, setNotification] = useState(null);
  const { startLoading, stopLoading, stopLoadingDelay } =
    useContext(LoadingContext);
  const [notSeenChats, setNotSeenChats] = useState(0);
  const [totalChats, setTotalChats] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [avaliableAgents, setAvaliableAgents] = useState(null);
  const [tags, setTags] = useState(0);

  const obterAgents = async () => {
    try {
      const response = await getAgents(credentials && credentials.accessToken);

      if (response.status === 200) {
        setAvaliableAgents(response.data);
        if (
          (!selectedAgent || !selectedAgent.id) &&
          response.data &&
          response.data.length > 0
        ) {
          setSelectedAgent(response.data[0]);
        }
      } else {
        console.log("Houve um erro ao consultar os agentes");
        console.log(response);
      }
    } catch (error) {
      console.log("Houve um erro ao consultar os agentes");
      console.log(error);
    }
  };

  useEffect(() => {
    if (credentials && credentials.accessToken) obterAgents();
  }, [credentials]);

  const getChats = async (
    searchTerm,
    pageNumber,
    pageSize,
    agentNumber,
    token,
    order = "desc",
    startDate = null,
    endDate = null,
    tags = null,
    withMessage
  ) => {
    try {
      const response = await searchChats(
        searchTerm,
        pageNumber,
        pageSize,
        agentNumber,
        token,
        order,
        startDate,
        endDate,
        tags,
        withMessage
      );

      var chatsData = [];
      if (Array.isArray(response)) {
        chatsData = response;
      } else if (response && Array.isArray(response.data)) {
        chatsData = response.data;
      } else if (response && response.items) {
        chatsData = response.items;
      }
      
      setTotalChats(response.totalCount);
      setChats(chatsData);

      return { data: chatsData, totalCount: response.totalCount };
    } catch (error) {
      console.log("Erro ao obter chats", error);
      setChats([]);
      setTotalChats(0);
      return { data: [], totalCount: 0 };
    }
  };

  useEffect(() => {
    var aux = 0;
    chatsDb.forEach((c) => {
      if (!c.lastMessageIsSeen) aux++;
    });
    setNotSeenChats(aux);
    setTotalChats(chatsDb.length);
  }, [chatsDb]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleEditChatStatus = (newStatus) => {
    setActiveChat({
      ...activeChat,
      status: newStatus,
    });
  };

  const updateChatInList = useCallback((chatId, updates) => {
    setChatsDb((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, ...updates } : chat
      )
    );
    setChats((prevChats) =>
      prevChats
        ? prevChats.map((chat) =>
            chat.id === chatId ? { ...chat, ...updates } : chat
          )
        : null
    );
  }, []);

  const handleNewMessage = useCallback(
    (data) => {
      if (activeChat?.id === data.chatId) {
        setMessages((prev) =>
          prev.some((msg) => msg.id === data.message.id)
            ? prev
            : [...prev, data.message]
        );
      }

      updateChatInList(data.chatId, {
        lastMessageText: data.message.text,
        lastMessageDate: data.message.dateCreated,
        lastMessageIsReply: data.message.isReply,
        lastMessageIsSeen: data.chatId === activeChat?.id,
      });

      if (data.chatId !== activeChat?.id && !data.message.isReply) {
        setNotification(data.message);
      }
    },
    [activeChat?.id, updateChatInList]
  );

  const connectWebSocket = useCallback(() => {
    if (!credentials?.accessToken || !selectedAgent?.number) {
      return;
    }

    if (ws.current) {
      ws.current.close(1000, "Changing agent or logging out");
    }

    const rawToken = credentials.accessToken.replace("Bearer ", "").trim();
    const agentNum = selectedAgent.number;
    const wsUrl = new URL(
      process.env.REACT_APP_WS_URL || "wss://servidordotnet.demelloagent.app/ws"
    );
    wsUrl.searchParams.append("access_token", rawToken);
    wsUrl.searchParams.append("agent_number", agentNum);

    ws.current = new WebSocket(wsUrl.toString());
    ws.current.reconnectAttempts = 0;

    ws.current.onopen = () => {
      setSocketStatus("connected");
      ws.current.reconnectAttempts = 0;
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "new_message") {
          handleNewMessage(data);
        } else if (data.type === "chat_update") {
          updateChatInList(data.chatId, data.updates);
        }
      } catch (error) {
        console.error("WebSocket: Erro ao processar mensagem", error, event.data);
      }
    };

    ws.current.onclose = (event) => {
      setSocketStatus("disconnected");
      if (event.code !== 1000 && ws.current) {
        const delay = Math.min(5000 * (ws.current.reconnectAttempts + 1), 30000);
        setTimeout(() => {
          if (ws.current) {
            ws.current.reconnectAttempts = (ws.current.reconnectAttempts || 0) + 1;
            connectWebSocket();
          }
        }, delay);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket: Erro na conexão", error);
      setSocketStatus("error");
      ws.current?.close();
    };
  }, [
    credentials?.accessToken,
    selectedAgent?.number,
    handleNewMessage,
    updateChatInList,
  ]);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.onclose = null;
      ws.current.onerror = null;
      ws.current.close(1000, "User logout or component unmount");
      ws.current = null;
      setSocketStatus("disconnected");
    }
  }, []);

  const fetchChats = async () => {
    if (!credentials?.accessToken || !selectedAgent?.number) return;
    try {
      setLoading((prev) => ({ ...prev, chats: true }));
      const data = await obterChats(
        selectedAgent.number,
        credentials.accessToken
      );
      setChatsDb(data || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao obter chats:", error);
      setError("Falha ao carregar chats");
      setChatsDb([]);
    } finally {
      setLoading((prev) => ({ ...prev, chats: false }));
    }
  };

  const handleSetActiveChatByNotification = (chatId) => {
    const chat = chatsDb.find((c) => c.id === chatId);
    if (chat) {
      handleSelectChat(chat);
    }
  };

  const fetchNewChat = async (id) => {
    if (!credentials?.accessToken) return;
    try {
      startLoading();
      const data = await obterChat(credentials.accessToken, id);
      setChatsDb((prev) => [...prev, data]);
      handleSelectChat(data);
      setError(null);
    } catch (error) {
      console.log(error)
      setError("Falha ao carregar chat");
    } finally {
      stopLoadingDelay();
    }
  };

  const fetchMessages = async (id, agentNumber) => {
    if (!credentials?.accessToken) return [];
    try {
      const data = await obterMensagens(
        id,
        agentNumber,
        credentials.accessToken
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao obter mensagens:", error);
      return [];
    }
  };

  const handleSelectChat = useCallback(
    async (chat) => {
      if (!chat || activeChat?.id === chat.id) {
        return;
      }
      startLoading();
      setActiveChat(chat);
      setMessages([]);
      setLoading((prev) => ({ ...prev, messages: true }));

      if (!chat.lastMessageIsSeen) {
        setChatsDb((prevChats) =>
          prevChats.map((c) =>
            c.id === chat.id ? { ...c, lastMessageIsSeen: true } : c
          )
        );
        setChats((prevChats) =>
          prevChats
            ? prevChats.map((c) =>
                c.id === chat.id ? { ...c, lastMessageIsSeen: true } : c
              )
            : null
        );
      }
      startLoading();
      try {
        // axios.put(
        //   `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/seen?id=${chat.id}&agentNumber=${selectedAgent.number}`
        // );

        const agentNumber = selectedAgent?.number || "";
        const chatMessages = await fetchMessages(chat.id, agentNumber);
        setActiveChat((currentActiveChat) => {
          if (currentActiveChat?.id === chat.id) {
            setMessages(chatMessages);
            return currentActiveChat;
          }
          return currentActiveChat;
        });
      } catch (error) {
        console.log(error)
        setMessages([]);
      } finally {
        setActiveChat((currentActiveChat) => {
          if (currentActiveChat?.id === chat.id) {
            setLoading((prev) => ({ ...prev, messages: false }));
          }
          return currentActiveChat;
        });
        stopLoading();
      }
    },
    [activeChat?.id, credentials?.accessToken, selectedAgent?.number]
  );

  useEffect(() => {
    if (user && credentials?.accessToken && selectedAgent?.number) {
      connectWebSocket();
    } else {
      disconnectWebSocket();
    }
    return () => {
      disconnectWebSocket();
    };
  }, [
    user,
    credentials?.accessToken,
    selectedAgent?.number,
    connectWebSocket,
    disconnectWebSocket,
  ]);

  useEffect(() => {
    if (user && credentials?.accessToken && selectedAgent?.number) {
      setActiveChat(null);
      setMessages([]);
      fetchChats();
    }
  }, [user, credentials, selectedAgent]);

  const handleUpdateActiveTagsChat = useCallback(
    (newTags) => {
      setActiveChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          tags: newTags,
        };
      });

      setChatsDb((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat?.id ? { ...chat, tags: newTags } : chat
        )
      );
    },
    [activeChat?.id]
  );

  return (
    <ChatContext.Provider
      value={{
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
        fetchNewChat,
        totalChats,
        getChats,
        chats,
        handleSetActiveChatByNotification,
        handleUpdateActiveTagsChat,
        avaliableAgents,
        selectedAgent,
        setSelectedAgent,
        disconnectWebSocket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;