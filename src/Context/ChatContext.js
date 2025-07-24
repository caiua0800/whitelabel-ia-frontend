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

      setChats(chatsData);
    } catch (error) {
      console.log("Erro ao obter chats");
      console.log(error);
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
  }, []);

  const handleNewMessage = useCallback(
    (data) => {
      // Update messages if active chat matches
      if (activeChat?.id === data.chatId) {
        setMessages((prev) =>
          prev.some((msg) => msg.id === data.message.id)
            ? prev
            : [...prev, data.message]
        );
      }

      // Update chat list
      updateChatInList(data.chatId, {
        lastMessageText: data.message.text,
        lastMessageDate: data.message.dateCreated,
        lastMessageIsReply: data.message.isReply,
        lastMessageIsSeen: data.chatId === activeChat?.id,
      });

      // Show notification if not from active chat and not a reply
      if (data.chatId !== activeChat?.id && !data.message.isReply) {
        setNotification(data.message);
      }
    },
    [activeChat?.id]
  );

  const connectWebSocket = useCallback(() => {
    if (!credentials?.accessToken || !selectedAgent?.number) {
      console.log("WebSocket: Credenciais ou agente não disponíveis");
      return;
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      console.log("WebSocket: Já conectado");
      return;
    }

    // Limpa o token removendo 'Bearer ' se existir
    const rawToken = credentials.accessToken.replace("Bearer ", "").trim();
    const agentNum = selectedAgent.number;

    // Constrói a URL de forma segura
    const wsUrl = new URL(
      process.env.REACT_APP_WS_URL || "wss://servidordotnet.demelloagent.app/ws"
    );
    wsUrl.searchParams.append("access_token", rawToken);
    wsUrl.searchParams.append("agent_number", agentNum);

    console.log(`WebSocket: Conectando em ${wsUrl.toString()}`);

    ws.current = new WebSocket(wsUrl.toString());

    ws.current.onopen = () => {
      console.log("WebSocket: Conexão estabelecida");
      setSocketStatus("connected");

      // Envia mensagem de heartbeat inicial
      const heartbeat = JSON.stringify({
        type: "heartbeat",
        timestamp: new Date().toISOString(),
      });
      ws.current.send(heartbeat);
    };

    ws.current.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket: Mensagem recebida", data);

        if (data.type === "new_message") {
          handleNewMessage(data);
        } else if (data.type === "chat_update") {
          updateChatInList(data.chatId, data.updates);
        } else if (data.type === "heartbeat") {
          // Responde ao heartbeat do servidor
          ws.current.send(
            JSON.stringify({
              type: "heartbeat_response",
              timestamp: new Date().toISOString(),
            })
          );
        }
      } catch (error) {
        console.error(
          "WebSocket: Erro ao processar mensagem",
          error,
          event.data
        );
      }
    };

    ws.current.onclose = (event) => {
      if (!ws.current) return; // Adicione esta verificação

      console.log(
        `WebSocket: Desconectado (código: ${event.code}, motivo: ${
          event.reason || "não especificado"
        })`
      );
      setSocketStatus("disconnected");

      // Reconecta com backoff exponencial
      const delay = Math.min(5000 * (ws.current.reconnectAttempts || 1), 30000);
      console.log(`WebSocket: Tentando reconectar em ${delay}ms`);

      setTimeout(() => {
        if (ws.current) {
          // Adicione esta verificação
          ws.current.reconnectAttempts =
            (ws.current.reconnectAttempts || 0) + 1;
          connectWebSocket();
        }
      }, delay);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket: Erro na conexão", error);
      setSocketStatus("error");

      // Fecha a conexão para limpar qualquer estado inválido
      if (ws.current) {
        ws.current.close();
      }
    };

    // Adiciona flag de reconexão
    ws.current.reconnectAttempts = 0;
  }, [
    credentials?.accessToken,
    selectedAgent?.number,
    handleNewMessage,
    updateChatInList,
  ]);

  const disconnectWebSocket = useCallback(() => {
    if (ws.current) {
      ws.current.onopen = null;
      ws.current.onmessage = null;
      ws.current.onerror = null;
      ws.current.onclose = null;

      ws.current.close();
      ws.current = null;
      setSocketStatus("disconnected");
    }
  }, []);

  const fetchChats = async () => {
    try {
      setLoading(true);
      startLoading();
      if (credentials?.accessToken) {
        const data = await obterChats(
          selectedAgent.number,
          credentials.accessToken
        );
        setChatsDb((prevChats) => {
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

  const handleSetActiveChatByNotification = (chatId) => {
    const chat = chatsDb.find((c) => c.id === chatId);
    if (chat) {
      handleSelectChat(chat); // Reutilize a função existente que já faz todo o tratamento
    }
  };

  const fetchNewChat = async (id) => {
    try {
      setLoading(true);
      startLoading();
      if (credentials?.accessToken) {
        const data = await obterChat(credentials.accessToken, id);
        setChatsDb([...chatsDb, data]);
        setActiveChat(data);
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

  const fetchMessages = async (id, agentNumber) => {
    try {
      startLoading();
      if (credentials?.accessToken) {
        const data = await obterMensagens(
          id,
          agentNumber,
          credentials.accessToken
        );
        stopLoadingDelay();
        return data;
      }
      stopLoadingDelay();
      return [];
    } catch (error) {
      console.error("Erro ao obter mensagens:", error);
      stopLoadingDelay();
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

    var resHiHi = await axios.put(
      `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/seen?id=${chat.id}&agentNumber=${selectedAgent.number}`
    );

    var chatsAux = chatsDb;
    var auxQttNotSeen = notSeenChats;

    if (auxQttNotSeen > 0) auxQttNotSeen = notSeenChats - 1;

    setNotSeenChats(auxQttNotSeen);

    chatsAux.forEach((ch) => {
      if (ch.id === chat.id) {
        chat.lastMessageIsSeen = true;
      }
    });

    setChatsDb(chatsAux);

    try {
      const agentNumber = selectedAgent?.number || "";
      const chatMessages = await fetchMessages(chat.id, agentNumber);
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

  useEffect(() => {
    if (user && credentials?.accessToken) {
      fetchChats();
    }
  }, [user, credentials?.accessToken]);

  const handleUpdateActiveTagsChat = useCallback(
    (newTags) => {
      setActiveChat((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          tags: newTags,
        };
      });

      // Atualiza também na lista de chats
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
