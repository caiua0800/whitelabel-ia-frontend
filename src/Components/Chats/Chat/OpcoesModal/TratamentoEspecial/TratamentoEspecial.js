import React, {useState, useContext, useEffect} from "react";
import style from "./TratamentoEspecialStyle";
import { LoadingContext } from "../../../../../Context/LoadingContext";
import { ChatContext } from "../../../../../Context/ChatContext";
import axios from "axios";
import { AuthContext } from "../../../../../Context/AuthContext";
import { FiX } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function TratamentoEspecial({ onClose, id }) {
  const [text, setText] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { activeChat } = useContext(ChatContext);
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if(activeChat?.customPrompt) {
        setText(activeChat.customPrompt);
    }
  }, [activeChat]);

  const handleSave = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/custom-prompt`,
        { id, text },
        { headers: { Authorization: credentials.accessToken } }
      );
      if (res.status === 200) {
        toast.success("Tratamento especial salvo com sucesso.");
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao salvar tratamento.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.title}>Tratamento Especial (IA)</h2>
            <button onClick={onClose} style={style.closeButton}><FiX size={20}/></button>
        </div>
        <form onSubmit={handleSave} style={style.form}>
            <div style={style.inputGroup}>
                <label style={style.label}>Instruções para a IA</label>
                <textarea
                  maxLength={250}
                  style={{...style.input, ...style.textarea}}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ex: Refira-se a este cliente como 'Doutor(a)'. Use um tom formal..."
                />
            </div>
            <div style={style.buttonArea}>
                <button type="button" onClick={onClose} style={{...style.actionButton, ...style.cancelButton}}>Cancelar</button>
                <button type="submit" style={{...style.actionButton, ...style.saveButton}}>Salvar</button>
            </div>
        </form>
      </div>
    </div>
  );
}