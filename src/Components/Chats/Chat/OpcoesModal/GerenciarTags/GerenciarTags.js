import React, { useState, useEffect, useContext } from "react";
import style from "./GerenciarTagsStyle";
import "./effect.css";
import { ChatContext } from "../../../../../Context/ChatContext";
import { AuthContext } from "../../../../../Context/AuthContext";
import { obterTags, saveTagsToTheChat } from "../../../../../Services/dbservice";
import { FiX, FiSearch } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function GerenciarTags({ onClose }) {
  const { activeChat, handleUpdateActiveTagsChat } = useContext(ChatContext);
  const { credentials } = useContext(AuthContext);
  const [allTags, setAllTags] = useState([]);
  const [currentAddedTags, setCurrentAddedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      if (!activeChat?.id || !credentials?.accessToken) return;
      try {
        const fetchedTags = await obterTags(credentials.accessToken);
        if (fetchedTags) {
          setAllTags(fetchedTags);
          const chatTagIds = new Set(activeChat.tags || []);
          const chatTags = fetchedTags.filter(tag => chatTagIds.has(tag.id));
          setCurrentAddedTags(chatTags);
        }
      } catch (error) {
        console.log("Erro ao buscar tags:", error);
      }
    };
    loadInitialData();
  }, [activeChat, credentials.accessToken]);

  useEffect(() => {
    const currentAddedIds = new Set(currentAddedTags.map(tag => tag.id));
    const filtered = allTags
      .filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(tag => !currentAddedIds.has(tag.id));
    setAvailableTags(filtered);
  }, [searchTerm, currentAddedTags, allTags]);

  const handleSaveTags = async () => {
    if (isSaving || !activeChat?.id) return;
    setIsSaving(true);
    try {
      const tagIdsToSave = currentAddedTags.map(tag => tag.id);
      await saveTagsToTheChat(tagIdsToSave, activeChat.id, credentials.accessToken);
      handleUpdateActiveTagsChat(tagIdsToSave);
      toast.success("Tags atualizadas com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar as tags.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (tag) => {
    setCurrentAddedTags([...currentAddedTags, tag]);
  };

  const handleRemoveTag = (tagId) => {
    setCurrentAddedTags(currentAddedTags.filter(tag => tag.id !== tagId));
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.modalTitle}>Gerenciar Tags do Contato</h2>
          <button onClick={onClose} style={style.closeButton}><FiX size={20}/></button>
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
                <h3 style={style.areaTitle}>Tags Adicionadas</h3>
                <div style={style.tagsContainer}>
                  {currentAddedTags.length > 0 ? currentAddedTags.map((tag) => (
                    <div key={tag.id} style={{...style.tag, ...style.tagSelected}} onClick={() => handleRemoveTag(tag.id)} className="tag-selected-hover">
                      <span>{tag.name}</span>
                    </div>
                  )) : <div style={style.noTagsMessage}>Nenhuma tag adicionada</div>}
                </div>
            </div>
        </div>
        <div style={style.modalFooter}>
            <button style={style.saveButton} onClick={handleSaveTags} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </button>
        </div>
      </div>
    </div>
  );
}