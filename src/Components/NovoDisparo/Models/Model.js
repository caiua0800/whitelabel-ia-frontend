import React from "react";
import "./effect.css";

export default function Model({
  data,
  handleSelectModel,
  selectedId,
  variableValues,
}) {
  const isSelected = selectedId === data.id;

  const renderText = (text, location) => {
    if (!text || !isSelected) return text;

    let processedText = text;
    for (const key in variableValues) {
      if (key.startsWith(location)) {
        const number = key.split("-")[1];
        const value = variableValues[key];
        const regex = new RegExp(`{{\\s*${number}\\s*}}`, "g");
        processedText = processedText.replace(regex, value);
      }
    }
    return processedText;
  };

  const formatTextWithLineBreaks = (text) => {
    if (!text) return null;
    const sentences = text.split(". ");
    return sentences.map((sentence, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {sentence.trim()}
        {index < sentences.length - 1 && "."}
      </React.Fragment>
    ));
  };

  return (
    <div
      style={{
        ...style.modelBox,
        opacity: 1,
      }}
    >
      <div
        onClick={handleSelectModel}
        className={isSelected ? "model-box-selected" : "model-box"}
        style={style.model}
      >
        <div style={style.header}>
          <span>{renderText(data.header?.text, "header")}</span>
        </div>
        <div style={style.body}>{formatTextWithLineBreaks(renderText(data.body?.text, "body"))}</div>
      </div>
    </div>
  );
}

const style = {
  modelBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  model: {
    boxSizing: "border-box",
    padding: "20px 30px",
    width: "100%",
    cursor: "pointer",
    transition: ".3s",
    background: "white",
    borderRadius: 12,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "pre-line",
  },
  header: {
    display: "flex",
    alignItems: "start",
    fontWeight: "bold",
  },
  body: {
    display: "flex",
    textAlign: "start",
    marginTop: 20,
  },
};
