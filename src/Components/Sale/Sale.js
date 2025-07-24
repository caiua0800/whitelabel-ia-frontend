import React, { useState, useEffect, useContext } from "react";
import style from "./SaleStyle";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";
import func from "../../Services/fotmatters";
import { searchProducts } from "../../Services/dbservice";
import NewProduct from "./NewProduct/NewProduct";
import SalePage from "./SalePage/SalePage";
import { SaleContext } from "../../Context/SaleContext";
import { LoadingContext } from "../../Context/LoadingContext";

const primaryColor = "#4f46e5";
const hoverColor = "#f3f4f6";
const borderColor = "#e5e7eb";
const textColor = "#374151";
const accentColor = "#10b981";
const ITEMS_PER_PAGE = 5;

export default function Sale() {
  const { credentials } = useContext(AuthContext);
  const { sales, getSales } = useContext(SaleContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState("desc");
  const [selectedSale, setSelectedSale] = useState(null);

  const handleSearch = async (term = searchTerm, page = 1) => {
    try {
      startLoading()
      setIsSearching(true);
      const response = await getSales(
        term,
        page,
        ITEMS_PER_PAGE,
        credentials.accessToken,
        order,
        startDate || null,
        endDate || null,
        null
      );

      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading()
    }
  };

  const getCurrentPageSales = () => {
    if (!sales || !Array.isArray(sales)) {
      return [];
    }
    return sales;
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (credentials?.accessToken) {
      handleSearch("", 1);
    }
  }, [credentials?.accessToken]);

  const handleSaleStatus = (st) => {
    switch (st) {
      case 1:
        return <span style={{ color: "rgba(0, 200, 220, 1)" }}>Pendente</span>;
      case 2:
        return <span style={{ color: "rgba(0, 200, 0, 1)" }}>Paga</span>;
      case 3:
        return <span style={{ color: "rgba(220, 50, 0, 1)" }}>Cancelada</span>;
      case 4:
        return <span style={{ color: "rgba(0, 0, 0, 1)" }}>Expirada</span>;
      default:
        return <span style={{ color: "rgba(0, 0, 0, 1)" }}>Indefinido</span>;
    }
  };

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Suas Vendas</span>

        <div style={style.header}>
          <div style={style.headerBox}>
            <span style={style.headerText}>
              Aqui você encontra todas as vendas feitas pela IA, pendentes,
              pagas e expiradas.
            </span>
            <span style={style.headerText}>
              Você também consegue extrair relatórios📈 e criar vendas
              manualmente.
            </span>
          </div>
          <div style={style.headerButtonsBox}>
            <button
              style={{
                ...style.headerButton,
                background: "rgba(100, 220, 0, 1)",
                opacity: 0.5,
                textDecoration: "line-through",
              }}
            >
              Exporte (Excel)
            </button>
            <button
              onClick={() => setShowNewProductModal(true)}
              style={{
                ...style.headerButton,
                background: "rgba(210, 210, 210, 1)",
              }}
            >
              Nova Venda
            </button>
            <button
              style={{
                ...style.headerButton,
                textDecoration: "line-through",
                opacity: 0.5,
                background: "rgba(0, 200, 220, 1)",
              }}
            >
              Exporte (PDF)
            </button>
            <button
              style={{
                ...style.headerButton,
                textDecoration: "line-through",
                opacity: 0.5,
                background: "rgba(210, 210, 210, 1)",
              }}
            ></button>
          </div>
        </div>

        <div style={style.searchArea}>
          <div style={style.searchBarBoxContainer}>
            <span style={style.searchBarBoxContainerTitle}>Buscar Vendas</span>
            <div style={style.searchBarBox}>
              <input
                placeholder="Nome ou Id"
                style={style.searchBarInput}
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={style.filters}>
            <div style={style.filterBox}>
              <span style={style.filterBoxName}>Ordem</span>
              <div style={style.filter}>
                <select
                  style={style.filterSelect}
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option value="desc">Mais recentes primeiro</option>
                  <option value="asc">Mais antigos primeiro</option>
                </select>
              </div>
            </div>
          </div>
          <button
            style={style.searchButton}
            disabled={isSearching}
            onClick={() => handleSearch()}
          >
            {isSearching ? "Buscando..." : "Pesquisar"}
          </button>
        </div>

        <div style={style.tableContainer}>
          <span style={style.tableTitle}>Tabela de vendas</span>

          <div style={modernTableStyles.tableWrapper}>
            <table style={modernTableStyles.table}>
              <thead style={modernTableStyles.tableHead}>
                <tr>
                  <th style={modernTableStyles.tableHeaderCell}>Nome</th>
                  <th style={modernTableStyles.tableHeaderCell}>
                    Valor Unitário
                  </th>
                  <th style={modernTableStyles.tableHeaderCell}>
                    Data de criação
                  </th>
                  <th style={modernTableStyles.tableHeaderCell}>
                    Produtos vendidos
                  </th>
                  <th style={modernTableStyles.tableHeaderCell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageSales().length > 0 ? (
                  getCurrentPageSales().map((sale) => (
                    <tr
                      key={sale.sale.id}
                      style={modernTableStyles.tableRow}
                      onClick={() => setSelectedSale(sale)}
                    >
                      <td style={modernTableStyles.tableCell}>
                        {sale.sale.id || "Não informado"}
                      </td>
                      <td style={modernTableStyles.tableCell}>
                        {func.formatarMoeda(sale.sale.totalAmount) ||
                          "Não informado"}
                      </td>
                      <td style={modernTableStyles.tableCell}>
                        {func.formatarData(sale.sale.dateCreated) ||
                          "Não informado"}
                      </td>
                      <td style={modernTableStyles.tableCell}>
                        {sale.products.length}
                      </td>
                      <td
                        style={{
                          ...modernTableStyles.tableCell,
                        }}
                      >
                        {handleSaleStatus(sale.sale.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={modernTableStyles.noResults}>
                      {isSearching
                        ? "Buscando..."
                        : "Nenhum produto encontrado"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

          <div
            style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
          ></div>
        </div>
      </div>

      {showNewProductModal && (
        <>
          <NewProduct
            reload={() => handleSearch("", 1)}
            onClose={() => setShowNewProductModal(false)}
          />
        </>
      )}

      {selectedSale && (
        <>
          <SalePage
            reload={() => handleSearch("", 1)}
            sale={selectedSale}
            onClose={() => {
              setSelectedSale(null);
            }}
          />
        </>
      )}
    </>
  );
}

const modernTableStyles = {
  tableWrapper: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginTop: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    tableLayout: "fixed", // Adicionado para garantir alinhamento consistente
  },
  tableHead: {
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "center", // Centralizado
    fontSize: "12px",
    fontWeight: "600",
    color: textColor,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: `1px solid ${borderColor}`,
  },
  tableRow: {
    borderBottom: `1px solid ${borderColor}`,
    transition: "background-color 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: hoverColor,
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCell: {
    padding: "16px",
    fontSize: "14px",
    color: textColor,
    textAlign: "center", // Centralizado
    verticalAlign: "middle", // Alinhamento vertical
  },
  noResults: {
    padding: "24px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
  },
  paginationButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  pageInfo: {
    fontSize: "14px",
    color: textColor,
    fontWeight: "500",
  },
};
