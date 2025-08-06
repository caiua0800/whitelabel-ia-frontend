import React, { useState, useEffect, useContext } from "react";
import style from "./CategoriasStyle";
import "./tags.css";
import { obterCategorias } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import CriarCategoria from "./Modais/CriarTag/CriarCategoria";
import VerCategoria from "./Modais/VerCategoria/VerCategoria";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Pagination from "../Chats/ChatRows/Pagination"

export default function Categorias() {
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { credentials } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [createCategory, setCreateCategory] = useState(false);
  const [seeCategory, setSeeCategory] = useState(null);

  const getAllCategories = async () => {
    try {
      startLoading();
      const cats = await obterCategorias(credentials.accessToken);
      if (cats) {
        setCategorias(cats);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      stopLoading();
    }
  };

  const closeCreateCategory = async () => {
    setCreateCategory(false);
    await getAllCategories();
  };

  const closeSeeCategory = async () => {
    setSeeCategory(null);
    await getAllCategories();
  };
  
  useEffect(() => {
    if(credentials.accessToken) {
      getAllCategories();
    }
  }, [credentials.accessToken]);

  useEffect(() => {
    let result = [...categorias];
    if (searchTerm) {
      result = result.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setFilteredCategorias(result);
    setCurrentPage(1);
  }, [categorias, searchTerm, sortOrder]);
  
  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);
  const getCurrentCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategorias.slice(startIndex, startIndex + itemsPerPage);
  };
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
            <h1 style={style.title}>Categorias de Produtos</h1>
            <button onClick={() => setCreateCategory(true)} style={style.newCategoryButton}>
                <FiPlus style={{ marginRight: '8px' }}/>
                Nova Categoria
            </button>
        </div>

        <div style={style.panel}>
            <div style={style.searchWrapper}>
              <FiSearch style={style.searchIcon}/>
              <input
                style={style.searchInput}
                placeholder="Pesquisar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              style={style.sortSelect}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Nome (A-Z)</option>
              <option value="desc">Nome (Z-A)</option>
            </select>
        </div>

        <div style={style.gridContainer}>
            {getCurrentCategories().length > 0 ? (
              getCurrentCategories().map((cat) => (
                <div
                  onClick={() => setSeeCategory(cat)}
                  key={cat.id}
                  className="category-card"
                  style={style.card}
                >
                  <span style={style.cardName}>{cat.name}</span>
                  <p style={style.cardDescription}>{cat.description || 'Sem descrição'}</p>
                </div>
              ))
            ) : (
              <div style={style.messageCenter}>Nenhuma categoria encontrada.</div>
            )}
        </div>
        
        {totalPages > 1 && (
             <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                style={style}
              />
        )}
      </div>

      {createCategory && <CriarCategoria onClose={closeCreateCategory} />}
      {seeCategory && <VerCategoria category={seeCategory} onClose={closeSeeCategory} />}
    </>
  );
}