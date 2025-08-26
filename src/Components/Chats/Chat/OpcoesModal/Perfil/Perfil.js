import React, { useContext } from "react";
import style from "./PerfilStyle";
import { ChatContext } from "../../../../../Context/ChatContext";
import func from "../../../../../Services/fotmatters";
import { FiX, FiUser, FiPhone, FiMapPin, FiHome, FiBox, FiFlag } from "react-icons/fi";

export default function Perfil({ onClose }) {
  const { activeChat } = useContext(ChatContext);

  const InfoField = ({ icon, label, value }) => (
    <div style={style.infoField}>
      <div style={style.infoIcon}>{icon}</div>
      <div>
        <span style={style.infoLabel}>{label}</span>
        <span style={style.infoValue}>{value || "Não informado"}</span>
      </div>
    </div>
  );

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.title}>Perfil do Contato</h2>
            <button onClick={onClose} style={style.closeButton}><FiX size={20}/></button>
        </div>
        <div style={style.modalBody}>
            <div style={style.profileHeader}>
                <div style={style.profilePictureCircle}>
                    <img src="./icons/user-icon2.png" style={style.profilePicture} alt="Avatar"/>
                </div>
                <div style={style.profileNameContainer}>
                    <span style={style.profileName}>{activeChat.clientName || "Sem Nome"}</span>
                    <span style={style.profileContact}>{func.formatarContato(func.getChatId(activeChat?.id))}</span>
                </div>
            </div>

            <div style={style.infoGrid}>
                <InfoField icon={<FiUser/>} label="Nome Completo" value={activeChat.clientName} />
                <InfoField icon={<FiPhone/>} label="Contato" value={func.formatarContato(func.getChatId(activeChat?.id))} />
                <InfoField icon={<FiMapPin/>} label="CEP" value={activeChat.zipcode} />
                <InfoField icon={<FiHome/>} label="Endereço" value={`${activeChat.street || ''}, ${activeChat.number || ''}`} />
                <InfoField icon={<FiBox/>} label="Bairro" value={activeChat.neighborhood} />
                <InfoField icon={<FiFlag/>} label="Cidade / Estado" value={`${activeChat.city || ''} - ${activeChat.state || ''}`} />
            </div>
        </div>
      </div>
    </div>
  );
}