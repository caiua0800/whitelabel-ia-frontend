import React, { useState, useEffect, useContext } from "react";
import style from "./GerenciarTagsStyle";
import "./effect.css";
import { ChatContext } from "../../../../../Context/ChatContext";
import { AuthContext } from "../../../../../Context/AuthContext";
import { obterTags, saveTagsToTheChat } from "../../../../../Services/dbservice";

export default function GerenciarTags({ onClose }) {
  const { activeChat, getChats, handleUpdateActiveTagsChat } = useContext(ChatContext);
  const { credentials } = useContext(AuthContext);

  const [allTags, setAllTags] = useState([]);
  const [initialAddedTags, setInitialAddedTags] = useState([]); // Agora armazena objetos de tag
  const [currentAddedTags, setCurrentAddedTags] = useState([]); // Agora armazena objetos de tag
  const [availableTags, setAvailableTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log(activeChat)
    const loadInitialData = async () => {
      if (!activeChat?.id) return;

      try {
        const fetchedTags = await obterTags(credentials.accessToken);
        if (fetchedTags) {
          setAllTags(fetchedTags);
          
          const chatTagIds = activeChat.tags || [];
          const chatTags = fetchedTags.filter(tag => 
            chatTagIds.includes(tag.id)
          );
          
          setInitialAddedTags(chatTags);
          setCurrentAddedTags(chatTags);
        } else {
          console.log("Erro ao obter tags: a resposta foi nula.");
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
      // Extrai apenas os IDs para enviar ao backend
      const tagIdsToSave = currentAddedTags.map(tag => tag.id);
      
      await saveTagsToTheChat(tagIdsToSave, activeChat.id, credentials.accessToken);
      
      // Atualiza o chat ativo com os objetos de tag completos
      const updatedActiveChat = {
        ...activeChat,
        tags: tagIdsToSave // O backend espera apenas os IDs
      };
      
      // Chama a função para atualizar o contexto
      handleUpdateActiveTagsChat(tagIdsToSave);
      
      // Atualiza a lista de chats
      await getChats("", 1, 5, credentials.accessToken, "desc", null, null, null);
      
      alert("Tags atualizadas com sucesso!");
      onClose();
    } catch (error) {
      console.log("Erro ao atualizar tags:", error);
      alert("Ocorreu um erro ao atualizar as tags. Verifique o console.");
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
    <>
      <div style={style.container}>
        <div style={style.modalContainer}>
          <div style={style.modal}>
            <span style={style.modalTitle}>Adicione ou remova tags ao chat</span>

            <div style={style.tagSearchArea}>
              <div style={style.inputArea}>
                <input
                  style={style.inputSearch}
                  placeholder="Pesquise pelo nome da tag"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <span style={style.resultTitle}>Tags disponíveis</span>
              <div style={style.resultOfSearch}>
                {availableTags.map((tag) => (
                  <div
                    onClick={() => handleAddTag(tag)}
                    className="tag"
                    key={tag.id}
                    style={style.tag}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
            <span style={style.resultTitle}>Tags adicionadas</span>

            <div style={style.addedTags}>
              {currentAddedTags.map((tag) => (
                <div
                  onClick={() => handleRemoveTag(tag.id)}
                  className="tag"
                  key={tag.id}
                  style={style.tag}
                >
                  {tag.name}
                </div>
              ))}
            </div>

            <div style={style.buttons}>
              <button onClick={onClose} style={style.button}>
                Cancelar
              </button>
              <button onClick={handleSaveTags} style={style.button} disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}