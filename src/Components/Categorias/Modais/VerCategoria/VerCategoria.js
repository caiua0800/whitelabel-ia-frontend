import React, { useState, useContext } from "react";
import style from "./VerCategoriaStyle";
import { AuthContext } from "../../../../Context/AuthContext";
import { editCategory, deleteTag } from "../../../../Services/dbservice";
import { FiX, FiTrash2, FiEdit, FiSave, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { LoadingContext } from "../../../../Context/LoadingContext";

export default function VerCategoria({ onClose, category }) {
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryDescription, setCategoryDescription] = useState(
    category.description || ""
  );
  const { credentials } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("O nome da categoria não pode ser vazio.");
      return;
    }
    const newCategory = {
      ...category,
      name: categoryName,
      description: categoryDescription,
    };
    try {
      startLoading()
      await editCategory(newCategory, credentials.accessToken);
      toast.success("Categoria atualizada com sucesso.");
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar categoria.");
    } finally{
      stopLoading()
    }
  };

  const handleDeleteCategory = async () => {
    toast(
      (t) => (
        <div>
          <p>
            Tem certeza que quer excluir <b>{category.name}</b>?
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={style.toastButtonConfirm}
              onClick={() => {
                deleteConfirmed();
                toast.dismiss(t.id);
              }}
            >
              Sim, excluir
            </button>
            <button
              style={style.toastButtonCancel}
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const deleteConfirmed = async () => {
    try {
      startLoading()
      await deleteTag(category.id, credentials.accessToken);
      toast.success("Categoria excluída com sucesso.");
      onClose();
    } catch (error) {
      toast.error("Erro ao excluir categoria.");
    } finally{
      stopLoading()
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.modalTitle}>
            {editMode ? "Editar Categoria" : "Detalhes da Categoria"}
          </h2>
          <button onClick={onClose} style={style.closeButton}>
            <FiX size={20} />
          </button>
        </div>
        <form onSubmit={handleEditCategory} style={style.form}>
          <div style={style.inputGroup}>
            <label style={style.label}>Nome da Categoria</label>
            <input
              disabled={!editMode}
              maxLength={30}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={style.input}
            />
          </div>
          <div style={style.inputGroup}>
            <label style={style.label}>Descrição</label>
            <textarea
              disabled={!editMode}
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              style={{ ...style.input, ...style.textarea }}
            />
          </div>

          <div style={style.buttonArea}>
            <button
              type="button"
              onClick={handleDeleteCategory}
              style={{ ...style.actionButton, ...style.deleteButton }}
            >
              <FiTrash2 style={{ marginRight: "8px" }} /> Excluir
            </button>
            {editMode ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  style={{ ...style.actionButton, ...style.cancelButton }}
                >
                  <FiXCircle style={{ marginRight: "8px" }} /> Cancelar
                </button>
                <button
                  type="submit"
                  style={{ ...style.actionButton, ...style.saveButton }}
                >
                  <FiSave style={{ marginRight: "8px" }} /> Salvar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                style={{ ...style.actionButton, ...style.editButton }}
              >
                <FiEdit style={{ marginRight: "8px" }} /> Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
