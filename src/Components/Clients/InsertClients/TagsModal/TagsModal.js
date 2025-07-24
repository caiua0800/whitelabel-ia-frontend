import React, { useState, useEffect, useContext } from "react";
import style from "./TagsModalStyle";
import { obterTags } from "../../../../Services/dbservice";
import { AuthContext } from "../../../../Context/AuthContext";

export default function TagsModal({ currentTagsAdded, handleSelect, onClose }) {
  const [allTags, setAllTags] = useState([]);
  const [currentAddedTags, setCurrentAddedTags] = useState([]); 
  const [initialAddedTags, setInitialAddedTags] = useState([]); 
  const [availableTags, setAvailableTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const {credentials} = useContext(AuthContext);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const fetchedTags = await obterTags(credentials.accessToken);
        if (fetchedTags) {
          setAllTags(fetchedTags);
          setCurrentAddedTags(currentTagsAdded || []);
        }
      } catch (error) {
        console.error("Erro ao buscar tags:", error);
      }
    };
    
    fetchAllTags();
  }, [currentTagsAdded, credentials.accessToken]);

  useEffect(() => {
    const currentAddedIds = new Set(currentAddedTags.map((t) => t.id));
    const filtered = allTags
      .filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((tag) => !currentAddedIds.has(tag.id));
    setAvailableTags(filtered);
  }, [searchTerm, currentAddedTags, allTags]);

  const handleAddTag = (tag) => {
    setCurrentAddedTags([...currentAddedTags, tag]);
  };

  const handleRemoveTag = (tag) => {
    setCurrentAddedTags(currentAddedTags.filter((t) => t.id !== tag.id));
  };

  const handleSave = () => {
    setIsSaving(true);
    try {
      handleSelect(currentAddedTags); // Isso atualiza o estado no componente pai
      onClose();
    } catch (error) {
      console.error("Erro ao salvar tags:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
      if (e.type === 'keypress' && e.key !== 'Enter') return;
    }
    // A busca já é feita automaticamente pelo useEffect
  };

  return (
    <div style={style.container}>
      <div style={style.containerModal}>
        <span onClick={onClose} style={style.closeBtn}>
          ×
        </span>

        <span style={style.title}>Filtre pelas tags</span>

        <div style={style.searchBoxContainer}>
          <span style={style.searchBarTitle}>Pesquise</span>
          <div style={style.searchBox}>
            <input 
              placeholder="Nome da tag" 
              style={style.searchInput} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              style={style.searchButton}
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>

        <span style={style.areaTitle}>Tags Disponíveis</span>
        <div style={style.tagUnselecteds}>
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <div 
                key={tag.id} 
                style={style.tag}
                onClick={() => handleAddTag(tag)}
              >
                <span style={style.tagText}>{tag.name}</span>
              </div>
            ))
          ) : (
            <div style={style.noTagsMessage}>
              {searchTerm ? "Nenhuma tag encontrada" : "Nenhuma tag disponível"}
            </div>
          )}
        </div>

        <span style={style.areaTitle}>Tags Selecionadas</span>
        <div style={style.tagUnselecteds}>
          {currentAddedTags.length > 0 ? (
            currentAddedTags.map((tag) => (
              <div 
                key={tag.id} 
                style={style.tag}
                onClick={() => handleRemoveTag(tag)}
              >
                <span style={style.tagText}>{tag.name}</span>
              </div>
            ))
          ) : (
            <div style={style.noTagsMessage}>Nenhuma tag selecionada</div>
          )}
        </div>

        <button 
          style={style.saveButton}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}