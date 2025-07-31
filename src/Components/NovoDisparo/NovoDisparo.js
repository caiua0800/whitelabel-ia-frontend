import React, { useState, useEffect, useContext } from "react";
import style from "./NovoDisparoStyle";
import { useNavigate } from "react-router-dom";
import { criarShot, obterModelos } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import Model from "./Models/Model";

export default function NovoDisparo() {
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [variableValues, setVariableValues] = useState({});
  const [foundVariables, setFoundVariables] = useState([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { credentials } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBack = () => {
    navigate("/disparos");
  };

  const getModels = async () => {
    try {
      setLoading(true);
      const response = await obterModelos(credentials.accessToken);
      if (response) {
        setModels(response);
      }
    } catch (error) {
      console.log("Erro ao obter modelos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (models.length === 0) getModels();
  }, []);

  const extractVariables = (text, location) => {
    if (!text) return [];
    const regex = /{{\s*(\d+)\s*}}/g;
    const matches = text.match(regex) || [];
    const uniqueNumbers = [
      ...new Set(matches.map((v) => v.replace(/{{\s*|\s*}}/g, ""))),
    ];

    return uniqueNumbers.map((number) => ({
      key: `${location}-${number}`,
      number: number,
      location: location,
    }));
  };

  const handleSelectModel = (model) => {
    setSelectedModelId(model.id);
    setName(""); // Reseta o nome ao trocar de modelo

    const headerVars = extractVariables(model.header?.text, "header");
    const bodyVars = extractVariables(model.body?.text, "body");

    const allVariables = [...headerVars, ...bodyVars];
    allVariables.sort((a, b) => {
      if (a.location < b.location) return -1;
      if (a.location > b.location) return 1;
      return a.number - b.number;
    });

    setFoundVariables(allVariables);
    setVariableValues({});
  };

  const handleVariableChange = (key, value) => {
    setVariableValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const createNewShot = async () => {
    if (!name.trim() || !selectedModelId) {
      alert("Por favor, nomeie o disparo e selecione um modelo.");
      return;
    }

    const selectedModel = models.find(m => m.id === selectedModelId);
    if (!selectedModel) {
        alert("Erro: Modelo selecionado não foi encontrado.");
        return;
    }
    
    const headerParams = [];
    const bodyParams = [];

    for (const key in variableValues) {
      const value = variableValues[key];
      const [location, numberStr] = key.split('-');
      
      const param = {
        key: parseInt(numberStr, 10), 
        text: value,
      };

      if (location === 'header') {
        headerParams.push(param);
      } else if (location === 'body') {
        bodyParams.push(param);
      }
    }

    const payload = {
      name: name.trim(),
      messageModelId: selectedModelId,
      header: {
        text: selectedModel.header?.text || "",
        params: headerParams,
      },
      body: {
        text: selectedModel.body?.text || "",
        params: bodyParams,
      },
    };

    console.log(payload)

    try {
      const response = await criarShot(credentials?.accessToken, payload);

      if (response) {
        alert("Modelo de Disparo criado com sucesso.");
        getBack();
      } else {
        alert("Erro ao criar Modelo de Disparo. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      alert("Erro ao criar modelo de disparo.");
      console.log("Erro na chamada da API:", error);
      console.log("Payload enviado:", payload); // Log para depuração
    }
  };

  return (
    <>
      <div style={style.container}>
        <span style={style.title}>Crie um novo disparo</span>
        <div onClick={getBack} style={style.backButton}>
          <img
            style={style.backButtonImage}
            src="./icons/left-arrow-icon.svg"
            alt="Voltar"
          />
          <span style={style.backButtonText}>Voltar</span>
        </div>
        <div style={style.selectModelContainer}>
          <span style={style.selectModelContainerTitle}>
            Escolha um modelo para configurar
          </span>

          <div style={style.content}>
            <div style={style.modelsContainer}>
              <div style={style.modelsContainerTitleBox}>
                <span style={style.modelsContainerTitleBoxText}>
                  Modelos disponíveis (clique para selecionar)
                </span>
              </div>
              {loading ? (
                <div>Carregando modelos...</div>
              ) : (
                <div style={style.avaliableModels}>
                  {models &&
                    models.map((model) => (
                      <Model
                        key={model.id}
                        data={model}
                        selectedId={selectedModelId}
                        handleSelectModel={() => handleSelectModel(model)}
                        variableValues={variableValues}
                      />
                    ))}
                </div>
              )}
            </div>
            <div style={style.preencher}>
              <div style={style.preencherContent}>
                {selectedModelId ? (
                  <>
                    <div style={style.variableInputContainer}>
                      <label style={style.variableLabel}>
                        Nomeie o modelo de disparo
                      </label>
                      <textarea
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        style={style.variableTextarea}
                        rows={1}
                      />
                    </div>
                    {foundVariables.length > 0 && (
                       <span style={style.preencherTitle}>
                        Preencha as variáveis
                      </span>
                    )}
                    {foundVariables.map((variable) => (
                      <div
                        key={variable.key}
                        style={style.variableInputContainer}
                      >
                        <label style={style.variableLabel}>
                          Variável {"{{"}
                          {variable.number}
                          {"}}"} no {variable.location}
                        </label>
                        <textarea
                          style={style.variableTextarea}
                          value={variableValues[variable.key] || ""}
                          onChange={(e) =>
                            handleVariableChange(variable.key, e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                    ))}
                    
                    {foundVariables.length === 0 && (
                      <div style={style.placeholderPreencher}>
                         <span>
                            Este modelo não contém parâmetros para preencher.
                          </span>
                      </div>
                    )}

                    <button onClick={createNewShot} style={style.createModel}>
                      Criar Modelo De Disparo
                    </button>
                  </>
                ) : (
                  <div style={style.placeholderPreencher}>
                    <span>
                      Selecione um modelo à esquerda para configurar.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}