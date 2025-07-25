import React, { useState, useEffect, useContext } from "react";
import style from "./ChatRowsStyle";
import ChatBox from "../ChatBox/ChatBox";
import "./effect.css";
import StartChat from "../Chat/StartChat/StartChat";
import { AuthContext } from "../../../Context/AuthContext";
import { ChatContext } from "../../../Context/ChatContext";
import { LoadingContext } from "../../../Context/LoadingContext";
import { searchChats } from "../../../Services/dbservice";

const ChatsRows = ({ selectChat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startChat, setStartChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const { credentials } = useContext(AuthContext);
  const { getChats, chats, avaliableAgents, selectedAgent, setSelectedAgent } =
    useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);


  const fetchChats = async (page = 1) => {
    try {
      startLoading();
      setLoading(true);

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
        <div style={style.chatsContent}>
          <div style={style.chatsHeader}>
            <div
              className="filter-icon icon"
              style={style.filterIconBox}
              onClick={handleFilterClick}
            >
              <img
                style={{
                  ...style.filterIcon,
                  transform: sortOrder === "asc" ? "scaleY(-1)" : "scaleY(1)",
                  transition: "transform 0.3s ease",
                }}
                src="./icons/filter-icon.svg"
              />
            </div>
            <span style={style.chatsHeaderTitle}>CONVERSAS</span>
            <div
              className="filter-icon icon"
              style={style.filterIconBox2}
              onClick={() => setStartChat(true)}
            >
              <img
                style={{
                  ...style.filterIcon,
                  transition: "transform 0.3s ease",
                }}
                src="./icons/add-icon.svg"
              />
            </div>
          </div>
          <div style={style.alternateAgentBox}>
            <select
              onChange={(e) => {
                setSelectedAgent(
                  avaliableAgents.find((a) => a.id + "" === e.target.value + "")
                );
              }}
              value={selectedAgent?.id || ""}
              style={style.alternateAgentBoxSelect}
            >
              {avaliableAgents &&
                avaliableAgents.map((i, key) => (
                  <option value={i.id} key={key}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <div style={style.chatsBody}>
            <div style={style.chatsInputBoxFilter}>
              <input
                style={style.searchFilter}
                placeholder="Pesquise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
              />
              <button style={style.searchFilterButton} onClick={handleSearch2}>
                Buscar
              </button>
            </div>
            <div style={style.chatsRows}>
              {chats && chats.length > 0 ? (
                chats.map((chat) => (
                  <ChatBox
                    key={chat.id}
                    chat={chat}
                    onClick={() => selectChat(chat)}
                  />
                ))
              ) : (
                <div style={style.noChatsMessage}>
                  {loading
                    ? "Carregando..."
                    : searchTerm
                    ? "Nenhuma conversa encontrada"
                    : "Nenhuma conversa disponível"}
                </div>
              )}
            </div>
          </div>
          {totalPages > 1 && (
            <div style={style.paginationContainer}>
              <button
                style={style.paginationButton}
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </button>
              <button
                style={style.paginationButton}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <div style={style.paginationView}>
                Página {currentPage} de {totalPages}
              </div>
              <button
                style={style.paginationButton}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              <button
                style={style.paginationButton}
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          )}
        </div>
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