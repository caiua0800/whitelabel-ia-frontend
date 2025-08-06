const style = {
  overlay: {
    width: "100%", height: "100%", position: "fixed", top: 0, left: 0,
    background: "rgba(0, 0, 0, 0.6)", zIndex: 12, display: "flex",
    justifyContent: "center", alignItems: "center", backdropFilter: 'blur(5px)'
  },
  modal: {
    width: '100%', maxWidth: '500px', background: "#1e212b",
    borderRadius: "16px", border: "1px solid #2a2f3b",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  modalHeader: {
    padding: "20px 25px", borderBottom: "1px solid #2a2f3b",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  modalTitle: { fontSize: "20px", color: "#FFF", fontWeight: 600, margin: 0 },
  close: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  modalContent: {
    padding: "25px",
  },
  categoriesBox: {
    display: "flex", flexWrap: "wrap", gap: "10px",
  },
  categoryItem: {
    fontSize: "14px", fontWeight: 600, cursor: "pointer",
    background: "#3c4257", color: "#aeb9c4", padding:  "8px 15px",
    borderRadius: "20px",
  },
  categorySelected: {
    background: '#4ecf78', color: '#1e212b',
  },
  modalFooter: {
    padding: '20px 25px', borderTop: '1px solid #2a2f3b',
    display: 'flex', justifyContent: 'flex-end',
  },
  saveButton: {
    background: '#4ecf78', color: '#1e212b', border: 'none',
    borderRadius: '10px', padding: '10px 20px', fontSize: '15px',
    fontWeight: '600', cursor: 'pointer',
  }
};

export default style;