import React, { useState, useEffect, useContext } from "react";
import style from "./NovoDisparoStyle";
import { useNavigate } from "react-router-dom";
import Model1 from "./Models/Model1";
import Model2 from "./Models/Model2";
import { criarShot, obterShots } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";

export default function NovoDisparo() {
  const [selectedModel, setSelectedModel] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [texto, setTexto] = useState("");
  const [createdShots, setCreatedShots] = useState("");
  const { credentials } = useContext(AuthContext);

  const getBack = () => {
    navigate("/disparos");
  };

  const createNewShot = async () => {
    try {
      const response = await criarShot(credentials && credentials.accessToken, {
        name,
        description,
        modelName: "padrao",
        shotFields: [{ name: "text", value: texto }],
      });

      if (response) {
        alert("Modelo de Disparo criado com sucesso.");
        getBack();
      } else {
        alert("Erro ao criar Modelo de Disparo.");
      }
    } catch (error) {
      alert("Erro ao criar modelo de disparo.");
      console.log(error);
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
          />
          <span style={style.backButtonText}>Voltar</span>
        </div>
        <div style={style.selectModelContainer}>
          <span style={style.selectModelContainerTitle}>Escolha um modelo</span>

          <div style={style.models}>
            <Model1
              selectedModel={selectedModel}
              handleSelect={setSelectedModel}
            />
            {/* <Model2
              text="jsnjjn"
              selectedModel={selectedModel}
              handleSelect={setSelectedModel}
            /> */}
          </div>
        </div>

        {selectedModel && (
          <>
            <div style={style.completeArea}>
              <span style={style.completeAreaTitle}>Complete seu disparo</span>
              <div style={{...style.bigGrid, gridTemplateColumns: selectedModel === "model1" ? "30% 70%" : "100%"}}>
                <div style={style.firstPart}>
                  <div style={style.box}>
                    <span style={style.boxTitle}>Nomeie o disparo: </span>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      style={style.input}
                    />
                  </div>
                  <div style={style.box}>
                    <span style={style.boxTitle}>Descreva o disparo: </span>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      style={style.textarea}
                    />
                  </div>
                </div>

                {selectedModel === "model1" && (
                  <>
                    <div style={style.secondPart}>
                      <div style={style.box}>
                        <span style={style.boxTitle}>Insira o %Texto%: </span>
                        <textarea
                          onChange={(e) => setTexto(e.target.value)}
                          value={texto}
                          style={style.textarea}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <button onClick={createNewShot} style={style.saveBtn}>
                Criar disparo
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
