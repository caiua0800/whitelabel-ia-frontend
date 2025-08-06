import React, { useState, useEffect, useContext } from "react";
import style from "./VerTagStyle";
import { AuthContext } from "../../../../Context/AuthContext";
import { deleteTag, editTag } from "../../../../Services/dbservice";
import { FiX, FiTrash2, FiEdit, FiSave, FiXCircle } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function VerTag({ onClose, tag }) {
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (tag) {
      setTagName(tag.name || "");
      setTagDescription(tag.description || "");
    }
  }, [tag]);

  const handleTagEditCancelClick = () => {
    if (editMode) {
      setEditMode(false);
      setTagDescription(tag.description);
      setTagName(tag.name);
    } else {
      setEditMode(true);
    }
  };

  const handleEditTag = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      toast.error("O nome da tag não pode ser vazio.");
      return;
    }

    const newTag = { ...tag, name: tagName, description: tagDescription };
    try {
      await editTag(newTag, credentials.accessToken);
      toast.success("Tag atualizada com sucesso.");
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar tag.");
    }
  };

  const handleDeleteTag = async () => {
    toast((t) => (
      <div>
        <p>Tem certeza que quer excluir <b>{tag.name}</b>?</p>
        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <button style={style.toastButtonConfirm} onClick={() => {
              deleteConfirmed();
              toast.dismiss(t.id);
          }}>
            Sim, excluir
          </button>
          <button style={style.toastButtonCancel} onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };
  
  const deleteConfirmed = async () => {
     try {
        const response = await deleteTag(tag.id, credentials.accessToken);
        if (response) {
          toast.success("Tag excluída com sucesso.");
          onClose();
        } else {
          toast.error("Erro ao excluir tag.");
        }
      } catch (error) {
        toast.error("Erro ao excluir tag.");
      }
  }

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.modalTitle}>{editMode ? "Editar Tag" : "Detalhes da Tag"}</h2>
          <button onClick={onClose} style={style.closeButton}><FiX size={20} /></button>
        </div>
        <form onSubmit={handleEditTag} style={style.form}>
          <div style={style.inputGroup}>
            <label style={style.label}>Nome da Tag</label>
            <input
              disabled={!editMode}
              maxLength={30}
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              style={style.input}
            />
          </div>
          <div style={style.inputGroup}>
            <label style={style.label}>Descrição</label>
            <textarea
              disabled={!editMode}
              value={tagDescription}
              onChange={(e) => setTagDescription(e.target.value)}
              style={{...style.input, ...style.textarea}}
            />
          </div>

          <div style={style.buttonArea}>
            <button type="button" onClick={handleDeleteTag} style={{...style.actionButton, ...style.deleteButton}}>
              <FiTrash2 style={{marginRight: '8px'}}/> Excluir
            </button>
            {editMode ? (
              <>
                <button type="button" onClick={handleTagEditCancelClick} style={{...style.actionButton, ...style.cancelButton}}>
                  <FiXCircle style={{marginRight: '8px'}}/> Cancelar
                </button>
                <button type="submit" style={{...style.actionButton, ...style.saveButton}}>
                  <FiSave style={{marginRight: '8px'}}/> Salvar
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setEditMode(true)} style={{...style.actionButton, ...style.editButton}}>
                <FiEdit style={{marginRight: '8px'}}/> Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}