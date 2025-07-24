import React from "react";

export default function Model2({ handleSelect, selectedModel, text }) {
  const thisModel = "model2";

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
            <span>
              <strong>
                Olá, vi que você se interessou pelos nossos produtos.
              </strong>
            </span>
          </div>
          <div style={style.body}>
            <span style={{ textAlign: "start" }}>
              Deixa eu te apresentar um pouco melhor a nossa empresa. Nossa
              empresa, Golden Brasil S/A, empresa que atua desde 2019 com
              minérios e pedras preciosas, um dos mercados mais lucrativos e
              seguros da economia real. Vi que você clicou em um de nossos
              anúncios nas redes sociais sobre como lucrar com minérios e pedras
              preciosas, e vim te explicar como isso funciona na prática. Quero
              te mostrar uma forma estratégica de lucrar nesse setor, mesmo sem
              precisar atuar diretamente nele: 💎 Você pode investir em frações
              de minérios por meio de Contratos Digitais de Minérios com a
              Golden Brasil. Como funciona: Nós negociamos minérios e pedras
              preciosas com alta margem de 30% ao mês e repassamos parte dos
              lucros para nossos clientes. 📈 Você recebe 50% ao ano durante 3
              anos, com contrato formal, garantia jurídica e lastro em ativos
              reais. ➡️ É uma renda passiva, segura e blindada contra crises
              econômicas. Quer ver as projeções reais de ganhos e entender como
              isso pode funcionar pra você?
            </span>
          </div>
        </div>
        {text && (
          <>
            <button
              onClick={() => handleSelect(thisModel)}
              style={style.selectModelButton}
            >
              {handleSelectedModelButton()}
            </button>
          </>
        )}
      </div>
    </>
  );
}

const style = {
  modelBox: {
    display: "flex",
    maxWidth: 500,
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
