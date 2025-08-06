import React from "react";
import { BsCheck2All } from "react-icons/bs";

export default function ShotModel({ data }) {
  if (!data || !data.shot) {
    return null;
  }

  return (
    <div style={style.phoneScreen}>
      <div style={style.bubble}>
        <div style={style.tail}></div>

        {data.headerText && (
          <header style={style.header}>{data.headerText}</header>
        )}

        <main style={style.body}>{data.bodyText}</main>

        {data.shot.footer && data.shot.footer.text && (
          <footer style={style.footer}>{data.shot.footer.text}</footer>
        )}
        
        <div style={style.timestamp}>
          <span>10:30</span>
          <BsCheck2All style={style.checkmarks} size={16} />
        </div>
      </div>
    </div>
  );
}

const style = {
  phoneScreen: {
    width: "100%",
    display: "flex",
    padding: "30px 20px",
    background: "#E5DDD5",
    // backgroundImage: "url('https://i.imgur.com/Qu1hO2k.png')",
    borderRadius: "8px",
  },
  bubble: {
    position: "relative",
    alignSelf: "flex-start",
    background: "#FFFFFF",
    padding: "8px 12px",
    paddingBottom: "25px",
    borderRadius: "12px",
    maxWidth: "100%",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
  },
  tail: {
    position: 'absolute',
    left: '-4px',
    top: '3px',
    width: '20px',
    height: '20px',
    transform: "rotate(-20deg)",
    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 50%, transparent 50%, transparent 100%)',
  },
  header: {
    fontWeight: "bold",
    fontSize: '15px',
    color: "#3B4A54",
    marginBottom: "4px",
    wordWrap: "break-word",
    textAlign: "start"
  },
  body: {
    fontSize: '14.5px',
    color: "#111B21",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "start"
  },
  footer: {
    marginTop: "8px",
    fontSize: '13px',
    color: "rgba(0, 0, 0, 0.5)",
    wordWrap: "break-word",
    textAlign: "start"
  },
  timestamp: {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
    fontSize: '11px',
    color: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  checkmarks: {
    color: '#4FC3F7',
  }
};