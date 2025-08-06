import React, { useState, useEffect, useContext } from "react";
import style from "./ProductStyle";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";
import func from "../../Services/fotmatters";
import NewProduct from "./NewProduct/NewProduct";
import ProductPage from "./ProductPage/ProductPage";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiPlus, FiSearch } from "react-icons/fi";
import Pagination from "../Chats/ChatRows/Pagination"

const ITEMS_PER_PAGE = 5;

export default function Product() {
  const { credentials } = useContext(AuthContext);
  const { products, getProducts } = useContext(ProductContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async (page = 1) => {
    if (!credentials?.accessToken) return;
    try {
      startLoading();
      setIsSearching(true);
      const response = await getProducts(
        searchTerm, page, ITEMS_PER_PAGE, credentials.accessToken, order
      );
      setTotalPages(Math.ceil(response.totalCount / ITEMS_PER_PAGE));
      setTotalCount(response.totalCount);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(1);
    }
  };

  useEffect(() => {
    if (credentials?.accessToken) {
      handleSearch(1);
    }
  }, [credentials, searchTerm, order]);

  const handleReload = () => {
    handleSearch(currentPage);
  }

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
            <h1 style={style.title}>Gerenciamento de Produtos</h1>
            <button onClick={() => setShowNewProductModal(true)} style={style.newProductButton}>
                <FiPlus style={{marginRight: '8px'}}/>
                Novo Produto
            </button>
        </div>
        
        <div style={style.panel}>
            <div style={style.searchWrapper}>
                <FiSearch style={style.searchIcon}/>
                <input placeholder="Pesquisar por nome..." style={style.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <select style={style.selectInput} value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="desc">Mais recentes</option>
                <option value="asc">Mais antigos</option>
            </select>
        </div>

        <div style={style.tableContainer}>
            <div style={style.tableHeader}>
              <span style={style.tableHeaderCell}>Nome</span>
              <span style={style.tableHeaderCell}>Valor Unitário</span>
              <span style={style.tableHeaderCell}>Data de Criação</span>
              <span style={style.tableHeaderCell}>Status</span>
            </div>
            
            <div style={style.tableBody}>
                {isSearching && products.length === 0 ? (
                    <div style={style.messageCenter}>Buscando...</div>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id} style={style.tableRow} className="table-row-hover" onClick={() => setSelectedProduct(product)}>
                          <td style={style.tableCell}>{product.name || "Não informado"}</td>
                          <td style={style.tableCell}>{func.formatarMoeda(product.unityPrice) || "Não informado"}</td>
                          <td style={style.tableCell}>{func.formatarData(product.dateCreated) || "Não informado"}</td>
                          <td style={style.tableCell}>
                             <span style={{...style.statusBadge, ...(product.status === 1 ? style.statusActive : product.status === 2 ? style.statusSoldOut : style.statusInactive)}}>
                                {product.status === 1 ? "Ativo" : product.status === 2 ? "Esgotado" : "Indisponível"}
                            </span>
                          </td>
                        </tr>
                    ))
                ) : (
                    <div style={style.messageCenter}>Nenhum produto encontrado.</div>
                )}
            </div>
        </div>

        {totalPages > 1 &&
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => handleSearch(p)}
                style={style}
            />
        }
      </div>

      {showNewProductModal && <NewProduct reload={handleReload} onClose={() => setShowNewProductModal(false)} />}
      {selectedProduct && <ProductPage reload={handleReload} product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}