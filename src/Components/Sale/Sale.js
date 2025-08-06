import React, { useState, useEffect, useContext } from "react";
import style from "./SaleStyle";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";
import func from "../../Services/fotmatters";
import SalePage from "./SalePage/SalePage";
import { SaleContext } from "../../Context/SaleContext";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

export default function Sale() {
  const { credentials } = useContext(AuthContext);
  const { sales, getSales } = useContext(SaleContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState("desc");
  const [selectedSale, setSelectedSale] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const handleSearch = async (page = 1) => {
    if (!credentials?.accessToken) return;
    try {
      startLoading();
      setIsSearching(true);
      const response = await getSales(
        searchTerm, page, ITEMS_PER_PAGE, credentials.accessToken, order,
        null, null, statusFilter ? parseInt(statusFilter) : null
      );
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setIsSearching(false);
      stopLoading();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
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
  }, [credentials, order, statusFilter, searchTerm]);

  const handleSaleStatus = (st) => {
    switch (st) {
      case 1: return <span style={{...style.statusBadge, ...style.statusPending}}>Pendente</span>;
      case 2: return <span style={{...style.statusBadge, ...style.statusPaid}}>Paga</span>;
      case 3: return <span style={{...style.statusBadge, ...style.statusCancelled}}>Cancelada</span>;
      case 4: return <span style={{...style.statusBadge, ...style.statusExpired}}>Expirada</span>;
      default: return <span style={{...style.statusBadge}}>Indefinido</span>;
    }
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
            <h1 style={style.title}>Gerenciamento de Vendas</h1>
        </div>
        
        <div style={style.panel}>
            <div style={style.searchWrapper}>
                <FiSearch style={style.searchIcon}/>
                <input placeholder="Pesquisar por ID da venda..." style={style.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <select style={style.selectInput} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Status (Todos)</option>
                <option value="1">Pendente</option>
                <option value="2">Paga</option>
                <option value="3">Cancelada</option>
                <option value="4">Expirada</option>
            </select>
            <select style={style.selectInput} value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="desc">Mais recentes</option>
                <option value="asc">Mais antigas</option>
            </select>
        </div>

        <div style={style.tableContainer}>
            <div style={style.tableHeader}>
              <span style={style.tableHeaderCell}>ID da Venda</span>
              <span style={style.tableHeaderCell}>Valor Total</span>
              <span style={style.tableHeaderCell}>Data</span>
              <span style={style.tableHeaderCell}>Produtos</span>
              <span style={style.tableHeaderCell}>Status</span>
            </div>
            
            <div style={style.tableBody}>
                {isSearching && sales.length === 0 ? (
                    <div style={style.messageCenter}>Buscando...</div>
                ) : sales.length > 0 ? (
                    sales.map((sale) => (
                        <div key={sale.sale.id} style={style.tableRow} className="table-row-hover" onClick={() => setSelectedSale(sale)}>
                          <div style={style.tableCell}>{sale.sale.id || "Não informado"}</div>
                          <div style={style.tableCell}>{func.formatarMoeda(sale.sale.totalAmount) || "Não informado"}</div>
                          <div style={style.tableCell}>{func.formatarData(sale.sale.dateCreated) || "Não informado"}</div>
                          <div style={style.tableCell}>{sale.products.length}</div>
                          <div style={style.tableCell}>{handleSaleStatus(sale.sale.status)}</div>
                        </div>
                    ))
                ) : (
                    <div style={style.messageCenter}>Nenhuma venda encontrada.</div>
                )}
            </div>
        </div>

        {totalPages > 1 &&
             <div style={style.paginationContainer}>
              <button style={{...style.paginationButton, ...(currentPage === 1 ? style.disabledButton : {})}} onClick={handlePrevPage} disabled={currentPage === 1 || isSearching}>
                <FiChevronLeft/>
              </button>
              <span style={style.paginationView}>Página {currentPage} de {totalPages}</span>
              <button style={{...style.paginationButton, ...(currentPage === totalPages ? style.disabledButton : {})}} onClick={handleNextPage} disabled={currentPage === totalPages || isSearching}>
                <FiChevronRight/>
              </button>
            </div>
        }
      </div>
      
      {selectedSale && <SalePage sale={selectedSale} onClose={() => setSelectedSale(null)} />}
    </>
  );
}