const style = {
  overlay: {
    width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,
    background: "rgba(0,0,0,0.6)", zIndex: 16, display: "flex",
    justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)",
  },
  modalContainer: {
    width: '100%', maxWidth: '500px', background: "#1e212b",
    borderRadius: "16px", border: "1px solid #2a2f3b",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  modalHeader: {
    padding: "20px 25px", borderBottom: "1px solid #2a2f3b", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  title: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
  closeButton: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  form: { padding: "25px", display: "flex", flexDirection: "column", gap: 15 },
  inputGroup: {},
  label: {
    display: "block", fontSize: "14px", fontWeight: "500",
    marginBottom: "8px", color: "#aeb9c4",
  },
  input: {
    width: "100%", height: "45px", background: "#2a2f3b",
    border: "1px solid #3c4257", borderRadius: "12px", padding: "0 20px",
    boxSizing: "border-box", color: "#FFF", fontSize: "15px", outline: "none",
  },
  textarea: {
    height: '150px', paddingTop: '12px', resize: 'vertical'
  },
  buttonArea: {
    display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px"
  },
  actionButton: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: 'none', borderRadius: '10px', padding: '10px 20px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  cancelButton: { background: '#4b5563', color: '#FFF' },
  saveButton: { background: '#4ecf78', color: '#1e212b' },
};

export default style;