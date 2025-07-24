import React, { useState, useEffect, useContext } from "react";
import style from "./VerCategoriaStyle";
import "./effect.css";
import { AuthContext } from "../../../../Context/AuthContext";
import { deleteTag, editCategory, editTag } from "../../../../Services/dbservice";

export default function VerCategoria({ onClose, category }) {
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (category && category.name && category.description) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
    }
  }, [category]);

  const handleCategoryEditCancelClick = () => {
    if (editMode) {
      setEditMode(false);
      setCategoryDescription(category.description);
      setCategoryName(category.name);
    } else {
      setEditMode(true);
    }
  };

  const handleEditCategory = async () => {
    if (categoryName.trim() === "" || categoryDescription.trim() === "")
      return alert("Nenhum campo pode ser vazio.");

    var newTag = {
      id: category.id,
      dateCreated: category.dateCreated,
      name: categoryName,
      description: categoryDescription,
      enterpriseId: category.enterpriseId,
    };

    try {
      var response = await editCategory(newTag, credentials.accessToken);

      console.log(response);
      if (response) {
        alert("Categoria atualizada com sucesso.");
        onClose();
        return;
      } else {
        alert("Erro ao atualizar categoria.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar categoria.");
    }
  };

  const handleDeleteCategory = async () => {
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
    );
  
    if (isConfirmed) {
      try {
        var response = await deleteTag(category.id, credentials.accessToken);
        console.log(response)
        if (response) {
          alert("Categoria excluída com sucesso.");
          onClose();
        } else {
          alert("Erro ao excluir categoria.");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao excluir categoria.");
      }
    }
  };


  return (
    <>
      <div style={style.container}>
        <div style={style.containerContent}>
          <div style={style.box}>
            <span onClick={onClose} style={style.close}>
              x
            </span>
            <span style={style.title}>Sua Categoria</span>

            <div style={style.tagNameArea}>
              <input
                disabled={!editMode}
                maxLength={30}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Digite aqui"
                style={style.tagNameInput}
              />
            </div>

            <div style={style.tagDescriptionArea}>
              <span style={style.tagDescriptionAreaTitle}>Descreva a categoria</span>
              <textarea
                disabled={!editMode}
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                style={style.descriptionTextarea}
                placeholder="Descreva sua tag aqui..."
              />
            </div>

            <div style={style.buttonArea}>
              <button
                className="btn"
                onClick={handleCategoryEditCancelClick}
                style={{
                  ...style.button,
                  background: editMode
                    ? "rgba(255, 30, 10, 1)"
                    : "rgba(0, 200, 200, 1)",
                  color: "white",
                }}
              >
                {editMode ? "Cancelar" : "Editar"}
              </button>

              {!editMode && (
                <>
                  <button
                    className="btn"
                    onClick={handleDeleteCategory}
                    style={{
                      ...style.button,
                      background: "rgba(255, 30, 10, 1)",
                      color: "white",
                    }}
                  >
                    Excluir
                  </button>
                </>
              )}
              {editMode && (
                <>
                  <button
                    onClick={handleEditCategory}
                    className="btn"
                    style={{
                      ...style.button,
                      background: "rgba(100, 220, 10, 1)",
                      color: "white",
                    }}
                  >
                    Salvar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
