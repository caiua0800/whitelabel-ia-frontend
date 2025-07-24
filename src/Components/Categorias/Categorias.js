import React, { useState, useEffect, useContext } from "react";
import style from "./CategoriasStyle";
import "./tags.css";
import { obterCategorias, obterTags } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import CriarTag from "./Modais/CriarTag/CriarCategoria";
import VerTag from "./Modais/VerCategoria/VerCategoria";
import CriarCategoria from "./Modais/CriarTag/CriarCategoria";
import VerCategoria from "./Modais/VerCategoria/VerCategoria";

export default function Categorias() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { credentials } = useContext(AuthContext);

  const [createCategory, setCreateCategory] = useState(false);
  const [seeCategory, setSeeCategory] = useState(null);

  const getAllCategories = async () => {
    try {
      const cats = await obterCategorias(credentials.accessToken);
      if (cats) {
        setCategorias(cats);
        setFilteredCategorias(cats);
      } else {
        console.log("Erro ao obter tags");
      }
    } catch (error) {
      console.log("Erro ao buscar tags:", error);
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
    let result = [...categorias];

    if (searchTerm) {
      result = result.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredCategorias(result);
    setCurrentPage(1);
  }, [categorias, searchTerm, sortOrder]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);

  const getCurrentCategories = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCategorias.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredCategorias.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [itemsPerPage, filteredCategorias.length, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 1;
    if (value < 1) value = 1;
    if (value > 20) value = 20;
    setItemsPerPage(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Categorias</span>
        <div style={style.explanationBox}>
          <div style={style.explanationBoxCenter}>
            <span style={style.expText}>
              Com as <span style={style.expTextBold}>📌 #CATEGORIAS</span> é possível
              fazer uma filtragem mais ágil dos seus produtos e ajudar seus clientes na 
              hora da pesquisa deles 😉
            </span>
            <span style={style.expText}>
              Você pode criar a categoria com um nome e descrição, e depois
              adiciona-las aos seus produtos.
            </span>
          </div>
        </div>

        <div style={style.optionsBox}>
          <button onClick={() => setCreateCategory(true)} style={style.optionButton}>
            Criar nova categoria
          </button>
          <button style={style.optionButton}></button>
          <button style={style.optionButton}></button>
        </div>
        <div style={style.tagsContainerBox}>
          <span style={style.tagsContainerBoxTitle}>Suas #CATEGORIAS</span>

          <div style={style.tagsContainerBoxFirst}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div style={style.searchFilter}>
                <span style={style.searchFilterTitle}>Pesquise</span>
                <input
                  placeholder="nome da categoria..."
                  style={style.searchFilterInput}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: 10,
              }}
            >
              <div style={style.createOrderFilter}>
                <span style={style.filterName}>Ordenar por</span>
                <select
                  style={style.selectFilter}
                  value={sortOrder}
                  onChange={handleSortChange}
                >
                  <option value="desc">Nome (Z-A)</option>
                  <option value="asc">Nome (A-Z)</option>
                </select>
              </div>
              {/* <div style={style.createOrderFilter}>
                <span style={style.filterName}>Itens por página</span>
                <select
                  style={style.selectFilter}
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                </select>
              </div> */}
            </div>
          </div>

          <div style={style.tagsContainer}>
            {getCurrentCategories().length > 0 ? (
              getCurrentCategories().map((cat, key) => (
                <div
                  onClick={() => setSeeCategory(cat)}
                  key={cat.id || key}
                  className="tagBox"
                  style={{ ...style.tag }}
                >
                  <span className="tag-text" style={{...style.tagText, background: (cat && cat.backgroundColor && cat.backgroundColor.trim () != "") ? cat.backgroundColor : "rgba(80, 80, 80, 1)", color: (cat && cat.color && cat.color.trim () != "") ? cat.color : "rgba(255, 255, 255, 1)"}}>
                    {cat.name}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Nenhuma categoria encontrada
              </div>
            )}
          </div>

          <div style={style.bottom}>
            <div></div>
            <div style={style.paginationContainer}>
              <button
                style={style.paginationButton}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <div style={style.actualPageBox}>
                <span style={style.actualPageText}>
                  Página {currentPage} de {totalPages || 1} :{" "}
                  {filteredCategorias.length} Categorias
                </span>
              </div>
              <button
                style={style.paginationButton}
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Próxima
              </button>
            </div>
            <div style={style.itemsPerPageContainer}></div>
          </div>
        </div>
      </div>

      {createCategory && (
        <>
          <CriarCategoria actualCategories={categorias} onClose={closeCreateCategory} />
        </>
      )}

      {seeCategory && (
        <>
          <VerCategoria category={seeCategory} onClose={closeSeeCategory} />
        </>
      )}
    </>
  );
}
