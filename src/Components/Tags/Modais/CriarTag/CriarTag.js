import React, { useState, useContext, useEffect } from "react";
import style from "./CriarTagStyle";
import axios from "axios";
import { criarTag } from "../../../../Services/dbservice";
import { AuthContext } from "../../../../Context/AuthContext";

export default function CriarTag({ actualTags, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("descricao");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { credentials } = useContext(AuthContext);

  const handleClose = () => {
    setName("");
    setDescription("");
    setError("");
    onClose();
  };

  const verifyNames = (tagName) => {
    if (!actualTags || !tagName) return true;

    return !actualTags.some(
      (tag) => tag?.name?.trim().toLowerCase() === tagName.trim().toLowerCase()
    );
  };

  const createTag = async () => {
    setError("");
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    // Validações
    if (!trimmedName) {
      setError("O nome da tag é obrigatório");
      return;
    }

    if (!verifyNames(trimmedName)) {
      setError("Já existe uma tag com este nome");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await criarTag(
        { name, description },
        credentials.accessToken
      );

      if (response) {
        console.log(response);
        alert("Tag criado com sucesso.");
      } else {
        console.log("erro ao criar tag");
        alert("erro ao criar tag");
      }

      handleClose();
    } catch (err) {
      console.error("Erro ao criar tag:", err);
      setError("Ocorreu um erro ao criar a tag. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      createTag();
    }
  };

  return (
    <div style={style.container}>
      <div style={style.containerContent}>
        <div style={style.box}>
          <span onClick={handleClose} style={style.close}>
            ×
          </span>
          <span style={style.title}>Criar Nova Tag</span>

          <div style={style.tagNameArea}>
            <input
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              value={name}
              maxLength={14}
              placeholder="Digite aqui"
              style={style.tagNameInput}
              disabled={isSubmitting}
            />
          </div>
          {error && <div style={style.errorMessage}>{error}</div>}

          {/* <div style={style.tagDescriptionArea}>
            <span style={style.tagDescriptionAreaTitle}>Descreva a tag</span>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              maxLength={80}
              style={style.descriptionTextarea}
              placeholder="Descreva sua tag aqui..."
              disabled={isSubmitting}
              onKeyDown={handleKeyDown}
            />
          </div> */}

          <button
            onClick={createTag}
            style={style.createTagButton}
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? "Criando..." : "Criar Tag"}
          </button>
        </div>
      </div>
    </div>
  );
}
