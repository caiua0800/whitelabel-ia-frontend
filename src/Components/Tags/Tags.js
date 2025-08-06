import React, { useState, useEffect, useContext } from "react";
import style from "./TagsStyle";
import "./tags.css";
import { obterTags } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import CriarTag from "./Modais/CriarTag/CriarTag";
import VerTag from "./Modais/VerTag/VerTag";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiPlus, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Tags() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { credentials } = useContext(AuthContext);
  const [createTag, setCreateTag] = useState(false);
  const [seeTag, setSeeTag] = useState(null);

  const getAllTags = async () => {
    if (!credentials?.accessToken) return;
    try {
      startLoading();
      const tagsData = await obterTags(credentials.accessToken);
      if (tagsData) {
        setTags(tagsData);
      }
    } catch (error) {
      console.log("Erro ao buscar tags:", error);
    } finally {
      stopLoading();
    }
  };

  const closeCreateTag = () => {
    setCreateTag(false);
    getAllTags();
  };

  const closeSeeTag = () => {
    setSeeTag(null);
    getAllTags();
  };

  useEffect(() => {
    let result = [...tags];
    if (searchTerm) {
      result = result.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    setFilteredTags(result);
    setCurrentPage(1);
  }, [tags, searchTerm, sortOrder]);

  useEffect(() => {
    getAllTags();
  }, [credentials]);

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);
  const getCurrentTags = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTags.slice(startIndex, startIndex + itemsPerPage);
  };

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
  
  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
            <h1 style={style.title}>Gerenciamento de Tags</h1>
            <button onClick={() => setCreateTag(true)} style={style.newTagButton}>
                <FiPlus style={{ marginRight: '8px' }}/>
                Nova Tag
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
            {getCurrentTags().length > 0 ? (
              getCurrentTags().map((tag) => (
                <div
                  onClick={() => setSeeTag(tag)}
                  key={tag.id}
                  className="tag-card"
                  style={style.card}
                >
                  <span style={{...style.cardTag, backgroundColor: tag.backgroundColor || '#3c4257', color: tag.color || '#aeb9c4'}}>#{tag.name}</span>
                  <p style={style.cardDescription}>{tag.description || 'Sem descrição'}</p>
                </div>
              ))
            ) : (
              <div style={style.messageCenter}>Nenhuma tag encontrada.</div>
            )}
        </div>
        
        {totalPages > 1 && (
            <div style={style.paginationContainer}>
              <button style={{...style.paginationButton, ...(currentPage === 1 ? style.disabledButton : {})}} onClick={handlePrevPage} disabled={currentPage === 1}>
                <FiChevronLeft/>
              </button>
              <span style={style.paginationView}>Página {currentPage} de {totalPages}</span>
              <button style={{...style.paginationButton, ...(currentPage === totalPages ? style.disabledButton : {})}} onClick={handleNextPage} disabled={currentPage === totalPages}>
                <FiChevronRight/>
              </button>
            </div>
        )}
      </div>

      {createTag && <CriarTag actualTags={tags} onClose={closeCreateTag} />}
      {seeTag && <VerTag tag={seeTag} onClose={closeSeeTag} />}
    </>
  );
}