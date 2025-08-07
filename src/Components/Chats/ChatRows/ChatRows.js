import React, { useState, useEffect, useContext, useCallback } from "react";
import style from "./ChatRowsStyle";
import ChatBox from "../ChatBox/ChatBox";
import "./effect.css";
import StartChat from "../Chat/StartChat/StartChat";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { searchChats } from "../../../Services/dbservice";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import Pagination from "./Pagination";
import { LoadingContext } from "../../../Context/LoadingContext";

const ChatsRows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startChat, setStartChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const { credentials } = useContext(AuthContext);
  const { getChats, chats, avaliableAgents, selectedAgent, setSelectedAgent, totalChats } =
    useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [loadingChats, setLoadingChats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchChats = async (page = 1) => {
    try {
      startLoading();
      setLoading(true);
      setLoadingChats(true);
      const countResponse = await searchChats(
        searchTerm,
        page,
        itemsPerPage,
        selectedAgent ? (selectedAgent ? selectedAgent.number : null) : null,
        credentials.accessToken,
        sortOrder,
        null,
        null,
        null,
        true
      );

      await getChats(
        searchTerm,
        page,
        itemsPerPage,
        selectedAgent ? (selectedAgent ? selectedAgent.number : null) : null,
        credentials.accessToken,
        sortOrder,
        null,
        null,
        null,
        true
      );

      setCurrentPage(page);
      setTotalPages(Math.ceil(countResponse.totalCount / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar chats:", error);
      setLoading(false);
    } finally {
      stopLoading();
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    fetchChats(1);
  }, [selectedAgent, searchTerm, sortOrder]);

  const handleFilterClick = () => {
    startLoading();
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    stopLoading();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchChats(1);
    }
  };

  const handleSearch2 = () => {
    fetchChats(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchChats(page);
    }
  };

  if (loading && (!chats || chats.length === 0)) {
    return <div style={style.loadingContainer}>Carregando conversas...</div>;
  }

  return (
    <>
      <div style={style.chatsContainer}>
        <div style={style.chatsHeader}>
          <div style={style.headerTitleWrapper}>
            <span style={{color: "white", ...style.chatsHeaderTitle}}>Conversas</span>
            <span style={style.chatsHeaderSubtitle}>
              {totalChats || 0} no total
            </span>
          </div>
          <div style={style.headerActions}>
            <button
              onClick={handleFilterClick}
              style={style.iconButton}
              title={
                sortOrder === "desc"
                  ? "Mais recentes primeiro"
                  : "Mais antigas primeiro"
              }
            >
              <FiFilter />
            </button>
            <button
              onClick={() => setStartChat(true)}
              style={style.iconButton}
              title="Nova Conversa"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        <div style={style.panel}>
          <div style={style.searchWrapper}>
            <FiSearch style={style.searchIcon} />
            <input
              style={style.searchInput}
              placeholder="Pesquisar por nome ou número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            onChange={(e) => {
              const agent = avaliableAgents.find(
                (a) => a.id.toString() === e.target.value
              );
              setSelectedAgent(agent || null);
            }}
            value={selectedAgent?.id || ""}
            style={style.agentSelect}
          >
            <option value="">Todos os Agentes</option>
            {avaliableAgents &&
              avaliableAgents.map((i) => (
                <option value={i.id} key={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>

        <div style={style.chatsBody}>
          {loadingChats ? (
            <div style={style.messageCenter}>Carregando...</div>
          ) : chats && chats.length > 0 ? (
            chats.map((chat) => <ChatBox key={chat.id} chat={chat} />)
          ) : (
            <div style={style.messageCenter}>Nenhuma conversa encontrada.</div>
          )}
        </div>
          
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            style={style}
          />
        )}
      </div>
      {startChat && (
        <StartChat
          reload={() => fetchChats(currentPage)}
          onClose={() => setStartChat(false)}
        />
      )}
    </>
  );
};

export default ChatsRows;
