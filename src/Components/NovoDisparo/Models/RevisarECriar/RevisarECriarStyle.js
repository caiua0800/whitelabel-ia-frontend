const style = {
  overlay: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 11,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(3px)",
  },
  modalContainer: {
    background: "#FFF",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #EAEAEA",
  },
  modalTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneScreen: {
    background: "#E5DDD5",
    // backgroundImage: "url('https://i.imgur.com/Qu1hO2k.png')",
    padding: "30px 20px",
    display: "flex",
  },
  bubble: {
    position: "relative",
    background: "#DCF8C6",
    padding: "10px 15px",
    borderRadius: "12px",
    maxWidth: "100%",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    alignSelf: "flex-start",
  },
  tail: {
    position: 'absolute',
    left: '-4px',
    top: '3px',
    width: '20px',
    height: '20px',
    transform: "rotate(-20deg)",
    background: 'linear-gradient(135deg, #DCF8C6 0%, #DCF8C6 50%, transparent 50%, transparent 100%)',
  },
  header: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#333",
    marginBottom: "5px",
    wordWrap: "break-word",
  },
  body: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#444",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  rodape: {
    marginTop: "8px",
    fontSize: "12px",
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "right",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 20px",
    background: "#F7F7F7",
    borderTop: "1px solid #EAEAEA",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  cancelButton: {
    background: '#EAEAEA',
    color: '#555',
    marginRight: '10px',
    '&:hover': {
        background: '#DDD',
    }
  },
  confirmButton: {
    background: '#25D366',
    color: 'white',
    '&:hover': {
        background: '#128C7E',
    }
  },
};

style.cancelButton = {...style.button, ...style.cancelButton};
style.confirmButton = {...style.button, ...style.confirmButton};

export default style;