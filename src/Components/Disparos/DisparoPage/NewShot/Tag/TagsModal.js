import  { useState, useEffect, useContext } from "react";
import React from "react";
import style from "./TagsModalStyle";
import { obterTags } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { FiX, FiSearch } from "react-icons/fi";

export default function TagsModal({ currentTagsAdded, handleSelect, onClose }) {
  const [allTags, setAllTags] = useState([]);
  const [currentAddedTags, setCurrentAddedTags] = useState(currentTagsAdded || []);
  const [availableTags, setAvailableTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const fetchedTags = await obterTags(credentials.accessToken);
        setAllTags(fetchedTags || []);
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };
    if (credentials.accessToken) {
        fetchAllTags();
    }
  }, [credentials.accessToken]);

  useEffect(() => {
    const currentAddedIds = new Set(currentAddedTags.map((t) => t.id));
    const filtered = allTags
      .filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((tag) => !currentAddedIds.has(tag.id));
    setAvailableTags(filtered);
  }, [searchTerm, currentAddedTags, allTags]);

  const handleAddTag = (tag) => setCurrentAddedTags([...currentAddedTags, tag]);
  const handleRemoveTag = (tag) => setCurrentAddedTags(currentAddedTags.filter((t) => t.id !== tag.id));
  const handleSave = () => { handleSelect(currentAddedTags); onClose(); };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.title}>Selecionar Tags</h2>
          <button onClick={onClose} style={style.closeBtn}><FiX size={20}/></button>
        </div>
        <div style={style.modalBody}>
            <div style={style.searchWrapper}>
                <FiSearch style={style.searchIcon}/>
                <input placeholder="Pesquisar tag..." style={style.searchInput} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div style={style.tagsSection}>
                <h3 style={style.areaTitle}>Tags Disponíveis</h3>
                <div style={style.tagsContainer}>
                  {availableTags.length > 0 ? availableTags.map((tag) => (
                    <div key={tag.id} style={style.tag} onClick={() => handleAddTag(tag)} className="tag-hover">
                      <span>{tag.name}</span>
                    </div>
                  )) : <div style={style.noTagsMessage}>{searchTerm ? "Nenhuma tag encontrada" : "Nenhuma tag disponível"}</div>}
                </div>
            </div>
            <div style={style.tagsSection}>
                <h3 style={style.areaTitle}>Tags Selecionadas</h3>
                <div style={style.tagsContainer}>
                  {currentAddedTags.length > 0 ? currentAddedTags.map((tag) => (
                    <div key={tag.id} style={{...style.tag, ...style.tagSelected}} onClick={() => handleRemoveTag(tag)} className="tag-selected-hover">
                      <span>{tag.name}</span>
                    </div>
                  )) : <div style={style.noTagsMessage}>Nenhuma tag selecionada</div>}
                </div>
            </div>
        </div>
        <div style={style.modalFooter}>
            <button style={style.saveButton} onClick={handleSave}>Salvar Seleção</button>
        </div>
      </div>
    </div>
  );
}