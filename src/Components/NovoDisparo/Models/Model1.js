import React from "react";

export default function Model1({ handleSelect, selectedModel, text }) {
  const thisModel = "model1";

  const handleSelectedModelButton = () => {
    if (selectedModel) {
      return selectedModel === thisModel ? "Selecionado" : "Selecionar";
    }
    return "Selecionar";
  };

  return (
    <>
      <div
        style={{
          ...style.modelBox,
          opacity:
            selectedModel != null ? (selectedModel === thisModel ? 1 : 0.4) : 1,
        }}
      >
        <div style={style.model}>
          <div style={style.header}>
            <span>Olá %nome% 😄, tudo bem?</span>
          </div>
          <div style={style.body}>
            <span>
              Vi que você entrou em contato conosco a um tempinho atrás.
            </span>
            <span>{text ? text : "%Texto%"}</span>
          </div>
          {/* <div style={style.footer}>Att. %nome_da_equipe%.</div> */}
        </div>
        {handleSelect != null && (
          <button
            onClick={() =>
              handleSelect != null ? handleSelect(thisModel) : console.log("")
            }
            style={style.selectModelButton}
          >
            {handleSelectedModelButton()}
          </button>
        )}
      </div>
    </>
  );
}

const style = {
  modelBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    // height: 400,
  },
  model: {
    boxSizing: "border-box",
    padding: "20px 30px",
    background: "white",
    borderRadius: 12,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "start",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginTop: 20,
  },
  footer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "start",
    color: "rgba(0,0,0,0.4)",
  },
  selectModelButton: {
    width: "100%",
    height: 35,
    border: 0,
    cursor: "pointer",
    boxSizing: "border-box",
    borderRadius: 4,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    background: "rgba(100, 220, 0, 1)",
  },
};
