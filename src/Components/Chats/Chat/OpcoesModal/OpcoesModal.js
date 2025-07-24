import React, { useState, useEffect, useContext } from "react";
import style from "./OpcoesModalStyle";
import "./effect.css";
import axios from "axios";
import { ChatContext } from "../../../../Context/ChatContext";
import TratamentoEspecial from "./TratamentoEspecial/TratamentoEspecial";
import EditarContato from "./EditarContato/EditarContato";
import GerenciarTags from "./GerenciarTags/GerenciarTags";

export default function OpcoesModal({ onClose }) {
  const [tratamentoEspecial, setTratamentoEspecial] = useState(false);
  const [editarContato, setEditarContato] = useState(false);
  const [gerenciarTags, setGerenciarTags] = useState(false);
  const { activeChat } = useContext(ChatContext);

  return (
    <>
      <div style={style.container}>
        <div style={style.modalContainer}>
          <div style={style.modal}>
            <span style={style.modalTitle}>Opções do chat</span>
            <span
              onClick={onClose}
              className="close-btn"
              style={style.closeButtonModal}
            >
              X
            </span>
            <div style={style.optionsMenu}>
              <div
                onClick={() => setTratamentoEspecial(true)}
                className="options-menu-item"
                style={style.optionsMenuItem}
              >
                <img style={style.addIcon} src="/icons/arrow-left-icon.svg" />
                <span style={style.menuItemText}>Tratamento Especial</span>
              </div>
              <div
                onClick={() => setEditarContato(true)}
                className="options-menu-item"
                style={style.optionsMenuItem}
              >
                <img style={style.addIcon} src="/icons/arrow-left-icon.svg" />
                <span style={style.menuItemText}>Cadastrar Cliente</span>
              </div>
              <div
                onClick={() => setGerenciarTags(true)}
                className="options-menu-item"
                style={style.optionsMenuItem}
              >
                <img style={style.addIcon} src="/icons/arrow-left-icon.svg" />
                <span style={style.menuItemText}>Gerenciar tags</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {tratamentoEspecial && (
        <TratamentoEspecial
          id={activeChat.id}
          onClose={() => setTratamentoEspecial(false)}
        />
      )}
      {editarContato && (
        <EditarContato
          id={activeChat.id}
          onClose={() => setEditarContato(false)}
        />
      )}

      {gerenciarTags && (
        <>
          <GerenciarTags
            id={activeChat.id}
            onClose={() => setGerenciarTags(false)}
          />
        </>
      )}
    </>
  );
}
