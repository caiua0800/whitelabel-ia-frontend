import React, { useState, useEffect, useContext, useCallback } from "react";
import style from "./NewShotStyle";
import ModalDefault from "../../../ModalDefault/ModalDefault";
import { AuthContext } from "../../../../Context/AuthContext";
import { enviarDisparo, searchChats } from "../../../../Services/dbservice";
import { ChatContext } from "../../../../Context/ChatContext";
import func from "../../../../Services/fotmatters";
import TagsModal from "../../../Clients/Tag/TagsModal";
import AgentModal from "./AgentModal/AgentModal";
import { LoadingContext } from "../../../../Context/LoadingContext";

const ITEMS_PER_PAGE = 10;

export default function NewShot({ onClose, shot }) {
  const { credentials } = useContext(AuthContext);
  const { getChats, chats, selectedAgent } = useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chosenAgent, setChosenAgent] = useState(null);
  const [selectAgentModal, setSelectAgentModal] = useState(false);

  const handleSearch = async (page = 1) => {
    try {
      setIsSearching(true);
      startLoading();

      const countResponse = await searchChats(
        searchTerm,
        1,
        1,
        selectedAgent.number,
        credentials.accessToken,
        "desc",
        startDate || null,
        endDate || null,
        null
      );

      setTotalCount(countResponse.totalCount);
      setTotalPages(Math.ceil(countResponse.totalCount / ITEMS_PER_PAGE));
      const tagIds = selectedTags.map((tag) => tag.id).join(",");

      await getChats(
        searchTerm,
        page,
        ITEMS_PER_PAGE,
        selectedAgent.number,
        credentials.accessToken,
        "desc",
        startDate || null,
        endDate || null,
        tagIds
      );

      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading();
    }
  };

  const toggleClientSelection = (client) => {
    setSelectedClients((prev) => {
      const isSelected = prev.some((c) => c.number === client.id);
      if (isSelected) {
        return prev.filter((c) => c.number !== client.id);
      } else {
        return [
          ...prev,
          { number: client.id, name: client.clientName || "Sem nome" },
        ];
      }
    });
  };

  const toggleSelectAll = useCallback(() => {
    if (selectAll) {
      const currentPageClientIds = chats.map((chat) => chat.id);
      setSelectedClients((prev) =>
        prev.filter((client) => !currentPageClientIds.includes(client.number))
      );
    } else {
      const newSelections = chats
        .filter((chat) => !selectedClients.some((c) => c.number === chat.id))
        .map((chat) => ({
          number: chat.id,
          name: chat.clientName || "Sem nome",
        }));

      setSelectedClients((prev) => [...prev, ...newSelections]);
    }
    setSelectAll(!selectAll);
  }, [selectAll, chats, selectedClients]);

  useEffect(() => {
    if (chats && chats.length > 0) {
      const allCurrentPageSelected = chats.every((chat) =>
        selectedClients.some((c) => c.number === chat.id)
      );
      setSelectAll(allCurrentPageSelected);
    } else {
      setSelectAll(false);
    }
  }, [chats, selectedClients]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      handleSearch(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    // Botão "Anterior"
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...style.paginationButton,
          ...(currentPage === 1 ? style.paginationButtonDisabled : {}),
        }}
      >
        &lt;
      </button>
    );

    // Primeira página
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          style={{
            ...style.paginationButton,
            ...(currentPage === 1 ? style.paginationButtonActive : {}),
          }}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" style={style.paginationEllipsis}>
            ...
          </span>
        );
      }
    }

    // Páginas intermediárias
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            ...style.paginationButton,
            ...(currentPage === i ? style.paginationButtonActive : {}),
          }}
        >
          {i}
        </button>
      );
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" style={style.paginationEllipsis}>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          style={{
            ...style.paginationButton,
            ...(currentPage === totalPages ? style.paginationButtonActive : {}),
          }}
        >
          {totalPages}
        </button>
      );
    }

    // Botão "Próximo"
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...style.paginationButton,
          ...(currentPage === totalPages ? style.paginationButtonDisabled : {}),
        }}
      >
        &gt;
      </button>
    );

    return pages;
  };

  const handleSend = async () => {
    if (selectedClients.length === 0) return;
  
    if (!chosenAgent) {
      return alert("Selecione um agente para enviar as mensagens");
    }
  
    startLoading();
    try {
      const response = await enviarDisparo(
        credentials.accessToken,
        chosenAgent.number,
        shot.shot.id,
        selectedClients
      );
  
      if (response === 200) {
        alert("Mensagens enviadas com sucesso.");
        onClose(); // Isso vai fechar o modal e atualizar os dados
      } else {
        alert("Ocorreu um erro ao enviar.");
      }
    } catch (error) {
      alert("Ocorreu um erro ao enviar.");
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    handleSearch(1);
  }, []);

  const handleSelectTags = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <>
      <ModalDefault zIndex={11}>
        <div style={style.modal}>
          <img
            onClick={onClose}
            src="./icons/left-arrow-icon.svg"
            style={style.closeBtn}
          />
          <span style={style.title}>Execute um novo envio</span>

          <div style={style.filters}>
            <div style={style.filterBox}>
              <span style={style.filterName}>Filtre</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome ou Número do cliente..."
                style={style.input}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div style={style.filterBox}>
              <span style={style.filterName}>Data de criação entre</span>
              <input
                value={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={style.input}
                type="date"
              />
            </div>
            <div style={style.filterBox}>
              <span style={style.filterName}>até</span>
              <input
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
                style={style.input}
                type="date"
              />
            </div>

            <div style={style.filterBox}>
              <span style={style.filterName}>Tags</span>
              <button
                onClick={() => setShowTagsModal(true)}
                style={style.tagButton}
              >
                Selecionar Tags
              </button>
            </div>
            <div style={style.filterBox}>
              <span style={{ ...style.filterName, opacity: 0 }}>s</span>
              <button
                onClick={() => handleSearch(1)}
                style={style.searchButton}
                disabled={isSearching}
              >
                {isSearching ? "Buscando..." : "Pesquisar"}
              </button>
            </div>
          </div>

          <div style={style.tableContainer}>
            <div style={style.tableHeaderRow}>
              <div style={style.tableCheckbox}>
                <span style={style.tableTitle}>
                  Resultados {totalCount > 0 && `(${totalCount})`}
                </span>
                {chats.length > 0 && (
                  <div style={style.selectAllBox}>
                    <span style={style.selectAllBoxTitle}>
                      Selecionar Todos os Resultados
                    </span>
                    <input
                      type="checkbox"
                      style={style.selectAllBoxCheckbox}
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </div>
                )}
                <div style={style.paginationContainer}>
                  {renderPagination()}
                </div>
              </div>
            </div>

            {selectedClients.length > 0 && (
              <div style={style.selectedCounter}>
                {selectedClients.length} cliente(s) selecionado(s)
              </div>
            )}

            <div style={style.table}>
              <div style={style.tableHeader}>
                <span style={style.tableHeaderCell}>Nome</span>
                <span style={style.tableHeaderCell}>Contato</span>
                <span style={style.tableHeaderCell}>Criado em</span>
                <span style={style.tableHeaderCell}>Selecionar</span>
              </div>

              {isSearching ? (
                <div style={style.emptyState}>
                  <span>Carregando...</span>
                </div>
              ) : chats.length > 0 ? (
                chats.map((chat) => {
                  const isSelected = selectedClients.some(
                    (c) => c.number === chat.id
                  );
                  return (
                    <div key={chat.id} style={style.tableRow}>
                      <span style={{ ...style.tableCell, ...style.clientName }}>
                        {chat.clientName || "Sem nome"}
                      </span>
                      <span
                        style={{ ...style.tableCell, ...style.contactCell }}
                      >
                        {func.formatarContato(chat.id)}
                      </span>
                      <span style={{ ...style.tableCell, ...style.dateCell }}>
                        {func.formatarDataCompleta(chat.dateCreated)}
                      </span>
                      <div style={style.tableCell}>
                        <input
                          style={style.inputCheckboxCell}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleClientSelection(chat)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={style.emptyState}>
                  <span style={style.emptyIcon}>📭</span>
                  <span>Nenhum resultado encontrado</span>
                  <span style={{ fontSize: "13px", marginTop: "8px" }}>
                    Tente alterar seus filtros de busca
                  </span>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div style={style.paginationContainerBottom}>
                {renderPagination()}
              </div>
            )}

            <div style={style.selectNumberPart}>
              <span style={style.selectNumberPartText}>
                Selecione o número do agente:
              </span>
              {!chosenAgent ? (
                <>
                  <button
                    onClick={() => setSelectAgentModal(true)}
                    style={style.selectNumberPartButton}
                  >
                    Selecione
                  </button>
                </>
              ) : (
                <>
                  <div style={style.selectedAgentBox}>
                    <span style={style.selectedAgentBoxMessage}>{`${
                      chosenAgent && chosenAgent.name
                    } selecionado`}</span>
                    <button
                      style={style.selectedAgentBoxUnselectButton}
                      onClick={() => setChosenAgent(null)}
                    >
                      Remover
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              style={{
                ...style.sendMessages,
                opacity: selectedClients.length > 0 ? 1 : 0.6,
                cursor: selectedClients.length > 0 ? "pointer" : "not-allowed",
              }}
              onClick={handleSend}
              disabled={selectedClients.length === 0}
            >
              Enviar Mensagens
            </button>
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

        {selectAgentModal && (
          <>
            <AgentModal
              setSelectedAgent={setChosenAgent}
              onClose={() => setSelectAgentModal(false)}
            />
          </>
        )}
      </ModalDefault>
    </>
  );
}
