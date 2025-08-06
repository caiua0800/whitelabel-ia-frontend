import React, { useState, useContext } from "react";
import style from "./CriarTagStyle";
import { criarTag } from "../../../../Services/dbservice";
import { AuthContext } from "../../../../Context/AuthContext";
import { FiX } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function CriarTag({ actualTags, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { credentials } = useContext(AuthContext);

  const verifyNames = (tagName) => {
    if (!actualTags || !tagName) return true;
    return !actualTags.some((tag) => tag?.name?.trim().toLowerCase() === tagName.trim().toLowerCase());
  };

  const createTag = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("O nome da tag é obrigatório.");
      return;
    }
    if (!verifyNames(name.trim())) {
      toast.error("Já existe uma tag com este nome.");
      return;
    }
    setIsSubmitting(true);
    try {
      await criarTag({ name, description }, credentials.accessToken);
      toast.success("Tag criada com sucesso!");
      onClose();
    } catch (err) {
      toast.error("Ocorreu um erro ao criar a tag.");
      console.error("Erro ao criar tag:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.modalTitle}>Criar Nova Tag</h2>
          <button onClick={onClose} style={style.closeButton}><FiX size={20} /></button>
        </div>
        <form onSubmit={createTag} style={style.form}>
          <div style={style.inputGroup}>
            <label style={style.label}>Nome da Tag</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              maxLength={30}
              placeholder="Ex: Cliente VIP"
              style={style.input}
              disabled={isSubmitting}
            />
          </div>
          <div style={style.inputGroup}>
            <label style={style.label}>Descrição (opcional)</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              maxLength={100}
              style={{...style.input, ...style.textarea}}
              placeholder="Descreva para que serve esta tag..."
              disabled={isSubmitting}
            />
          </div>
          <button type="submit" style={style.submitButton} disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? "Criando..." : "Criar Tag"}
          </button>
        </form>
      </div>
    </div>
  );
}