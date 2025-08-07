const style = {
  overlay: {
    width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,
    background: "rgba(0,0,0,0.6)", zIndex: 15, display: 'flex', justifyContent: 'flex-end',
    backdropFilter: 'blur(5px)'
  },
  modalContainer: {
    height: "100vh", width: "400px", background: "#1e212b",
    boxShadow: "-5px 0px 30px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column",
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: "20px 25px", borderBottom: "1px solid #2a2f3b",
  },
  modalTitle: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
  closeButtonModal: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  optionsMenu: {
    padding: '10px 0', display: "flex", flexDirection: "column",
  },
  optionsMenuItem: {
    display: "flex", alignItems: "center", padding: "15px 25px",
    gap: "15px", cursor: "pointer", color: "#aeb9c4",
  },
  menuItemText: { fontSize: "16px", fontWeight: 500 },
};

export default style;