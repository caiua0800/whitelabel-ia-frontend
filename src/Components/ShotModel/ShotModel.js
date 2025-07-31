import React from "react";

export default function ShotModel({ data }) {
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
        style={style.model}
      >
        <div style={style.header}>
          <span>{data.headerText}</span>
        </div>
        <div style={style.body}>
          {formatTextWithLineBreaks(data.bodyText)}
        </div>
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
    margin: 20
  },
  model: {
    boxSizing: "border-box",
    padding: "20px 30px",
    width: "100%",
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
