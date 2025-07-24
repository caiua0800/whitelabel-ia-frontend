import React, { useState, useEffect, useContext } from "react";
import style from "./ProductStyle";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";
import func from "../../Services/fotmatters";
import { searchProducts } from "../../Services/dbservice";
import NewProduct from "./NewProduct/NewProduct";
import ProductPage from "./ProductPage/ProductPage";
import { LoadingContext } from "../../Context/LoadingContext";

const primaryColor = "#4f46e5";
const hoverColor = "#f3f4f6";
const borderColor = "#e5e7eb";
const textColor = "#374151";
const accentColor = "#10b981";
const ITEMS_PER_PAGE = 5;

export default function Product() {
  const { credentials } = useContext(AuthContext);
  const { products, getProducts } = useContext(ProductContext);
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async (term = searchTerm, page = 1) => {
    try {
      startLoading()
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

      const response = await getProducts(
        term,
        page,
        ITEMS_PER_PAGE,
        credentials.accessToken,
        order,
        formattedStartDate,
        formattedEndDate,
        tagIds
      );

      setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading()
    }
  };

  const getCurrentPageProducts = () => {
    console.log("Produtos:", products);
    if (!products || !Array.isArray(products)) {
      return [];
    }
    return products;
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

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Seus Produtos</span>

        <div style={style.header}>
          <div style={style.headerBox}>
            <span style={style.headerText}>
              Essa sessão é dinâmica, você pode criar produtos de qualquer
              nicho.
            </span>
            <span style={style.headerText}>
              De um nome ao seu produto, e descreva-o na descrição com todos os
              detalhes e informações.
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
              Novo Produto
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
            >
              Importar Produtos
            </button>
          </div>
        </div>

        <div style={style.searchArea}>
          <div style={style.searchBarBoxContainer}>
            <span style={style.searchBarBoxContainerTitle}>
              Buscar Produtos
            </span>
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
            {/* <div style={style.filterBox}>
              <span style={style.filterBoxName}>Criado Entre</span>
              <div style={style.filter}>
                <input
                  type="date"
                  style={style.filterInput}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div> */}

            {/* <div style={style.filterBox}>
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
          <span style={style.tableTitle}>Tabela de produtos</span>

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
                  <th style={modernTableStyles.tableHeaderCell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageProducts().length > 0 ? (
                  getCurrentPageProducts().map((product) => (
                    <tr
                      key={product.id}
                      style={modernTableStyles.tableRow}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td style={modernTableStyles.tableCell}>
                        {product.name || "Não informado"}
                      </td>
                      <td style={modernTableStyles.tableCell}>
                        {func.formatarMoeda(product.unityPrice) ||
                          "Não informado"}
                      </td>
                      <td style={modernTableStyles.tableCell}>
                        {func.formatarData(product.dateCreated) ||
                          "Não informado"}
                      </td>
                      <td
                        style={{
                          ...modernTableStyles.tableCell,
                          color: product.status === 1 ? accentColor : "#ef4444",
                        }}
                      >
                        {product.status === 1
                          ? "Ativo"
                          : product.status === 2
                          ? "Esgotado"
                          : "Indisponível"}
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

      {selectedProduct && (
        <>
          <ProductPage
            reload={() => handleSearch("", 1)}
            product={selectedProduct}
            onClose={() => {
              setSelectedProduct(null);
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
