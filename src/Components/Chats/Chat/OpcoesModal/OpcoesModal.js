import React, { useState, useContext } from "react";
import style from "./OpcoesModalStyle";
import "./effect.css";
import { ChatContext } from "../../../../Context/ChatContext";
import TratamentoEspecial from "./TratamentoEspecial/TratamentoEspecial";
import EditarContato from "./EditarContato/EditarContato";
import GerenciarTags from "./GerenciarTags/GerenciarTags";
import { FiX, FiCpu, FiUser, FiTag } from "react-icons/fi";

export default function OpcoesModal({ onClose }) {
  const [tratamentoEspecial, setTratamentoEspecial] = useState(false);
  const [editarContato, setEditarContato] = useState(false);
  const [gerenciarTags, setGerenciarTags] = useState(false);
  const { activeChat } = useContext(ChatContext);

  const OptionItem = ({ icon, text, onClick }) => (
    <div onClick={onClick} className="options-menu-item" style={style.optionsMenuItem}>
      {icon}
      <span style={style.menuItemText}>{text}</span>
    </div>
  );

  return (
    <>
      <div style={style.overlay} onClick={onClose}>
        <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
          <div style={style.modalHeader}>
            <h2 style={style.modalTitle}>Opções do Chat</h2>
            <button onClick={onClose} style={style.closeButton}><FiX size={20}/></button>
          </div>
          <div style={style.optionsMenu}>
            <OptionItem icon={<FiCpu size={20}/>} text="Tratamento Especial (IA)" onClick={() => setTratamentoEspecial(true)} />
            <OptionItem icon={<FiUser size={20}/>} text="Editar Perfil do Cliente" onClick={() => setEditarContato(true)} />
            <OptionItem icon={<FiTag size={20}/>} text="Gerenciar Tags" onClick={() => setGerenciarTags(true)} />
          </div>
        </div>
      </div>
      
      {tratamentoEspecial && <TratamentoEspecial id={activeChat.id} onClose={() => setTratamentoEspecial(false)} />}
      {editarContato && <EditarContato id={activeChat.id} onClose={() => setEditarContato(false)} />}
      {gerenciarTags && <GerenciarTags id={activeChat.id} onClose={() => setGerenciarTags(false)} />}
    </>
  );
}