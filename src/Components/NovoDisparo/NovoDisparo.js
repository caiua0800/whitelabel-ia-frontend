import React, { useState, useContext } from "react";
import style from "./NovoDisparoStyle";
import { useNavigate } from "react-router-dom";
import { criarModelo, criarShot } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import { LoadingContext } from "../../Context/LoadingContext";
import RevisarECriar from "./Models/RevisarECriar/RevisarECriar";

export default function NovoDisparo() {
  const { credentials } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [modelName, setModelName] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [rodapeText, setRodapeText] = useState("");
  const [modalRevisar, setModalRevisar] = useState(false);

  const navigate = useNavigate();

  const getBack = () => {
    navigate("/disparos");
  };

  const handleBodyTextChange = (e) => {
    const value = e.target.value;
    
    // Verifica se há mais de duas quebras de linha seguidas
    if (value.includes("\n\n\n")) {
      return alert("Não é permitido mais de duas quebras de linha seguidas.");
    }
    
    // Limita a 1000 caracteres
    if (value.length > 1000) {
      return alert("O texto do corpo não pode exceder 1000 caracteres.");
    }
    
    setBodyText(value);
  };

  const handleRevisar = () => {
    if (headerText.trim() === "")
      return alert("Preencha os campos obrigatórios.");
    if (bodyText.trim() === "")
      return alert("Preencha os campos obrigatórios.");
    if (headerText.length < 3)
      return alert("O Texto do header não pode ser tão pequeno.");
    if (bodyText.length < 5)
      return alert("O Texto do corpo não pode ser tão pequeno.");
    if (bodyText.includes("\n\n\n"))
      return alert("Não é permitido mais de duas quebras de linha seguidas.");
    if (bodyText.length > 1000)
      return alert("O texto do corpo não pode exceder 1000 caracteres.");

    setModalRevisar(true);
  };

  const formatModelName = (name) => {
    // Remove acentos
    const withoutAccents = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Converte para minúsculas
    const lowerCase = withoutAccents.toLowerCase();
    // Substitui espaços por underscores
    const finalName = lowerCase.replace(/\s+/g, '_');
    return finalName;
  };

  const handleCreate = async () => {
    if (!modelName.trim()) {
      return alert("O nome do modelo não pode estar vazio.");
    }

    try {
      startLoading();

      const formattedModelName = formatModelName(modelName);

      var modelInfo = {
        name: formattedModelName,
        headerText: headerText,
        headerParam: "",
        bodyText: bodyText,
        bodyParams: [],
        footerText: rodapeText
      }
      
      var res = await criarModelo(credentials.accessToken, modelInfo);

      if(res === 201){
        alert("Modelo criado com sucesso.");
        getBack()
      }
    } catch (error) {
      alert("Erro ao criar modelo.");
      console.log("Erro ao criar modelo:", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Crie um novo modelo para disparar</span>
        <div onClick={getBack} style={style.backButton}>
          <img
            style={style.backButtonImage}
            src="./icons/left-arrow-icon.svg"
            alt="Voltar"
          />
          <span style={style.backButtonText}>Voltar</span>
        </div>

        <div style={style.newMethodGrid}>
          <div style={style.newMethodColumn}>
            <div style={style.containerNewMethod}>
              <span style={style.modelNameInputBoxTitle}>Nome do modelo*</span>
              <input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                style={style.modelNameInputBoxInput}
                placeholder="Ex: modelo_de_exemplo"
              />
              <small style={{color: 'gray'}}>O nome será convertido para minúsculas, sem acentos e com espaços substituídos por _</small>
            </div>

            <div style={style.containerNewMethod}>
              <span style={style.modelNameInputBoxTitle}>
                Texto inicial do modelo*
              </span>
              <input
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                style={style.modelNameInputBoxInput}
              />
            </div>

            <div style={style.modelNameTextareaBox}>
              <span style={style.modelNameTextareaBoxTitle}>
                Texto do Rodapé (opicional)
              </span>
              <input
                value={rodapeText}
                onChange={(e) => setRodapeText(e.target.value)}
                placeholder="Ex: Att. Equipe Golden"
                style={style.modelNameTextareaBoxRodape}
              />
            </div>
          </div>

          <div style={style.newMethodColumn}>
            <div style={style.modelNameTextareaBox}>
              <span style={style.modelNameTextareaBoxTitle}>
                Texto do corpo do modelo* (Máx. 1000 caracteres)
              </span>
              <textarea
                value={bodyText}
                onChange={handleBodyTextChange}
                style={style.modelNameTextareaBoxTextarea}
                maxLength={1000}
              />
              <div style={{textAlign: "right", width: "100%", color: bodyText.length > 900 ? "red" : "inherit"}}>
                {bodyText.length}/1000 caracteres
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleRevisar} style={style.seeModel}>
          Revisar Modelo
        </button>

      </div>
      {modalRevisar && (
        <RevisarECriar
          headerText={headerText}
          bodyText={bodyText}
          rodapeText={rodapeText}
          onConfirm={() => {handleCreate(); setModalRevisar(false)}}
          onClose={() => setModalRevisar(false)}
        />
      )}
    </>
  );
}