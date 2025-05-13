import React, { useState, useEffect, useContext } from "react";
import style from "./OpcoesModalStyle";
import "./effect.css"
import axios from "axios";
import { LoadingContext } from "../../../../Context/LoadingContext";
import { ChatContext } from "../../../../Context/ChatContext";


export default function OpcoesModal({ onClose }) {

    const [tratamentoEspecial, setTratamentoEspecial] = useState(false);
    const { activeChat } = useContext(ChatContext);

    return (
        <>
            <div style={style.container}>
                <div style={style.modalContainer}>
                    <div style={style.modal}>
                        <span onClick={onClose} className="close-btn" style={style.closeButtonModal}>X</span>
                        <button onClick={() => setTratamentoEspecial(true)} className="button" style={style.modalButton}>Tratamento especial 🌟</button>
                        <button className="button" style={style.modalButton}>Opção Indefinida</button>
                    </div>
                </div>
            </div>
            {tratamentoEspecial && (
                <TratamentoEspecial id={activeChat.id} onClose={() => setTratamentoEspecial(false)} />
            )}
        </>
    )
}

function TratamentoEspecial({ onClose, id }) {

    const [text, setText] = useState("");
    const { startLoading, stopLoading } = useContext(LoadingContext);

    const handleSave = async () => {
        startLoading();
        try {
            var res = await axios.put(`${process.env.REACT_APP_BASE_ROUTE}chat/custom-prompt`, {
                id,
                text
            })

            if (res.status === 200) {
                alert("Tratamento Salvo com Sucesso.");
            } else {
                alert("Erro ao salvar.");
            }
            console.log(res)
            onClose();
            stopLoading()
        } catch (error) {
            console.log(error)
            alert("Erro ao salvar.");
            onClose();
            stopLoading();
        }
        stopLoading();
    }

    return (
        <>
            <div style={style.containerT}>
                <div style={style.modalContainer}>
                    <div style={style.modalT}>
                        <span onClick={onClose} className="close-btn" style={style.closeButtonModalT}>x</span>
                        <span style={style.modalTTitle}>Informe o Tratamento</span>
                        <textarea maxLength={150} style={style.inputText} value={text} onChange={(e) => setText(e.target.value)} />
                        <button onClick={handleSave} className="save-btn" style={style.confirmBtn}>Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}