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

const tableBorder = "2px solid rgba(80, 80, 80, 1)";
const tableBorder2 = "2px solid rgba(80, 80, 80, 0)";
const ITEMS_PER_PAGE = 5;

export default function Clients() {
  const { credentials } = useContext(AuthContext);
  const { chats, getChats, avaliableAgents } = useContext(ChatContext);
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
        chosenAgent.number,
        credentials.accessToken,
        order,
        formattedStartDate,
        formattedEndDate,
        tagIds
      );

      await getChats(
        term,
        page,
        ITEMS_PER_PAGE,
        credentials.accessToken,
        order,
        formattedStartDate,
        formattedEndDate,
        tagIds
      );

      setSearchResults({ items: chats, totalCount: countResponse.totalCount });
      setTotalPages(Math.ceil(countResponse.totalCount / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
        <span style={style.title}>Clientes</span>
        <div style={style.headerGrid}>
          <div style={style.headerTextExplanation}>
            <div style={style.explanationTexts}>
              <span style={style.explanation}>
                Aqui você consegue ver todos os clientes que entraram em contato
                (com cadastro ou não), associar Tags a eles, exportar tabelas,
                gerênciar as contas e muito mais!
              </span>
              <span style={style.explanation}>
                Configure seus leads com suas tags para fazer disparos de
                maneira eficiente.
              </span>
            </div>
          </div>
          <div style={style.headerFirstButtonsGrid}>
            <button
              style={{ ...style.button, background: "rgba(80, 200, 0, 1)" }}
              onClick={handleExportExcel}
            >
              Extrair Tabela Excel
            </button>
            <button
              style={{ ...style.button, background: "rgba(80, 200, 200, 1)" }}
              onClick={handleExportPdf}
            >
              Extrair Tabela PDF
            </button>
          </div>
          <div style={style.headerFirstButtonsGrid}>
            <button
              style={{ ...style.button, background: "rgba(210, 210, 210, 1)" }}
              onClick={() => setShowAddClientModal(true)}
            >
              Adicionar Cliente
            </button>
            <button
              style={{ ...style.button, background: "rgba(210, 210, 210, 1)" }}
              onClick={() => setShowInsertClientsModal(true)}
            >
              Inserir Clients (Tab. Excel)
            </button>
          </div>
        </div>

        <div style={style.searchArea}>
          <div style={style.searchBarBoxContainer}>
            <span style={style.searchBarBoxContainerTitle}>
              Buscar Clientes
            </span>
            <div style={style.searchBarBox}>
              <input
                placeholder="Nome ou contato"
                style={style.searchBarInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div style={style.filters}>
            {/* <div style={style.filterBox}>
              <span style={style.filterBoxName}>Entre</span>
              <div style={style.filter}>
                <input
                  type="date"
                  style={style.filterInput}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div style={style.filterBox}>
              <span style={style.filterBoxName}>Até</span>
              <div style={style.filter}>
                <input
                  type="date"
                  style={style.filterInput}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div> */}

            <div style={style.filterBox}>
              <span style={style.filterBoxName}>Agente responsável</span>
              <select
                style={style.filterInput}
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
                    <option key={agent.number} value={agent.number}>
                      {agent.name}
                    </option>
                  ))}
              </select>
            </div>

            <div style={style.filterBox}>
              <span style={style.filterBoxName}>Ordem</span>
              <div style={style.filter}>
                <select
                  style={style.filterInput}
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="desc">Mais recentes primeiro</option>
                  <option value="asc">Mais antigos primeiro</option>
                </select>
              </div>
            </div>

            <div style={style.filterBox}>
              <span style={style.filterBoxName}>Tags</span>
              <div style={style.filter}>
                <button
                  onClick={() => setShowTagsModal(true)}
                  style={style.filterButton}
                >
                  Selecionar Tags
                </button>
              </div>
            </div>
          </div>
          <button
            style={style.searchButton}
            onClick={() => handleSearch()}
            disabled={isSearching}
          >
            {isSearching ? "Buscando..." : "Pesquisar"}
          </button>
        </div>

        <div style={style.tableContainer}>
          <span style={style.tableTitle}>Tabela de clientes</span>

          <div style={style.table}>
            <div style={{ ...style.tableHeader, borderBottom: tableBorder }}>
              <div
                style={{ ...style.tableHeaderCell, borderRight: tableBorder }}
              >
                <span style={style.tableHeaderCellName}>Nome</span>
              </div>
              <div
                style={{ ...style.tableHeaderCell, borderRight: tableBorder }}
              >
                <span style={style.tableHeaderCellName}>Contato</span>
              </div>
              <div
                style={{ ...style.tableHeaderCell, borderRight: tableBorder }}
              >
                <span style={style.tableHeaderCellName}>Data</span>
              </div>
              <div
                style={{ ...style.tableHeaderCell, borderRight: tableBorder }}
              >
                <span style={style.tableHeaderCellName}>Cidade</span>
              </div>
              <div
                style={{ ...style.tableHeaderCell, borderRight: tableBorder }}
              >
                <span style={style.tableHeaderCellName}>Estado</span>
              </div>
              <div style={style.tableHeaderCell}>
                <span style={style.tableHeaderCellName}>Status</span>
              </div>
            </div>

            <div style={style.tableBody(getCurrentPageClients())}>
              {getCurrentPageClients().length > 0 ? (
                getCurrentPageClients().map((client) => (
                  <div
                    onClick={() => setShowEditClientModal(client)}
                    key={client.id}
                    style={style.tableHeader}
                  >
                    <div
                      style={{
                        ...style.tableHeaderCell1,
                        borderRight: tableBorder2,
                      }}
                    >
                      <span>{client.clientName || "Não informado"}</span>
                    </div>
                    <div
                      style={{
                        ...style.tableHeaderCell1,
                        borderRight: tableBorder2,
                      }}
                    >
                      <span>
                        {func.formatarContato(client.id) || "Não informado"}
                      </span>
                    </div>
                    <div
                      style={{
                        ...style.tableHeaderCell1,
                        borderRight: tableBorder2,
                      }}
                    >
                      <span>
                        {func.formatarData(client.dateCreated) ||
                          "Não informado"}
                      </span>
                    </div>
                    <div
                      style={{
                        ...style.tableHeaderCell1,
                        borderRight: tableBorder2,
                      }}
                    >
                      <span>{client.city || "Não informado"}</span>
                    </div>
                    <div
                      style={{
                        ...style.tableHeaderCell1,
                        borderRight: tableBorder2,
                      }}
                    >
                      <span>{client.state || "Não informado"}</span>
                    </div>
                    <div style={{ ...style.tableHeaderCell1 }}>
                      <span>{client.status === 1 ? "Ativo" : "Inativo"}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "20px",
                    color: "#666",
                  }}
                >
                  {isSearching ? "Buscando..." : "Nenhum cliente encontrado"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Paginação */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <div style={{ flex: 1 }}></div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button
              style={{
                ...style.button,
                padding: "8px 16px",
                background:
                  currentPage === 1 ? "#ccc" : "rgba(80, 200, 200, 1)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              onClick={handlePrevPage}
              disabled={currentPage === 1 || isSearching}
            >
              Anterior
            </button>

            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              Página {currentPage} de {totalPages}
            </span>

            <button
              style={{
                ...style.button,
                padding: "8px 16px",
                background:
                  currentPage === totalPages ? "#ccc" : "rgba(80, 200, 200, 1)",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isSearching}
            >
              Próxima
            </button>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {/* <select
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              disabled={isSearching}
              onChange={(e) => {
                // Implementar mudança de itens por página se necessário
              }}
            >
              <option value="3">3 itens por página</option>
              <option value="6">6 itens por página</option>
              <option value="10">10 itens por página</option>
            </select> */}
          </div>
        </div>
      </div>

      {showTagsModal && (
        <>
          <TagsModal
            currentTagsAdded={selectedTags}
            onClose={() => setShowTagsModal(false)}
            handleSelect={handleSelectTags}
          />
        </>
      )}

      {showAddClientModal && (
        <>
          <AddClient onClose={() => setShowAddClientModal(false)} />
        </>
      )}

      {showInsertClientsModal && (
        <>
          <InsertClients onClose={() => setShowInsertClientsModal(false)} />
        </>
      )}

      {showEditClientModal && (
        <>
          <EditarContato
            onClose={handleCloseEditModal}
            chat={showEditClientModal}
          />
        </>
      )}
    </>
  );
}
