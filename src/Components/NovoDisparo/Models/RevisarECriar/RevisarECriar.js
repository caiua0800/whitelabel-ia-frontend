import React from "react";
import style from "./RevisarECriarStyle";
import { FiX, FiCheck } from "react-icons/fi";

export default function RevisarECriar({
  headerText,
  bodyText,
  rodapeText,
  onClose,
  onConfirm,
  isLoading,
}) {

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={handleModalClick}>
        <div style={style.modalHeader}>
            <h3 style={style.modalTitle}>Pré-visualização do Modelo</h3>
            <button onClick={onClose} style={style.closeButton}><FiX size={20} /></button>
        </div>
        
        <div style={style.phoneScreen}>
          <div style={style.bubble}>
            <div style={style.tail}></div>

            {headerText && <header style={style.header}>{headerText}</header>}
            <main style={style.body}>{bodyText}</main>
            {rodapeText && <footer style={style.rodape}>{rodapeText}</footer>}
          </div>
        </div>

        <div style={style.modalActions}>
            <button style={style.cancelButton} onClick={onClose} disabled={isLoading}>
                Cancelar
            </button>
            <button style={style.confirmButton} onClick={onConfirm} disabled={isLoading}>
                <FiCheck style={{ marginRight: '8px' }} />
                {isLoading ? "Criando..." : "Confirmar e Criar"}
            </button>
        </div>
      </div>
    </div>
  );
}