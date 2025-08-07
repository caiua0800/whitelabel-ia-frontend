import React, { useState, useEffect, useContext, useCallback } from "react";
import style from "./NewShotStyle";
import ModalDefault from "../../../ModalDefault/ModalDefault";
import { AuthContext } from "../../../../Context/AuthContext";
import { SystemMessageContext } from "../../../../Context/SystemMessageContext";
import { enviarDisparo, searchChats } from "../../../../Services/dbservice";
import { ChatContext } from "../../../../Context/ChatContext";
import func from "../../../../Services/fotmatters";
import TagsModal from "../../../Clients/Tag/TagsModal";
import AgentModal from "./AgentModal/AgentModal";
import { LoadingContext } from "../../../../Context/LoadingContext";
import { FiX, FiSearch, FiTag, FiUsers, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

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
  const { showMessage } = useContext(SystemMessageContext);

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
      showMessage("Selecione um agente para enviar as mensagens.", "error");
      return;
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
        // alert("Mensagens enviadas com sucesso.");
        showMessage("Mensagens enviadas com sucesso.", "success");
        onClose();
      } else {
        // alert("Ocorreu um erro ao enviar.");
        showMessage("Ocorreu um erro ao enviar.", "error");

      }
    } catch (error) {
      // alert("Ocorreu um erro ao enviar.");
      showMessage("Ocorreu um erro ao enviar.", "error");
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
          <div style={style.modalHeader}>
            <h2 style={style.title}>Realizar Novo Envio</h2>
            <button style={style.closeBtn} onClick={onClose}>
              <FiX size={22} />
            </button>
          </div>

          <div style={style.modalBody}>
            <div style={style.filters}>
              <div style={style.filterBox}>
                <label style={style.filterName}>Pesquisar Cliente</label>
                <div style={style.inputWrapper}>
                  <FiSearch style={style.inputIcon} />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nome ou Número..."
                    style={style.input}
                  />
                </div>
              </div>

              <div style={style.filterBox}>
                <label style={style.filterName}>Criado entre</label>
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={style.input}
                  type="date"
                />
              </div>

              <div style={style.filterBox}>
                <label style={style.filterName}>Até</label>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  style={style.input}
                  type="date"
                />
              </div>

              <div style={style.filterBox}>
                <label style={style.filterName}>Tags</label>
                <button
                  onClick={() => setShowTagsModal(true)}
                  style={style.tagButton}
                >
                  <FiTag style={{ marginRight: "8px" }} />
                  Selecionar Tags ({selectedTags.length})
                </button>
              </div>

              <div style={style.filterBox}>
                <label style={{ ...style.filterName, opacity: 0 }}>s</label>
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
                <div style={style.tableTitleWrapper}>
                  <FiUsers style={{ marginRight: "8px" }} />
                  <span style={style.tableTitle}>
                    Resultados ({totalCount})
                  </span>
                </div>

                <div style={style.selectAllAndPagination}>
                  {chats && chats.length > 0 && (
                    <div style={style.selectAllBox}>
                      <input
                        type="checkbox"
                        style={style.checkbox}
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        id="selectAllCheck"
                      />
                      <label
                        htmlFor="selectAllCheck"
                        style={style.selectAllBoxTitle}
                      >
                        Selecionar todos na página
                      </label>
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

              <div style={style.tableBody}>
                {isSearching && chats.length === 0 ? (
                  <div style={style.emptyState}>Carregando...</div>
                ) : chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <div key={chat.id} style={style.tableRow}>
                      <input
                        type="checkbox"
                        style={style.checkbox}
                        checked={selectedClients.some(
                          (c) => c.number === chat.id
                        )}
                        onChange={() => toggleClientSelection(chat)}
                      />
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
                    </div>
                  ))
                ) : (
                  <div style={style.emptyState}>
                    {searchTerm ||
                    selectedTags.length > 0 ||
                    startDate ||
                    endDate
                      ? "Nenhum resultado encontrado com esses filtros"
                      : "Nenhum cliente encontrado"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={style.modalFooter}>
            <div style={style.selectionInfo}>
              <FiUsers style={{ marginRight: "8px" }} />
              <span>
                {selectedClients.length} cliente(s) selecionado(s) no total
              </span>
            </div>

            <div style={style.agentAndSend}>
              <div style={style.selectNumberPart}>
                <span style={style.selectNumberPartText}>Enviar com:</span>
                {!chosenAgent ? (
                  <button
                    onClick={() => setSelectAgentModal(true)}
                    style={style.selectNumberPartButton}
                  >
                    Selecione o Agente
                  </button>
                ) : (
                  <div style={style.selectedAgentBox}>
                    <span style={style.selectedAgentBoxMessage}>
                      {chosenAgent.name}
                    </span>
                    <button
                      style={style.selectedAgentBoxUnselectButton}
                      onClick={() => setChosenAgent(null)}
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                )}
              </div>
              {chosenAgent && (
                <button
                  style={style.sendMessagesButton}
                  onClick={handleSend}
                  disabled={selectedClients.length === 0 || !chosenAgent}
                >
                  <FiSend style={{ marginRight: "8px" }} />
                  Enviar Disparo
                </button>
              )}
            </div>
          </div>
        </div>
        {showTagsModal && (
          <TagsModal
            currentTagsAdded={selectedTags}
            onClose={() => setShowTagsModal(false)}
            handleSelect={handleSelectTags}
          />
        )}
      </ModalDefault>

      {selectAgentModal && (
        <AgentModal
          setSelectedAgent={setChosenAgent}
          onClose={() => setSelectAgentModal(false)}
        />
      )}
    </>
  );
}
