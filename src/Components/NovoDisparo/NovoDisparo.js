import React, { useState, useContext } from "react";
import style from "./NovoDisparoStyle";
import { useNavigate } from "react-router-dom";
import { criarModelo } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import { LoadingContext } from "../../Context/LoadingContext";
import { SystemMessageContext } from "../../Context/SystemMessageContext";
import RevisarECriar from "./Models/RevisarECriar/RevisarECriar";
import { FiArrowLeft, FiEye, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";

export default function NovoDisparo() {
  const { credentials, enterprise } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [modelName, setModelName] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [rodapeText, setRodapeText] = useState("");
  const [modalRevisar, setModalRevisar] = useState(false);
  const { showMessage } = useContext(SystemMessageContext);

  const navigate = useNavigate();

  const getBack = () => navigate("/disparos");

  const handleBodyTextChange = (e) => {
    const value = e.target.value;
    if (value.includes("\n\n\n")) {
      showMessage(
        "Não é permitido mais de duas quebras de linha seguidas.",
        "error"
      );
      return;
    }
    setBodyText(value);
  };

  const containsInvalidChars = (text) => {
    const emojiRegex = /\p{Emoji}/u;
    return emojiRegex.test(text) || text.includes("\n") || text.includes("*");
  };

  const handleRevisar = () => {
    if (!modelName.trim())
      return toast.error("O nome do modelo é obrigatório.");

    if (!headerText.trim()) {
      showMessage("O texto do cabeçalho é obrigatório.", "error");
      return;
    }

    if (containsInvalidChars(headerText)) {
      showMessage(
        "Cabeçalho não pode ter emojis, quebras de linha ou asteriscos.",
        "error"
      );
      return;
    }

    if (!bodyText.trim()) return toast.error("O texto do corpo é obrigatório.");

    setModalRevisar(true);
  };

  const formatModelName = (name) => {
    const withoutAccents = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const lowerCase = withoutAccents.toLowerCase();
    const finalName = lowerCase.replace(/\s+/g, "_");
    return finalName;
  };

  const handleCreate = async () => {
    try {
      startLoading();
      const formattedModelName = formatModelName(modelName);
      const modelInfo = {
        name: formattedModelName,
        headerText: headerText,
        headerParam: "",
        bodyText: bodyText,
        bodyParams: [],
        footerText: rodapeText,
        account_id: enterprise.metaAccountId,
        whatsapp_token: enterprise.whatsappToken
      };

      console.log(enterprise.metaAccountId)
      console.log(modelInfo.whatsappToken)
  
      const res = await criarModelo(credentials.accessToken, modelInfo);

      if (res === 201) {
        toast.success("Modelo enviado para aprovação!");
        showMessage(
          "Modelo enviado para aprovação!",
          "success"
        );

        setTimeout(() => {
          getBack();
        }, 500)
      }
    } catch (error) {
      let errorMessage = "Erro ao criar modelo";

      if (error.response?.data) {
        const { error: apiError, details, type } = error.response.data;

        if (type === "validation") {
          errorMessage = apiError;
        } else {
          errorMessage = `${apiError}${details ? `: ${details}` : ""}`;
        }
      }

      // toast.error(errorMessage);
      showMessage(errorMessage, "error");
    } finally {
      stopLoading();
    }
  };

  const characterCount = bodyText.length;
  const characterLimit = 1024;
  const isNearLimit = characterCount > characterLimit - 100;

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
          <div style={style.headerLeft}>
            <button onClick={getBack} style={style.backButton}>
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 style={style.title}>Criar Novo Modelo de Disparo</h1>
              <p style={style.subtitle}>
                Crie modelos de mensagens para enviar em massa aos seus
                clientes.
              </p>
            </div>
          </div>
          <button onClick={handleRevisar} style={style.reviewButton}>
            <FiEye style={{ marginRight: "8px" }} />
            Revisar e Criar
          </button>
        </div>

        <div style={style.formGrid}>
          <div style={style.formColumn}>
            <div style={style.inputGroup}>
              <label style={style.label}>Nome do Modelo</label>
              <input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                style={style.input}
                placeholder="Ex: promocao_dia_das_maes"
              />
              <small style={style.helperText}>
                Somente letras minúsculas, números e _. Sem espaços.
              </small>
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Texto do Cabeçalho (Header)</label>
              <input
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                style={style.input}
                placeholder="Ex: Promoção especial!"
              />
              <small style={style.helperText}>
                Não use emojis, quebras de linha ou asteriscos no cabeçalho
              </small>
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Texto do Rodapé (Footer)</label>
              <input
                value={rodapeText}
                onChange={(e) => setRodapeText(e.target.value)}
                style={style.input}
                placeholder="Ex: Att, Equipe Golden"
              />
            </div>
          </div>

          <div style={style.formColumn}>
            <div style={style.inputGroup}>
              <label style={style.label}>
                Texto do Corpo (Body)
                <span
                  style={{
                    ...style.charCount,
                    color: isNearLimit ? "#ff5b5b" : "#aeb9c4",
                  }}
                >
                  {characterCount}/{characterLimit}
                </span>
              </label>
              <textarea
                value={bodyText}
                onChange={handleBodyTextChange}
                style={{ ...style.input, ...style.textarea }}
                maxLength={characterLimit}
              />
            </div>
            <div style={style.infoBox}>
              <FiInfo style={{ marginRight: "10px", flexShrink: 0 }} />
              <span>
                Lembre-se: modelos com variáveis (ex: `{1}`), conteúdo
                promocional ou links podem precisar de aprovação da Meta.
              </span>
            </div>
          </div>
        </div>
      </div>
      {modalRevisar && (
        <RevisarECriar
          headerText={headerText}
          bodyText={bodyText}
          rodapeText={rodapeText}
          onConfirm={() => {
            handleCreate();
            setModalRevisar(false);
          }}
          onClose={() => setModalRevisar(false)}
        />
      )}
    </>
  );
}
