import React, { useState, useEffect, useContext, useCallback } from "react";
import func from "../../Services/fotmatters";
import style from "./DisparosStyle";
import { useNavigate } from "react-router-dom";
import { searchShots } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import DisparoPage from "./DisparoPage/DisparoPage";
import { LoadingContext } from "../../Context/LoadingContext";

const ITEMS_PER_PAGE = 5;

export default function Disparos() {
  const [novoDisparoModal, setNovoDisparoModal] = useState(false);
  const navigate = useNavigate();
  const [paginatedShots, setPaginatedShots] = useState({
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: ITEMS_PER_PAGE,
  });
  const { credentials } = useContext(AuthContext);
  const [selectedShot, setSelectedShot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {startLoading, stopLoading} = useContext(LoadingContext)

  const handleGoToNewShot = () => {
    navigate("/novo-disparo");
  };

  const fetchShots = useCallback(
    async (page = 1) => {
      startLoading()
      try {
        setIsLoading(true);
        const response = await searchShots(
          searchTerm,
          page,
          ITEMS_PER_PAGE,
          credentials?.accessToken,
          order,
          startDate,
          endDate,
          statusFilter
        );
        setPaginatedShots(response);
      } catch (error) {
        console.error("Erro ao buscar disparos:", error);
      } finally {
        setIsLoading(false);
        stopLoading()
      }
    },
    [searchTerm, order, startDate, endDate, statusFilter, credentials]
  );

  useEffect(() => {
    fetchShots();
  }, [fetchShots]);

  const handleSearch = () => {
    fetchShots(1);
  };

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(paginatedShots.totalCount / ITEMS_PER_PAGE)
    ) {
      fetchShots(newPage);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(paginatedShots.totalCount / ITEMS_PER_PAGE);
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

      if (paginatedShots.pageNumber <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (
        paginatedShots.pageNumber + maxPagesAfterCurrent >=
        totalPages
      ) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = paginatedShots.pageNumber - maxPagesBeforeCurrent;
        endPage = paginatedShots.pageNumber + maxPagesAfterCurrent;
      }
    }

    return (
      <div style={style.paginationContainer}>
        <button
          onClick={() => handlePageChange(paginatedShots.pageNumber - 1)}
          disabled={paginatedShots.pageNumber === 1}
          style={style.paginationButton}
        >
          &lt;
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              style={style.paginationButton}
            >
              1
            </button>
            {startPage > 2 && <span style={style.paginationEllipsis}>...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i}
            onClick={() => handlePageChange(startPage + i)}
            style={{
              ...style.paginationButton,
              ...(paginatedShots.pageNumber === startPage + i
                ? style.paginationButtonActive
                : {}),
            }}
          >
            {startPage + i}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span style={style.paginationEllipsis}>...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              style={style.paginationButton}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(paginatedShots.pageNumber + 1)}
          disabled={paginatedShots.pageNumber === totalPages}
          style={style.paginationButton}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Área de Disparos</span>
        <div className="new-shot-btn" style={style.createNewShot}>
          <img
            onClick={handleGoToNewShot}
            style={style.createNewShotIcon}
            src="/icons/add-icon2.svg"
          />
        </div>

        <div style={style.disparosHeader}>
          <span style={style.disparosHeaderText}>
            Aqui você pode fazer seu negócio acontecer 🚀
          </span>
          <span style={style.disparosHeaderText}>
            Faça seus disparos de maneira segura 🔐 e automatica 🦾.
          </span>
          <span style={style.disparosHeaderText}>
            Se atente as regras de disparos para não cair na malha fina do
            whatsapp.
          </span>
        </div>

        <div style={style.disparosPart}>
          <span style={style.disparosPartTitle}>Seus Disparos 🛫</span>

          <div style={style.searchArea}>
            <div style={style.searchItem}>
              <span style={style.searchItemTitle}>Pesquise</span>
              <input
                style={style.searchInput}
                placeholder="Nome do disparo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div style={style.searchItem}>
              <span style={style.searchItemTitle}>Entre</span>
              <input
                style={style.searchInput}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div style={style.searchItem}>
              <span style={style.searchItemTitle}>Até</span>
              <input
                style={style.searchInput}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div style={style.searchItem}>
              <span style={style.searchItemTitle}>Status</span>
              <select
                style={style.searchInput}
                value={statusFilter || ""}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
              >
                <option value="">Todos</option>
                <option value="1">Pendente</option>
                <option value="2">Ativo</option>
                <option value="3">Inativo</option>
              </select>
            </div>
            <div style={style.searchItem}>
              <span style={style.searchItemTitle}>Ordem</span>
              <select
                style={style.searchInput}
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="desc">Mais recentes primeiro</option>
                <option value="asc">Mais antigos primeiro</option>
              </select>
            </div>
            <div style={style.searchItem}>
              <span style={{...style.searchItemTitle, opacity: 0}}>Ordem</span>

              <button
                style={style.searchButton}
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? "Buscando..." : "Pesquisar"}
              </button>
            </div>
          </div>

          <div style={tableStyle.container}>
            <div style={tableStyle.header}>
              <span style={tableStyle.headerCell}>Nome</span>
              <span style={tableStyle.headerCell}>Descrição</span>
              <span style={tableStyle.headerCell}>Data de Criação</span>
              <span style={tableStyle.headerCell}>Data de Ativação</span>
              <span style={tableStyle.headerCell}>Status</span>
            </div>

            {isLoading ? (
              <div style={style.loadingState}>
                <span>Carregando...</span>
              </div>
            ) : paginatedShots.items.length > 0 ? (
              <>
                {paginatedShots.items.map((shot) => (
                  <div
                    onClick={() => setSelectedShot(shot)}
                    key={shot.id}
                    style={tableStyle.row}
                  >
                    <span style={tableStyle.cell}>
                      <strong>{shot.name}</strong>
                    </span>
                    <span style={{ ...tableStyle.cell, color: "#64748b" }}>
                      {shot.description || "Sem descrição"}
                    </span>
                    <span style={tableStyle.cell}>
                      {func.formatarDataCompleta(shot.dateCreated)}
                    </span>
                    <span style={tableStyle.cell}>
                      {shot.activationDate
                        ? func.formatarDataCompleta(shot.activationDate)
                        : "-"}
                    </span>
                    <span
                      style={{
                        ...tableStyle.status,
                        ...(shot.status === 2
                          ? tableStyle.statusActive
                          : shot.status === 1
                          ? tableStyle.statusPending
                          : tableStyle.statusInactive),
                      }}
                    >
                      {shot.status === 2
                        ? "Ativo"
                        : shot.status === 1
                        ? "Pendente"
                        : "Inativo"}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div style={style.emptyState}>
                <span style={style.emptyIcon}>📭</span>
                <span>Nenhum disparo encontrado</span>
                <span style={{ fontSize: "13px", marginTop: "8px" }}>
                  Tente alterar seus filtros de busca
                </span>
              </div>
            )}
          </div>

          {renderPagination()}
        </div>
      </div>

      {selectedShot != null && (
        <DisparoPage
          shot={selectedShot}
          onClose={() => {
            setSelectedShot(null);
            fetchShots(paginatedShots.pageNumber);
          }}
        />
      )}
    </>
  );
}

const tableStyle = {
  container: {
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    marginTop: "24px",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
    backgroundColor: "#f8fafc",
    padding: "16px 24px",
    borderBottom: "1px solid #e2e8f0",
    alignItems: "center",
  },
  headerCell: {
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "center", // Centralizando cabeçalhos
  },
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
    padding: "16px 24px",
    borderBottom: "1px solid #f1f5f9",
    alignItems: "center",
    transition: "background 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f8fafc",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  cell: {
    color: "#334155",
    fontSize: "14px",
    fontWeight: "400",
    padding: "8px 0",
    textAlign: "center", // Centralizando conteúdo
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "500",
  },
  statusActive: {
    backgroundColor: "#ecfdf5",
    color: "#059669",
  },
  statusInactive: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  actionButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "background 0.2s ease",
    "&:hover": {
      backgroundColor: "#eff6ff",
    },
  },
};
