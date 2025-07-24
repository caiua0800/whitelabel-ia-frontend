import React, {useState, useContext, useEffect} from "react";
import style from "./TratamentoEspecialStyle";
import { LoadingContext } from "../../../../../Context/LoadingContext";
import { ChatContext } from "../../../../../Context/ChatContext";
import axios from "axios";

export default function TratamentoEspecial({ onClose, id }) {
  const [text, setText] = useState("");
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { activeChat } = useContext(ChatContext);

  useEffect(() => {
    if(activeChat && activeChat.customPrompt)
        setText(activeChat.customPrompt)
  }, [activeChat])

  const handleSave = async () => {
    startLoading();
    try {
      var res = await axios.put(
        `${process.env.REACT_APP_BASE_ROUTE}chat/custom-prompt`,
        {
          id,
          text,
        }
      );

      if (res.status === 200) {
        alert("Tratamento Salvo com Sucesso.");
      } else {
        alert("Erro ao salvar.");
      }
      console.log(res);
      onClose();
      stopLoading();
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar.");
      onClose();
      stopLoading();
    }
    stopLoading();
  };

  return (
    <>
      <div style={style.containerT}>
        <div style={style.modalContainerT}>
          <div style={style.modalT}>
            <span
              onClick={onClose}
              className="close-btn"
              style={style.closeButtonModalT}
            >
              x
            </span>
            <span style={style.modalTTitle}>Informe o Tratamento</span>
            <span style={style.modalTSubTitle}>
              Ex: Se refira a esse cliente como ...., use pronomes neutros...
            </span>
            <textarea
              maxLength={150}
              style={style.inputText}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="save-btn"
              style={style.confirmBtn}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
