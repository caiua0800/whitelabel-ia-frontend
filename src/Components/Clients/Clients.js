import React, { useState, useEffect, useContext } from "react";
import style from "./ClientsStyle";
import func from "../../Services/fotmatters";
import { AuthContext } from "../../Context/AuthContext";
import { searchChats } from "../../Services/dbservice";
import TagsModal from "./Tag/TagsModal";
import { ChatContext } from "../../Context/ChatContext";
import AddClient from "./AddClient/AddClient";
import EditarContato from "./EditarContato/EditarContato";
import InsertClients from "./InsertClients/InsertClients";
import { LoadingContext } from "../../Context/LoadingContext";
import {
  FiPlus,
  FiUpload,
  FiDownload,
  FiSearch,
  FiSliders,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const tableBorder = "2px solid rgba(80, 80, 80, 1)";
const tableBorder2 = "2px solid rgba(80, 80, 80, 0)";
const ITEMS_PER_PAGE = 5;

export default function Clients() {
  const { credentials } = useContext(AuthContext);
  const { chats, getChats, avaliableAgents } = useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showInsertClientsModal, setShowInsertClientsModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(null);
  const [chosenAgent, setChosenAgent] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    if (avaliableAgents) {
      if (avaliableAgents[0]) {
        setChosenAgent(avaliableAgents[0]);
      }
    }
  }, [avaliableAgents]);

  const handleSelectTags = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    const fetchInitialChats = async () => {
      await handleSearch("", 1);
    };
    fetchInitialChats();
  }, []);

  const getCurrentPageClients = () => {
    if (!chats || !Array.isArray(chats)) {
      return [];
    }
    return chats;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleSearch(searchTerm, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      handleSearch(searchTerm, prevPage);
    }
  };

  const handleSearch = async (term = searchTerm, page = 1) => {
    try {
      startLoading();
      setIsSearching(true);
      const normalizedTerm = term
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const formattedStartDate = startDate
        ? new Date(startDate).toISOString()
        : null;
      const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;
      const tagIds = selectedTags.map((tag) => tag.id).join(",");

      const countResponse = await searchChats(
        term,
        1,
        1,
        "752931221232617",
        credentials.accessToken,
        order,
        formattedStartDate,
        formattedEndDate,
        tagIds,
        false
      );

      await getChats(
        term,
        page,
        ITEMS_PER_PAGE,
        "752931221232617",
        credentials.accessToken,
        order,
        formattedStartDate,
        formattedEndDate,
        tagIds,
        false
      );

      setSearchResults({ items: chats, totalCount: countResponse.totalCount });
      setTotalPages(Math.ceil(countResponse.totalCount / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }else{
      handleSearch();
    }
  };

  const handleCloseEditModal = async () => {
    setShowEditClientModal(null);
    await handleSearch();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setOrder("desc");
    setSelectedTags([]);
    handleSearch("", 1);
  };

  const handleExportExcel = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_ROUTE}chat/export/excel/advanced`,
        {
          method: "GET",
          headers: {
            Authorization: `${credentials.accessToken}`,
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tabela-clientes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar Excel:", error);
    }
  };

  const handleExportPdf = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_ROUTE}chat/export/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `${credentials.accessToken}`,
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "tabela-clientes.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
    }
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
          <h1 style={style.title}>Gerenciamento de Clientes</h1>
          <div style={style.headerActions}>
            <button
              onClick={() => setShowInsertClientsModal(true)}
              style={style.actionButton}
            >
              <FiUpload style={{ marginRight: "8px" }} /> Importar
            </button>
            <button
              onClick={() => setShowAddClientModal(true)}
              style={style.actionButtonPrimary}
            >
              <FiPlus style={{ marginRight: "8px" }} /> Adicionar Cliente
            </button>
          </div>
        </div>

        <div style={style.panel}>
          <div style={style.searchWrapper}>
            <FiSearch style={style.searchIcon} />
            <input
              placeholder="Nome ou contato"
              style={style.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div style={style.filterGroup}>
            <select
              style={style.selectInput}
              value={chosenAgent?.number || ""}
              onChange={(e) => {
                const selected = avaliableAgents.find(
                  (a) => a.number === e.target.value
                );
                setChosenAgent(selected);
              }}
            >
              {avaliableAgents &&
                avaliableAgents.map((agent) => (
                  <option key={agent.id} value={agent.number}>
                    {agent.name}
                  </option>
                ))}
            </select>
            <button
              onClick={() => setShowTagsModal(true)}
              style={style.tagButton}
            >
              <FiSliders style={{ marginRight: "8px" }} /> Tags (
              {selectedTags.length})
            </button>
            <button onClick={handleClearFilters} style={style.clearButton}>
              <FiTrash2 style={{ marginRight: "8px" }} /> Limpar
            </button>
            <button
              style={style.searchButton}
              onClick={handleKeyPress}
              disabled={isSearching}
            >
              {isSearching ? "Buscando..." : "Pesquisar"}
            </button>
          </div>
        </div>

        <div style={style.tableContainer}>
          <div style={style.tableHeader}>
            <span style={style.tableHeaderCell}>Nome</span>
            <span style={style.tableHeaderCell}>Contato</span>
            <span style={style.tableHeaderCell}>Data</span>
            <span style={style.tableHeaderCell}>Cidade</span>
            <span style={style.tableHeaderCell}>Estado</span>
            <span style={style.tableHeaderCell}>Status</span>
          </div>

          <div style={style.tableBody}>
            {isSearching && (!chats || chats.length === 0) ? (
              <div style={style.messageCenter}>Buscando...</div>
            ) : chats && chats.length > 0 ? (
              chats.map((client) => (
                <div
                  onClick={() => setShowEditClientModal(client)}
                  key={client.id}
                  style={style.tableRow}
                  className="table-row-hover"
                >
                  <span style={style.tableCell}>
                    {client.clientName || "Não informado"}
                  </span>
                  <span style={style.tableCell}>
                    {func.formatarContato(client.id) || "Não informado"}
                  </span>
                  <span style={style.tableCell}>
                    {func.formatarData(client.dateCreated) || "Não informado"}
                  </span>
                  <span style={style.tableCell}>
                    {client.city || "Não informado"}
                  </span>
                  <span style={style.tableCell}>
                    {client.state || "Não informado"}
                  </span>
                  <span style={style.tableCell}>
                    {client.status === 1 ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))
            ) : (
              <div style={style.messageCenter}>Nenhum cliente encontrado.</div>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div style={style.paginationContainer}>
            <button
              style={{
                ...style.paginationButton,
                ...(currentPage === 1 ? style.disabledButton : {}),
              }}
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isSearching}
            >
              <FiChevronLeft /> Anterior
            </button>
            <span style={style.paginationView}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              style={{
                ...style.paginationButton,
                ...(currentPage === totalPages ? style.disabledButton : {}),
              }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isSearching}
            >
              Próxima <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {showTagsModal && (
        <TagsModal
          currentTagsAdded={selectedTags}
          onClose={() => setShowTagsModal(false)}
          handleSelect={handleSelectTags}
        />
      )}
      {showAddClientModal && (
        <AddClient onClose={() => setShowAddClientModal(false)} />
      )}
      {showInsertClientsModal && (
        <InsertClients onClose={() => setShowInsertClientsModal(false)} />
      )}
      {showEditClientModal && (
        <EditarContato
          onClose={handleCloseEditModal}
          chat={showEditClientModal}
        />
      )}
    </>
  );
}
