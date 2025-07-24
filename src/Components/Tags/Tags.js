import React, { useState, useEffect, useContext } from "react";
import style from "./TagsStyle";
import "./tags.css";
import { obterTags } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import CriarTag from "./Modais/CriarTag/CriarTag";
import VerTag from "./Modais/VerTag/VerTag";

export default function Tags() {
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const { credentials } = useContext(AuthContext);

  const [createTag, setCreateTag] = useState(false);
  const [seeTag, setSeeTag] = useState(null);

  const getAllTags = async () => {
    try {
      const tags = await obterTags(credentials.accessToken);
      if (tags) {
        setTags(tags);
        setFilteredTags(tags);
      } else {
        console.log("Erro ao obter tags");
      }
    } catch (error) {
      console.log("Erro ao buscar tags:", error);
    }
  };

  const closeCreateTag = async () => {
    setCreateTag(false);
    await getAllTags();
  };

  const closeSeeTag = async () => {
    setSeeTag(null);
    await getAllTags();
  };

  useEffect(() => {
    let result = [...tags];

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

    setFilteredTags(result);
    setCurrentPage(1);
  }, [tags, searchTerm, sortOrder]);

  useEffect(() => {
    getAllTags();
  }, []);

  const totalPages = Math.ceil(filteredTags.length / itemsPerPage);

  const getCurrentTags = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTags.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredTags.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [itemsPerPage, filteredTags.length, currentPage]);

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

  console.log(filteredTags)

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>TAGS</span>
        <div style={style.explanationBox}>
          <div style={style.explanationBoxCenter}>
            <span style={style.expText}>
              Com as <span style={style.expTextBold}>📌 #TAGS</span> é possível
              fazer disparos mais direcionados e separar melhor seus clientes,
              por{" "}
              <span style={style.expTextBold}>
                nichos, características, produtos e muitos outros! 😃
              </span>
            </span>
            <span style={style.expText}>
              Você pode criar a tag com um nome e descrição, e depois
              adiciona-las aos seus clientes.
            </span>
          </div>
        </div>

        <div style={style.optionsBox}>
          <button onClick={() => setCreateTag(true)} style={style.optionButton}>
            Criar nova tag
          </button>
          <button style={style.optionButton}></button>
          <button style={style.optionButton}></button>
        </div>
        <div style={style.tagsContainerBox}>
          <span style={style.tagsContainerBoxTitle}>Suas #TAGS</span>

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
                  placeholder="nome da tag..."
                  style={style.searchFilterInput}
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
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
              <div style={style.createOrderFilter}>
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
              </div>
            </div>
          </div>

          <div style={style.tagsContainer}>
            {getCurrentTags().length > 0 ? (
              getCurrentTags().map((tag, key) => (
                <div
                  onClick={() => setSeeTag(tag)}
                  key={tag.id || key}
                  className="tagBox"
                  style={{ ...style.tag }}
                >
                  <span className="tag-text" style={{...style.tagText, background: (tag && tag.backgroundColor && tag.backgroundColor.trim () != "") ? tag.backgroundColor : "rgba(80, 80, 80, 1)", color: (tag && tag.color && tag.color.trim () != "") ? tag.color : "rgba(255, 255, 255, 1)"}}>
                    {tag.name}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>
                Nenhuma tag encontrada
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
                  {filteredTags.length} Tags
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

      {createTag && (
        <>
          <CriarTag actualTags={tags} onClose={closeCreateTag} />
        </>
      )}

      {seeTag && (
        <>
          <VerTag tag={seeTag} onClose={closeSeeTag} />
        </>
      )}
    </>
  );
}
