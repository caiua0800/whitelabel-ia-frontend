import React, { useState, useEffect, useContext } from "react";
import style from "./VerTagStyle";
import "./effect.css";
import { AuthContext } from "../../../../Context/AuthContext";
import { deleteTag, editTag } from "../../../../Services/dbservice";

export default function VerTag({ onClose, tag }) {
  const [editMode, setEditMode] = useState(false);
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (tag && tag.name && tag.description) {
      setTagName(tag.name);
      setTagDescription(tag.description);
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

  const handleEditTag = async () => {
    if (tagName.trim() === "" || tagDescription.trim() === "")
      return alert("Nenhum campo pode ser vazio.");

    var newTag = {
      id: tag.id,
      dateCreated: tag.dateCreated,
      name: tagName,
      description: tagDescription,
      enterpriseId: tag.enterpriseId,
    };

    try {
      var response = await editTag(newTag, credentials.accessToken);

      console.log(response);
      if (response) {
        alert("Tag atualizada com sucesso.");
        onClose();
        return;
      } else {
        alert("Erro ao atualizar tag.");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar tag.");
    }
  };

  const handleDeleteTag = async () => {
    const isConfirmed = window.confirm(
      "Tem certeza que deseja excluir esta tag? Esta ação não pode ser desfeita."
    );
  
    if (isConfirmed) {
      try {
        var response = await deleteTag(tag.id, credentials.accessToken);
        console.log(response)
        if (response) {
          alert("Tag excluída com sucesso.");
          onClose();
        } else {
          alert("Erro ao excluir tag.");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao excluir tag.");
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
            <span style={style.title}>Sua Tag</span>

            <div style={style.tagNameArea}>
              <img
                className="tag-image"
                style={style.tagImage}
                src="./icons/tag-icon2.png"
                alt="Ícone de Tag"
              />
              <input
                disabled={!editMode}
                maxLength={14}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Digite aqui"
                style={style.tagNameInput}
              />
            </div>

            <div style={style.tagDescriptionArea}>
              <span style={style.tagDescriptionAreaTitle}>Descreva a tag</span>
              <textarea
                disabled={!editMode}
                value={tagDescription}
                onChange={(e) => setTagDescription(e.target.value)}
                style={style.descriptionTextarea}
                placeholder="Descreva sua tag aqui..."
              />
            </div>

            <div style={style.buttonArea}>
              <button
                className="btn"
                onClick={handleTagEditCancelClick}
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
                    onClick={handleDeleteTag}
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
                    onClick={handleEditTag}
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
